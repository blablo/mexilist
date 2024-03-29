Mexilist::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.eager_load = false
  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # ActionMailer Config



#  config.action_mailer.delivery_method = :smtp
 # config.action_mailer.delivery_method = :amazon_ses

  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default :charset => "utf-8"

  # config.action_mailer.smtp_settings = {
  #   :enable_starttls_auto => true,
  #   :address            => 'smtp.zoho.com',
  #   :port               => 465,
  #   :domain             => 'zoho.com',
  #   :authentication     => :login,
  #   :enable_starttls_auto => false,
  #   :tls                  => false,
  #   :openssl_verify_mode  => 'none',
  #   :ssl => true,
  #   :user_name          => "envio@mexilist.com",
  #   :password           => "mac2009"
  # }
# config.action_mailer.delivery_method = :smtp
#   config.action_mailer.smtp_settings = {
#       :address => "email-smtp.us-east-1.amazonaws.com",
#     :port => 587,
#     :domain => "mexilistmail.com",
#       :user_name => "AKIAJJYDIAI6DGB5VLZA", # Your SMTP user here.
#       :password => "Au+M42vEnO+6TtsOjIYP+Ut/agutE+5G6HwihXYFBJXv", # Your SMTP password here.
#       :authentication => :login,
#       :enable_starttls_auto => true
#   }
 config.action_mailer.delivery_method = :ses

  config.action_mailer.default_url_options = { :host => "localhost:3000" }

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Raise exception on mass assignment protection for Active Record models
  config.active_record.mass_assignment_sanitizer = :strict

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  config.active_record.auto_explain_threshold_in_seconds = 0.5

  # Do not compress assets
  config.assets.compress = false

  # Expands the lines which load the assets
  config.assets.debug = true

  ENV['facebook_app_id'] = "339455912827352"

  config.cache_store = :mem_cache_store
  config.action_controller.perform_caching = true
  
end
