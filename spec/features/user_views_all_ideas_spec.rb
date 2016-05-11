require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserViewsAllIdeas", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
  end

  scenario "User visits the homepage and all ideas are loaded" do
    visit "/"

    within("tr#idea#{@idea.id}") do
      expect(find_field('title').value).to eq "Test Idea Title"
      expect(page).to have_content "Test Idea Body"
      expect(page).to have_content "swill"
    end

    expect(Idea.count).to eq 1
  end
end
