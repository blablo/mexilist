class CityConstraint
  def self.matches?(request)
    reserved_words = City.all.map{|c| c.param_name}
    reserved_words2 = State.all.map{|c| c.param_name}

    reserved_words.include?(request.path_parameters[:city]) and reserved_words2.include?(request.path_parameters[:state])

  end
end
