class MotoPerk < ActiveRecord::Base
  attr_accessible :anuncio_id, :brand_id, :cc, :km, :year
  belongs_to :anuncio
  belongs_to :brand
end
