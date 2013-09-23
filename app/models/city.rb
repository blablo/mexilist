class City < ActiveRecord::Base
  attr_accessible :metropoly_id, :name, :state_id
  belongs_to :state
  belongs_to :metropoly


  def param_name
    self.name.parameterize
  end

  def url_name
    '/' + self.state.name.parameterize + '/' + self.name.parameterize
  end


  def self.find_name(param)
    self.all.each do |c|
      return c.name if c.name.parameterize == param 
    end
  end

end
