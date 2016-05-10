Rails.application.routes.draw do
  get 'home/index'

  root "home#index"

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :ideas, only: [:create, :index, :destroy, :update]
      post 'ideas/upvote' => 'ideas#upvote'
      post 'ideas/downvote' => 'ideas#downvote'
    end
  end
end
