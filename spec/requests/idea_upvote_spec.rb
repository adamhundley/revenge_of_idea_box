require 'rails_helper'

RSpec.describe "Idea upvote", type: :request do
  describe "upvote /api/v1/ideas" do
    before(:each) do
      @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
    end

    it "has 201 response code" do
      post "/api/v1/ideas/upvote?id=#{@idea.id}"
      expect(response).to have_http_status(201)
    end

    it "renders json" do
      post "/api/v1/ideas/upvote?id=#{@idea.id}"
      expect(response.content_type).to eq("application/json")
    end

    it "upvotes the idea" do
      post "/api/v1/ideas/upvote?id=#{@idea.id}"

      idea = json_body

      expect(idea[:title]).to eq @idea.title
      expect(idea[:body]).to eq @idea.body
      expect(idea[:quality]).to_not eq @idea.quality
      expect(idea[:quality]).to eq "plausible"
    end

    it "upvotes the idea twice" do
      post "/api/v1/ideas/upvote?id=#{@idea.id}"
      post "/api/v1/ideas/upvote?id=#{@idea.id}"

      idea = json_body

      expect(idea[:quality]).to eq "genius"
    end
  end
end
