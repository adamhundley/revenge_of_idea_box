require 'rails_helper'

RSpec.describe "Idea update", type: :request do
  describe "PATCH /api/v1/ideas" do
    before(:each) do
      @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
    end

    it "has 204 response code" do
      patch "/api/v1/ideas/#{@idea.id}?title=new"
      expect(response).to have_http_status(204)
    end


    it "updates the idea" do
      patch "/api/v1/ideas/#{@idea.id}?title=new"

      idea = Idea.find(@idea.id)

      expect(idea.title).to_not eq @idea.title
      expect(idea.title).to eq "new"
    end
  end
end
