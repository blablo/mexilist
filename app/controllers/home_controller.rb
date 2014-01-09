class HomeController < ApplicationController
  def index
    @anuncios = Anuncio.with_picture.order('fecha desc').paginate(:page => params[:page], :per_page => 80)
    
  end

  def paquetes
    
  end
end
