require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserUpvotesAnIdea", type: :feature, js: true do
  before(:each) do
    @idea1 = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
    @idea2 = Idea.create(title: "Stupid Title", body: "Stupid Body")
  end

  scenario "User visits the home page, searches for stupid and it appears but test does not" do
    visit "/"

    within('form.searchIdeaForm') do
      fill_in "search", with: "Stu"
    end

    within("div.ideas") do
      expect(find_field('title').value).to have_content "Stupid Title"
      expect(page).to have_content "Stupid Body"
      expect(page).to_not have_content "Test Idea Title"
      expect(page).to_not have_content "Test Idea Body"
    end
  end
end
