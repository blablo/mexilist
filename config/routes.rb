Mexilist::Application.routes.draw do
#  include 'lib/category_constraint.rb'
  get 'anuncios/update_cities', :as => 'update_cities', :to => 'anuncios#update_cities'
  get 'anuncios/update_category', :as => 'update_category', :to => 'anuncios#update_category'
  get 'anuncios/update_model', :as => 'update_model', :to => 'anuncios#update_model'

  match 'facebooks/index'
  match 'facebooks/login'
  match 'facebooks/logout'
  match 'facebooks/callback'
  match 'facebooks/menu'

  match '/auth/:provider' => 'authentications#blank'
  match '/auth/:provider/callback' => 'authentications#create'

  resources :anuncios

  get '/:city/:category' => 'anuncios#index', :constraints => CityCategoryConstraint
  get '/:city/:titulo/:id' => 'anuncios#show', :constraints => CityConstraint
  get '/:city' => 'home#index', :constraints => CityConstraint
  get '/:category' => 'anuncios#index', :constraints => CategoryConstraint

  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end
