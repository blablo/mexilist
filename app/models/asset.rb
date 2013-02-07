class Asset < ActiveRecord::Base
  attr_accessible :anuncio_id, :file
  belongs_to :anuncio

  has_attached_file :file, :styles => { :medium => "800x800>", :big_thumb => "300x200#", :thumb => "160x120#" }, 
  :storage => :s3,
  :s3_credentials => "#{Rails.root.to_s}/config/s3_credentials.yml",
  :path => "/:style/:id/:filename"

end
