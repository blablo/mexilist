class StateConstraint
  def self.matches?(request)
    reserved_words = State.all.map{|c| c.param_name}

    reserved_words.include?(request.path_parameters[:state])

  end
end
