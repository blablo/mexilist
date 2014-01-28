class HomeController < ApplicationController
  def index
    @anuncios = Anuncio.by_location_with_picture(params[:state], params[:city]).order('fecha desc').paginate(:page => params[:page], :per_page => 30)
    
    if params[:page]
      render layout: nil
    end

    
  end

  def paquetes
    
  end
end
