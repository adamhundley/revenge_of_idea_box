require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserViewsAllIdeas", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
  end

  scenario "User visits their artist dashboard and adds a new artist then untracks one then views a tour" do
    # VCR.use_cassette("feature#user_adds_idea") do


      visit "/"

      expect(page).to have_content "Test Idea Title"
      expect(page).to have_content "Test Idea Body"
      expect(page).to have_content "swill"

      expect(Idea.count).to eq 1
    end
  # end
end
