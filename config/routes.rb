Mexilist::Application.routes.draw do

  get "checkout" => 'checkout#index'
  post "checkout" => 'checkout#create'
  get "paquetes" => 'home#paquetes'

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

  resources :anuncios do 
    collection do 
      get 'mis_anuncios'
      post 'contactar'
      get 'search'
      get 'renovar'
   end
  end
  resources :pictures

  get '/:state/:city/:category' => 'anuncios#index', :constraints => CityCategoryConstraint
  get '/:state/:category' => 'anuncios#index', :constraints => StateCategoryConstraint
  get '/:state/:city/:titulo/:id' => 'anuncios#show', :constraints => CityConstraint
  get '/:state/:city' => 'home#index', :constraints => CityConstraint
  get '/:state' => 'home#index', :constraints => StateConstraint
  get '/:category' => 'anuncios#index', :constraints => CategoryConstraint

  authenticated :user do
    root :to => 'home#index'

    
  end
  root :to => "home#index"
  devise_for :users
  resources :users do 
    member do 
      get 'anuncios'
    end
  end

end
