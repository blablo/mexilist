class CityCategoryConstraint
  def self.matches?(request)
    reserved_words = Metropoly.all.map{|c| c.url_name}
    reserved_words2 = Category.all.map{|c| c.url_name}

    reserved_words.include?(request.path_parameters[:city]) and reserved_words2.include?(request.path_parameters[:category])
  end
end
