# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Mexilist::Application.initialize!
require 'create_or_update'
ActiveRecord::Base.send(:extend, CreateOrUpdate)
