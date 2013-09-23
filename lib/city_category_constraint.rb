class CityCategoryConstraint
  def self.matches?(request)
    reserved_words = City.all.map{|c| c.param_name}
    reserved_words2 = State.all.map{|c| c.param_name}
    reserved_words3 = Category.all.map{|c| c.url_name}


    reserved_words.include?(request.path_parameters[:city]) and reserved_words2.include?(request.path_parameters[:state]) and reserved_words3.include?(request.path_parameters[:category])
  end
end
