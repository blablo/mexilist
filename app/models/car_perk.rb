class CarPerk < ActiveRecord::Base
  attr_accessible :anuncio_id, :brand_id, :km, :model_id, :year
  belongs_to :anuncio
  belongs_to :brand
  belongs_to :model
end
