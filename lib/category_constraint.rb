class CategoryConstraint
  def self.matches?(request)
    reserved_words = Category.all.map{|c| c.url_name}
    reserved_words.include?(request.path_parameters[:category])
  end
end
