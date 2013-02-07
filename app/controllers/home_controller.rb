class HomeController < ApplicationController
  def index
    @anuncios = Anuncio.all
    
  end
end
