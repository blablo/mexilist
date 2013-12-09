class HomeController < ApplicationController
  def index
    @anuncios = Anuncio.with_picture
    
  end

  def paquetes
    
  end
end
