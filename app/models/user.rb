class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :role_ids, :as => :admin
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  has_many :authentications, :dependent => :delete_all
  has_many :anuncios, :dependent => :delete_all
  has_many :votes
  has_many :pictures

  def apply_omniauth(auth)
    # In previous omniauth, 'user_info' was used in place of 'raw_info'
    self.email =  auth['info']['email']
    # Again, saving token is optional. If you haven't created the column in authentications table, this will fail
    authentications.build(:provider => auth['provider'], :uid => auth['uid'], :token => auth['credentials']['token'])
  end

  def facebook

    if !self.authentications.empty?
      uid = self.authentications.first.uid
      FbGraph::User.fetch(uid) rescue nil
      me = FbGraph::User.me(user.authentications.first.token) rescue nil
    else
      nil
    end
  end

  def fb_me
    if !self.authentications.empty?
      FbGraph::User.me(self.authentications.first.token) rescue nil
    end
  end


  def picture
    if facebook
      facebook.picture
    end
  end

end


