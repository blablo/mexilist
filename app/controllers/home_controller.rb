class HomeController < ApplicationController
  def index
    @anuncios = Anuncio.with_picture
    
  end
end
