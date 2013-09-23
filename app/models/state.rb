class State < ActiveRecord::Base
  attr_accessible :name
  has_many :cities


  def url_name
    '/' + self.name.parameterize
  end

  def param_name
    self.name.parameterize
  end
  def self.find_name(param)
    self.all.each do |c|
      return c.name if c.name.parameterize == param 
    end
  end

end
