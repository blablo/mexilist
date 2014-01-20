ThinkingSphinx::Index.define :anuncio, :with => :active_record do
  indexes title, texto
  indexes state.name, :as => :state
  indexes city.name, :as => :city
  indexes category.name, :as => :category
  indexes category.keywords, :as => :keywords
  indexes fecha, :sortable => true
  
  has :category_id, :city_id, :state_id
  
end
