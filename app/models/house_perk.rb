class HousePerk < ActiveRecord::Base
  attr_accessible :anuncio_id, :colonia, :m2ext, :m2int, :rooms

  validates :rooms, :presence => true


end
