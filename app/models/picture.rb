class Picture < ActiveRecord::Base
  attr_accessible :anuncio_id, :image, :image_cache, :token
  belongs_to :anuncio
  mount_uploader :image, PictureUploader

  validates_presence_of :image
end
