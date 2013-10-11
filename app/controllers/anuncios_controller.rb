# -*- coding: utf-8 -*-
class AnunciosController < ApplicationController
load_and_authorize_resource 
require 'will_paginate/array'
 def update_model

   brand = Brand.find(params[:brand_id])
   # map to name and id for use in our options_for_select
   @models = brand.models.map{|a| [a.name, a.id]}
   respond_to do |format|
      format.js
    end
 end
 def update_cities
   # updates artists and songs based on genre selected
   state = State.find(params[:state_id])
   # map to name and id for use in our options_for_select
   @cities = state.cities.map{|a| [a.name, a.id]}
   respond_to do |format|
      format.js
    end
 end

 def update_category
   # updates artists and songs based on genre selected
   category = Category.find(params[:category_id])
   # map to name and id for use in our options_for_select
   @anuncio = current_user.anuncios.build(:category_id => category.id)
   
   5.times { @anuncio.assets.build }
   @anuncio.build_perk


   respond_to do |format|
      format.js
    end
 end


  # GET /anuncios
  # GET /anuncios.json
  def index

    if params[:city] and params[:category]
      @city = nil
      City.all.each{|city| @city = city if city.param_name == params[:city]}
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = Anuncio.by_city_category(@city.id, @category)
      
    elsif params[:state] and params[:category]
      @state = nil
      State.all.each{|state| @state = state if state.param_name == params[:state]}
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = Anuncio.by_state_category(@state.id, @category)
      
    elsif params[:category]
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = @category.anuncios_all.paginate(:page => params[:page], :per_page => 1)
    else
      @anuncios = Anuncio.all
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @anuncios }
    end
  end

  def mis_anuncios
    @anuncios = current_user.anuncios
  end

  # GET /anuncios/1
  # GET /anuncios/1.json
  def show
    @anuncio = Anuncio.find(params[:id])
    
    @related = Anuncio.where(:category_id => @anuncio.category_id).last(4)
    @related = Anuncio.last(5)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @anuncio }
    end
  end

  # GET /anuncios/new
  # GET /anuncios/new.json
  def new

    @sub = params[:sub]
    @anuncio = current_user.anuncios.build
    @picture = Picture.new
    if params[:token]
      @token = params[:token]
    else
      @token = (DateTime.now.to_i + current_user.id).to_s
    end

    if @sub
      @anuncio.category = Category.find(@sub) rescue nil
      @images = Picture.find_all_by_token(@token)
    end


    @anuncio.build_car_perk
    @anuncio.build_house_perk
    @anuncio.build_moto_perk
    @anuncio.build_job_perk
    
    @states = State.all
    @cities = City.all
    5.times { @anuncio.assets.build }

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @anuncio }
    end
  end

  # GET /anuncios/1/edit
  def edit
    @anuncio = current_user.anuncios.find(params[:id])

    @picture = Picture.new
    @images = @anuncio.pictures

    
    @states = State.all
    @cities = City.all

  end

  # POST /anuncios
  # POST /anuncios.json
  def create
    @anuncio = current_user.anuncios.build(params[:anuncio])
    @anuncio.state_id = City.find(params[:anuncio][:city_id]).state.id
    @images = Picture.find_all_by_token(@anuncio.token)


    respond_to do |format|
      if @anuncio.save
        @images.each do |pic|
          pic.update_attribute(:anuncio_id, @anuncio.id)
        end

        current_user.fb_me.link!(
                                 :link => @anuncio.url,
                                 :message => "¿Algún interesado? " + @anuncio.title
                                 )
        format.html { redirect_to @anuncio, notice: 'Anuncio was successfully created.' }
        format.json { render json: @anuncio, status: :created, location: @anuncio }
      else
        @sub = @anuncio.category_id
        @states = State.all
        @cities = City.all
        @picture = Picture.new

        format.html {  render :action => 'new', :token => @anuncio.token }

        format.json { render json: @anuncio.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /anuncios/1
  # PUT /anuncios/1.json
  def update
    @anuncio = current_user.anuncios.find(params[:id])
    @anuncio.state_id = City.find(params[:anuncio][:city_id]).state.id
    respond_to do |format|
      if @anuncio.update_attributes(params[:anuncio])
        format.html { redirect_to @anuncio, notice: 'Anuncio was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @anuncio.errors, status: :unprocessable_entity }
      end
    end
  end

  def contactar
    @anuncio = Anuncio.find params[:anuncio_id]
    if @anuncio
      AnuncioMailer.contactar(params[:email], params[:nombre], params[:mensaje], @anuncio).deliver
    end
    respond_to do |format|
      format.js { render :js => "$('.enviar').show(); $('.enviar_dis').hide(); $('.modal').modal('hide'); alert('Tu mensaje fue enviado con exito.');"}
    end
  end

  # DELETE /anuncios/1
  # DELETE /anuncios/1.json
  def destroy
    @anuncio = current_user.anuncios.find(params[:id])
    @anuncio.destroy

    respond_to do |format|
      format.html { redirect_to anuncios_url }
      format.json { head :no_content }
    end
  end


  def search
    @q = params[:q]
    @anuncios = Anuncio.search(@q).paginate(:page => params[:page], :per_page => 5)
    render :index
  end

end
