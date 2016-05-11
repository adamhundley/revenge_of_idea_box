require 'rails_helper'

RSpec.describe "Idea destroy", type: :request do
  describe "DELETE /api/v1/ideas" do
    before(:each) do
      @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
    end

    it "has 204 response code" do
      delete "/api/v1/ideas/#{@idea.id}"
      expect(response).to have_http_status(204)
    end

    it "removes from database" do
      delete "/api/v1/ideas/#{@idea.id}"
      
      expect(Idea.count).to eq 0
    end
  end
end
