class Metropoly < ActiveRecord::Base
  attr_accessible :name


  def url_name
    self.name.parameterize
  end

end
