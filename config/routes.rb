Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create,  :index, :show, :update]
    get 'events/getByType', to: 'events#getByType'
    get 'events/getMineByType', to: 'events#getMineByType'
    resources :events
    resources :categories, only: [:index]
    resource :session, only: [:create, :new, :destroy]
    post "/sessions/find", to: "sessions#find"
    resources :follows, only: [:index, :create, :destroy]
    resources :featured_collections, only: [:index]
    resources :tickets, only: [:index, :show, :create, :update, :destroy]
    get '/tickets/myIndex', to: 'tickets#myIndex'
    resources :registrations
  end 

end
