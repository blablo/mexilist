class StateCategoryConstraint
  def self.matches?(request)
    reserved_words2 = State.all.map{|c| c.param_name}
    reserved_words3 = Category.all.map{|c| c.url_name}


reserved_words2.include?(request.path_parameters[:state]) and reserved_words3.include?(request.path_parameters[:category])
  end
end
