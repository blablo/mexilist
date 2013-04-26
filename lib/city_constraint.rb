class CityConstraint
  def self.matches?(request)
    reserved_words = Metropoly.all.map{|c| c.url_name}
    reserved_words.include?(request.path_parameters[:city])
  end
end
