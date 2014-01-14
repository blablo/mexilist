ThinkingSphinx::Index.define :anuncio, :with => :active_record do
  indexes title, texto
  indexes fecha, :sortable => true
end
