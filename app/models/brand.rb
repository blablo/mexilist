class Brand < ActiveRecord::Base
  attr_accessible :id, :name, :tipo
  has_many :models

end
