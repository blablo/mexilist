class Category < ActiveRecord::Base
  attr_accessible :main, :name, :parent_id, :tipo

  belongs_to :parent, :class_name => 'Category', :foreign_key => 'parent_id'

  scope :main_categories, where('parent_id is null')

  TIPO = ['normal', 'car', 'moto', 'house']

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

end
