class Anuncio < ActiveRecord::Base
  attr_accessible :category_id, :city_id, :district, :expiracy, :latitude, :longitude, :price, :renovation, :street, :texto, :tipo, :title, :assets_attributes, :tel, :car_perk_attributes, :moto_perk_attributes, :house_perk_attributes, :token, :intercambio, :job_perk_attributes, :frecuencia, :noches, :bot_id
  has_many :assets
  belongs_to :city
  belongs_to :state
  belongs_to :category
  belongs_to :user
  has_one :car_perk
  has_one :moto_perk
  has_one :house_perk
  has_one :job_perk
  has_many :pictures,  :dependent => :destroy
  is_impressionable

  accepts_nested_attributes_for :assets, :reject_if => lambda { |a| a[:file].blank? }, :allow_destroy => true
  accepts_nested_attributes_for :car_perk, :allow_destroy => true
  accepts_nested_attributes_for :moto_perk, :allow_destroy => true
  accepts_nested_attributes_for :house_perk, :allow_destroy => true
  accepts_nested_attributes_for :job_perk, :allow_destroy => true

  
  TIPOS = [['Venta', 1], ['Compra', 2], ['Renta', 3], ['Servicios', 4], ['Ofresco Trabajo', 5], ['Busco Trabajo', 6]]

  validates :category_id, :presence => true
  validates :city_id, :presence => true
  validates :tipo, :presence => true
  validates :title, :presence => true
  validates :texto, :presence => true



  scope :with_picture, -> { joins(:pictures).uniq }
 
  scope :by_location_with_picture, ->(state, city){ 

    if city
      Anuncio.where(:city_id =>  City.find_name(city).id).joins(:pictures).uniq 
    elsif state
      Anuncio.where(:state_id => State.find_name(state).id).joins(:pictures).uniq 
    else
      Anuncio.joins(:pictures).uniq 
    end

  }
  
  scope :by_category, ->(category){ 
    ids = [category.id]
    category.subcategories.each{|sub| ids << sub.id}
    Anuncio.joins(:city, :category).where("categories.id in (?)", ids) }

  scope :by_city_category, ->(city, category){ 
    ids = [category.id]
    category.subcategories.each{|sub| ids << sub.id}
    Anuncio.joins(:city, :category).where("cities.id = ? and categories.id in (?)", city, ids) }
  scope :by_state_category, ->(state, category){ 
    ids = [category.id]
    category.subcategories.each{|sub| ids << sub.id}
    Anuncio.joins(:state, :category).where("states.id = ? and categories.id in (?)", state, ids) }


  def main_image(size=nil)
    if size == :original
    if !self.pictures.empty?
      self.pictures.first.image.url
    else
      "http://placehold.it/246x180"
    end

    else
    if !self.pictures.empty?
      self.pictures.first.image.thumb.url
    else
      "http://placehold.it/160x120"
    end
    end
  end

#  TIPOS = [['Venta', 1], ['Compra', 2], ['Renta', 3], ['Servicios', 4], ['Ofresco Trabajo', 5], ['Busco Trabajo', 6]] 

  def tipo_name
    if tipo == 1 
      'Venta'
    elsif tipo == 2
      'Compra'
    elsif tipo == 3
      'Renta'
    elsif tipo == 4
      'Servicios'
    elsif tipo == 5
      'Ofresco Trabajo'
    elsif tipo == 6
      'Busco Trabajo'
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

  def main_category
    self.category.parent
  end

  def main_category_name
    self.category.parent.name
  end


  def category_name
    self.category.name
  end

  def render_name    
    if self.category.car?
      'car'
    elsif self.category.moto?
      'moto'
    elsif self.category.house?
      'house'
    elsif self.category.job?
      'job'
    else
      return 'normal'
    end

  end

  def tipo_asdf
    if self.category.tipo
      self.category.tipo
    else
      self.category.parent.tipo
    end
  end


  def url
    "http://mexilist.com/" + self.state.name.parameterize + "/" + self.city.name.parameterize + "/" + self.title.parameterize + "/" + self.id.to_s
  end
  
end
