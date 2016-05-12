module Api
  module V1
    class IdeasController < ApiController
      respond_to :json

      def index
        respond_with Idea.all
      end

      def create
        idea = Idea.create(title: params[:title], body: params[:body])
        respond_with :api, :v1, idea, location: nil
      end

      def destroy
        respond_with Idea.delete(params[:id])
      end

      def update
        idea = Idea.find(params[:id])
        IdeaEditor.updater(idea, params)
        respond_with :api, :v1, idea, location: nil
      end

      def upvote
        idea = Idea.find(params[:id])
        IdeaEditor.upvoter(idea)
        respond_with :api, :v1, idea, location: nil
      end

      def downvote
        idea = Idea.find(params[:id])
        IdeaEditor.downvoter(idea)
        respond_with :api, :v1, idea, location: nil
      end
    end
  end
end
