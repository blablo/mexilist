class Category < ActiveRecord::Base
  attr_accessible :main, :name, :parent_id

  belongs_to :parent, :class_name => 'Category', :foreign_key => 'parent_id'
  
  scope :main_categories, where('parent_id is null')

  def has_children?
    return true
  end

  def subcategories
    Category.where(:parent_id => self.id)
  end

end
