class City < ActiveRecord::Base
  attr_accessible :metropoly_id, :name, :state_id
  belongs_to :state
  belongs_to :metropoly

  def url_name
    self.name.parameterize
  end


end
