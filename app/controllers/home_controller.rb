class HomeController < ApplicationController
  def index
    @anuncios = Anuncio.with_picture.order('fecha desc')
    
  end

  def paquetes
    
  end
end
