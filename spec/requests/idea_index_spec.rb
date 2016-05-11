require 'rails_helper'

RSpec.describe "Idea index", type: :request do
  describe "GET /api/v1/ideas" do
    before(:each) do
      @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
    end

    it "has 200 response code" do
      get "/api/v1/ideas"
      expect(response).to have_http_status(200)
    end

    it "renders json" do
      get "/api/v1/ideas"
      expect(response.content_type).to eq("application/json")
    end

    it "returns all ideas" do
      get "/api/v1/ideas"

      ideas = json_body
      idea = ideas.first

      expect(idea[:title]).to eq @idea.title
      expect(idea[:body]).to eq @idea.body
      expect(idea[:quality]).to eq @idea.quality
    end
  end
end
