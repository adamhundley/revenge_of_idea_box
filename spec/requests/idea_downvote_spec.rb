require 'rails_helper'

RSpec.describe "Idea downvote", type: :request do
  describe "downvote /api/v1/ideas" do
    before(:each) do
      @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body", quality: "genius")
    end

    it "has 201 response code" do
      post "/api/v1/ideas/downvote?id=#{@idea.id}"
      expect(response).to have_http_status(201)
    end

    it "renders json" do
      post "/api/v1/ideas/downvote?id=#{@idea.id}"
      expect(response.content_type).to eq("application/json")
    end

    it "downvotes the idea" do
      post "/api/v1/ideas/downvote?id=#{@idea.id}"

      idea = json_body

      expect(idea[:title]).to eq @idea.title
      expect(idea[:body]).to eq @idea.body
      expect(idea[:quality]).to_not eq @idea.quality
      expect(idea[:quality]).to eq "plausible"
    end

    it "downvotes the idea twice" do
      post "/api/v1/ideas/downvote?id=#{@idea.id}"
      post "/api/v1/ideas/downvote?id=#{@idea.id}"

      idea = json_body

      expect(idea[:quality]).to eq "swill"
    end
  end
end
