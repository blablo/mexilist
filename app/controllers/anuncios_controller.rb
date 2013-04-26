class AnunciosController < ApplicationController
load_and_authorize_resource

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
      @anuncios = Anuncio.all
      @city = nil
      City.all.each{|city| @city = city if city.url_name == params[:city]}
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = @category.anuncios_all
      
    elsif params[:category]
      @category = nil
      Category.all.each{|cat| @category = cat if cat.url_name == params[:category]}
      @anuncios = @category.anuncios_all
    else
      @anuncios = Anuncio.all
    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @anuncios }
    end
  end

  # GET /anuncios/1
  # GET /anuncios/1.json
  def show
    @anuncio = Anuncio.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @anuncio }
    end
  end

  # GET /anuncios/new
  # GET /anuncios/new.json
  def new
    @anuncio = current_user.anuncios.build
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
    (5-@anuncio.assets.count).times { @anuncio.assets.build }

  end

  # POST /anuncios
  # POST /anuncios.json
  def create
    @anuncio = current_user.anuncios.build(params[:anuncio])

    respond_to do |format|
      if @anuncio.save
        format.html { redirect_to @anuncio, notice: 'Anuncio was successfully created.' }
        format.json { render json: @anuncio, status: :created, location: @anuncio }
      else
        format.html { render action: "new" }
        format.json { render json: @anuncio.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /anuncios/1
  # PUT /anuncios/1.json
  def update
    @anuncio = current_user.anuncios.find(params[:id])

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


end
