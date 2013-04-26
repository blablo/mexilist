module AnunciosHelper

  def city_anuncio_url(anuncio) 
    root_url + anuncio.city.metropoly.url_name + "/" + anuncio.title.parameterize + "/" + anuncio.id.to_s
  end
  
end
