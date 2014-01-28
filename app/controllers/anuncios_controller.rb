# -*- coding: utf-8 -*-


require 'twitter-text'
include Twitter::Autolink

class AnunciosController < ApplicationController
  load_and_authorize_resource :except => [:contactar, :create_bot]
  require 'will_paginate/array'
  def create_bot
    if (params[:anuncio][:title] =~ /Tu Tienda en Anumex/).nil?

      user = User.find_or_create_by(email: params[:user][:email])
      user.name = params[:user][:name]
      user.password = params[:user][:email]
      user.save

      anuncio = Anuncio.find_or_create_by(bot_id: params[:anuncio][:bot_id])
      anuncio.title = params[:anuncio][:title].gsub(/anumex/i, 'mexilist')

      anuncio.tipo = params[:anuncio][:tipo]
      anuncio.price = params[:anuncio][:price].gsub(',', '')
      anuncio.texto = params[:anuncio][:texto].gsub(/anumex/i, 'mexilist')
      anuncio.tel = params[:anuncio][:tel]
      anuncio.user_id = user.id

      anuncio.fecha = params[:anuncio][:fecha]
      anuncio.category_id = CategoryMapper.find_by_anumex_id(params[:anuncio][:category]).category_id

      if params[:anuncio][:model_id]
        model = Model.find(params[:anuncio][:model_id])
        anuncio.build_car_perk(:brand_id => model.brand_id, :model_id => params[:anuncio][:model_id], :year => params[:anuncio][:year], :km => params[:anuncio][:km])
      end

      if params[:anuncio][:cc]
        brand = Brand.find(params[:anuncio][:brand_id])
        anuncio.build_moto_perk(:brand_id => brand.id, :year => params[:anuncio][:year], :km => params[:anuncio][:km], :cc => params[:anuncio][:cc])

      end
      if params[:anuncio][:rooms]
        anuncio.build_house_perk(:colonia => params[:anuncio][:colonia] ,:rooms => params[:anuncio][:rooms], :m2int => params[:anuncio][:m2int], :m2ext => params[:anuncio][:m2ext])
        anuncio.latitude = params[:anuncio][:latitude]
        anuncio.longitude = params[:anuncio][:longitude]
        anuncio.district = params[:anuncio][:district]
      end


      city = CityMapper.find_by_anumex_id(params[:anuncio][:city]).city rescue city = nil
      if city
        anuncio.city_id = city.id
        anuncio.state_id = city.state_id
      end



      if anuncio.save
        if anuncio.fecha > Date.today
          anuncio.update_attribute(:fecha, Date.today)
        end

        params[:anuncio][:images].each_pair do |key, value|
          file = File.open(key.gsub('/pictures/', './tmp/images/'), 'wb') {|file| file << (value.unpack('m')).first }
          pic = Picture.find_or_create_by(image: File.basename(file.path))
          pic.image = File.new(file)
          pic.user_id = user.id
          pic.anuncio_id = anuncio.id
          pic.save
        end

      end


    end
    render :json => {:status => 200}.to_json, :status => 200

  end

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
      @anuncios = Anuncio.by_city_category(@city.id, @category).order('fecha desc')
      @title = @category.keywords

    elsif params[:state] and params[:category]
      @state = nil
      State.all.each{|state| @state = state if state.param_name == params[:state]}
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = Anuncio.by_state_category(@state.id, @category).order('fecha desc')
      @title = @category.keywords
    elsif params[:category]
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = Anuncio.by_category(@category).order('fecha desc')
      @title = @category.keywords
    else
      @anuncios = Anuncio.all.order('fecha desc')
      @title = "Mexilist.com"
    end

    if params[:anuncio_id]
      @anuncio = Anuncio.find(params[:anuncio_id])
    end

    @anuncios_auto = @anuncios.where('frecuencia IS NOT NULL')
    @todos = (@anuncios_auto + @anuncios).uniq.paginate(:page => params[:page], :per_page => 10)

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
    impressionist(@anuncio)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @anuncio }
    end
  end

  # GET /anuncios/new
  # GET /anuncios/new.json
  def new

    @sub = params[:sub]
    @last_anuncio = current_user.anuncios.last
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
    if current_user.has_role? :admin
      @anuncio = Anuncio.find(params[:id])
    else
      @anuncio = current_user.anuncios.find(params[:id])
    end
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
        @anuncio.update_attribute(:fecha, @anuncio.created_at)
        if current_user.anuncios.count == 1
          current_user.update_attribute(:mexipuntos, current_user.mexipuntos + 25)
        end
        current_user.fb_me.link!(:link => @anuncio.url,:message => @anuncio.title + " #mexilist")
        format.html { redirect_to anuncios_user_url(current_user, :anuncio_id => @anuncio.id), notice: 'Anuncio creado exitosamente.' }
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
    if current_user.has_role? :admin
      @anuncio = Anuncio.find(params[:id])
    else
      @anuncio = current_user.anuncios.find(params[:id])
    end
    @anuncio.state_id = City.find(params[:anuncio][:city_id]).state.id if params[:anuncio][:city_id]
    respond_to do |format|
      if @anuncio.update_attributes(params[:anuncio])
        format.html { redirect_to @anuncio, notice: 'Anuncio actualizado exitosamente.' }
        format.json { head :no_content }
        format.js { render :js => "$('#autorenueva').modal('hide');" }
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
    if current_user.has_role? :admin
      @anuncio = Anuncio.find(params[:id])
    else
      @anuncio = current_user.anuncios.find(params[:id])
    end
    @anuncio.destroy

    respond_to do |format|
      format.html { redirect_to mis_anuncios_anuncios_url }
      format.json { head :no_content }
    end
  end


  def search


    with_hash = { }
    if params[:city].nil? and params[:state]
      @state = nil
      State.all.each{|state| @state = state if state.param_name == params[:state]}
      with_hash = { :state_id => @state.id }
    elsif params[:city]
      @city = nil
      City.all.each{|city| @city = city if city.param_name == params[:city]}
      with_hash = { :city_id => @city.id }
    end
    if params[:category]
      @cat = nil
      Category.all.each{|cat| @cat = cat if cat.url_name == params[:category]}
      with_hash[:category_id] = @cat.id
    end

    @q = params[:q]
    if @q.blank?
      @todos = Anuncio.all.order('fecha desc').paginate(:page => params[:page], :per_page => 5)
    else
      @todos = Anuncio.search(@q, :order  => 'fecha desc', :with => with_hash).paginate(:page => params[:page], :per_page => 5)
    end
    @title = "Busqueda"

    if params[:page]
      render :index, layout: nil
    else
      render :index
    end
  end


  def renovar
    @anuncio = Anuncio.find(params[:id])

  end

end
