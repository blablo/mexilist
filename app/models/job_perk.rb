class JobPerk < ActiveRecord::Base
  attr_accessible :area, :estudios, :cv

  mount_uploader :cv, CurriculoUploader

  validates :area, :presence => true
  validates :estudios, :presence => true


end
