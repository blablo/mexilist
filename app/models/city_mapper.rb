class CityMapper < ActiveRecord::Base
  attr_accessible :city_id, :anumex_id
  belongs_to :city

end
