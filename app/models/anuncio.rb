class Anuncio < ActiveRecord::Base
  attr_accessible :category_id, :city_id, :district, :expiracy, :latitude, :longitude, :price, :renovation, :street, :texto, :tipo, :title
end
