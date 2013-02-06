Mexilist::Application.routes.draw do
  get 'anuncios/update_cities', :as => 'update_cities', :to => 'anuncios#update_cities'
  get 'anuncios/update_category', :as => 'update_category', :to => 'anuncios#update_category'

  match 'facebooks/index'
  match 'facebooks/login'
  match 'facebooks/logout'
  match 'facebooks/callback'
  match 'facebooks/menu'

  match '/auth/:provider' => 'authentications#blank'
  match '/auth/:provider/callback' => 'authentications#create'

  resources :anuncios

  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end
