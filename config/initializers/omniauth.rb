Rails.application.config.middleware.use OmniAuth::Builder do
  # The following is for facebook
  provider :facebook, '339455912827352', '7253a0296a9633ac4997d8ab5b92c7e2',
           :scope => 'email,user_birthday,read_stream', :display => 'popup'  if Rails.env.development?

  provider :facebook, '124337484410517', '913dcdbb103f11d9fc6860b3dacdffb8',
           :scope => 'email,user_birthday,read_stream', :display => 'popup'  if Rails.env.production?

  # If you want to also configure for additional login services, they would be configured here.
end
