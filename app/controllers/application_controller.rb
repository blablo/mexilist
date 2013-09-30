class ApplicationController < ActionController::Base
  protect_from_forgery
 helper_method :fb_user

  rescue_from CanCan::AccessDenied do |exception|
    #redirect_to root_path, :alert => exception.message
    redirect_to root_url, :alert => exception.message
  end

  def fb_user
    fb_auth = FbGraph::Auth.new('339455912827352', '7253a0296a9633ac4997d8ab5b92c7e')
    fb_auth.from_cookie(cookies)
    fb_auth.user
  end
 #rescue_from FbGraph::Exception, :with => :fb_graph_exception

  def fb_graph_exception(e)
    flash[:error] = {
      :title   => e.class,
      :message => e.message
    }
    current_user.try(:destroy)
    redirect_to root_url
  end
end
