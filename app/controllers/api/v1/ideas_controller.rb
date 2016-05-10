module Api
  module V1
    class IdeasController < ApiController
      respond_to :json

      def index
        respond_with Idea.all
      end

      def create
        @idea = Idea.create(title: params[:title], body: params[:body])
        respond_with :api, :v1, @idea, location: nil
      end
    end
  end
end
