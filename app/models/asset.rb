class Asset < ActiveRecord::Base
  attr_accessible :anuncio_id, :file
  belongs_to :anuncio

  has_attached_file :file, :styles => { :medium => "500x500>", :thumb => "120x120#" }, 
  :storage => :s3,
  :s3_credentials => "#{Rails.root.to_s}/config/s3_credentials.yml",
  :path => "/:style/:id/:filename"

end
