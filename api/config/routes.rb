Rails.application.routes.draw do
  resources :users, only: [:new, :create]

  resources :auctions, only: [:create, :index, :show, :update, :destroy], shallow: true do
    resources :bids, only: [:create, :destroy]
  end

  resources :tokens, only: [:create, :destroy]

  # match "*unmatched_route", to: "application#not_found", via: :all
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
