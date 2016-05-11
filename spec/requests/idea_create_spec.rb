require 'rails_helper'

RSpec.describe "Idea create", type: :request do
  describe "POST /api/v1/ideas" do
    it "has 201 response code" do
      post "/api/v1/ideas?title=title&body=body"
      expect(response).to have_http_status(201)
    end

    it "renders json" do
      post "/api/v1/ideas?title=title&body=body"
      expect(response.content_type).to eq("application/json")
    end

    it "creates the idea" do
      post "/api/v1/ideas?title=title&body=body"

      idea = json_body

      expect(idea[:title]).to eq 'title'
      expect(idea[:body]).to eq 'body'
      expect(idea[:quality]).to eq 'swill'
      expect(Idea.count).to eq 1
    end
  end
end
