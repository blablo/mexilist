class AuthenticationsController < ApplicationController

  def create
    auth = request.env["omniauth.auth"]
    # Try to find authentication first
    authentication = Authentication.find_by_provider_and_uid(auth['provider'], auth['uid'])



    if authentication
      # Authentication found, sign the user in.
      flash[:notice] = I18n.t('devise.sessions.signed_in')
      sign_in_and_redirect(:user, authentication.user)
    else
      # Authentication not found, thus a new user.
      user = User.new
      user.apply_omniauth(auth)

      fb_user ||= FbGraph::User.me(user.authentications.first.token)
      user.name = fb_user.fetch.name

      if user.save(:validate => false)
        user.add_role :user
        flash[:notice] = "Cuenta creada."
        sign_in_and_redirect(:user, user)
      else
        flash[:error] = "Hubo un error al crear tu cuenta. Por favor, intenta nuevamente.."
        redirect_to root_url
      end
    end
  end
end
