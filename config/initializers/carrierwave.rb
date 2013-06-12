CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => 'AKIAJN5UWEKNER3LIOHA',                        # required
    :aws_secret_access_key  => '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'                        # required

  }

  if Rails.env.production?
    config.fog_directory  = 'mexilist-pro'                     # required
  else
    config.fog_directory  = 'mexilist-dev'                     # required
  end
end
