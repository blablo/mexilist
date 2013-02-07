class Anuncio < ActiveRecord::Base
  attr_accessible :category_id, :city_id, :district, :expiracy, :latitude, :longitude, :price, :renovation, :street, :texto, :tipo, :title, :assets_attributes, :tel, :car_perk_attributes, :moto_perk_attributes, :house_perk_attributes
  has_many :assets
  belongs_to :city
  belongs_to :category
  has_one :car_perk
  has_one :moto_perk
  has_one :house_perk

  accepts_nested_attributes_for :assets, :reject_if => lambda { |a| a[:file].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :car_perk, :allow_destroy => true
  accepts_nested_attributes_for :moto_perk, :allow_destroy => true
  accepts_nested_attributes_for :house_perk, :allow_destroy => true
  
  TIPOS = [['Venta', 1], ['Compra', 2]]

  validates :category_id, :presence => true
  validates :city_id, :presence => true
  validates :tipo, :presence => true
  validates :title, :presence => true
  validates :texto, :presence => true
  

  def main_image
    if !self.assets.empty?
      self.assets.first.file.url(:thumb)
    else
      "http://placehold.it/160x120"
    end
  end


  def build_perk
    if self.category.car?
      self.build_car_perk
    elsif self.category.moto?
      self.build_moto_perk
    elsif self.category.house?
      self.build_house_perk
    end
  end



  def render_name    
    if self.category.car?
      'car'
    elsif self.category.moto?
      'moto'
    elsif self.category.house?
      'house'
    else
      return 'normal'
    end

  end

  
end
