class Category < ActiveRecord::Base
  attr_accessible :main, :name, :parent_id, :tipo, :keywords
  has_many :anuncios
  
  belongs_to :parent, :class_name => 'Category', :foreign_key => 'parent_id'

  scope :main_categories, where('parent_id is null')

  TIPO = ['normal', 'car', 'moto', 'house']

  def tipo_anuncio
    if self.house?
      [["Venta", 1], ["Renta", 3], ["Compra", 2]]
    elsif self.job?
      [["Ofresco Trabajo", 5], ["Busco Trabajo", 6]]
    else
      [["Venta", 1], ["Compra", 2], ["Servicio", 4]]
    end
  end


  def anuncios_all
    if !self.subcategories.empty?
      self.subcategories.inject([]){|a,sc| a +  sc.anuncios }
    else
      self.anuncios
    end
  end

  def url_name
    self.name.parameterize
  end

  def has_children?
    return true
  end

  def subcategories
    Category.where(:parent_id => self.id)
  end


  def car?
    if self.tipo.nil?
      self.parent.tipo ? self.parent.tipo == 2 : false
    else
      self.tipo == 2
    end
  end

  def moto?
    if self.tipo.nil?    
      self.parent.tipo ? self.parent.tipo == 3 : false  
    else
      self.tipo == 3
    end
  end

  def house?
    if self.tipo.nil?
      self.parent.tipo ? self.parent.tipo == 4 : false
    else
      self.tipo == 4
    end
  end

  def job?
    self.id == 440
  end


end
