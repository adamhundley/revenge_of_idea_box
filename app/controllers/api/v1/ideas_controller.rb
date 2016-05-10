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

      def destroy
        respond_with Idea.delete(params[:id])
      end

      def upvote
        idea = Idea.find(params[:id])
        upvoter(idea)
        respond_with :api, :v1, idea, location: nil
      end

      def downvote
        idea = Idea.find(params[:id])
        downvoter(idea)
        respond_with :api, :v1, idea, location: nil
      end

      private

        def upvoter(idea)
          if idea.quality == "swill"
            idea.update(quality: "plausible")
          elsif idea.quality == "plausible"
            idea.update(quality: "genius")
          end
        end

        def downvoter(idea)
          if idea.quality == "plausible"
            idea.update(quality: "swill")
          elsif idea.quality == "genius"
            idea.update(quality: "plausible")
          end
        end
    end
  end
end
