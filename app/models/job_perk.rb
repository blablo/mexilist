class JobPerk < ActiveRecord::Base
  attr_accessible :area, :estudios, :cv

  mount_uploader :cv, CurriculoUploader

end
