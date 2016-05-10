require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserDeletesAnIdea", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
  end

  scenario "User visits the home page, deletes an idea and " do
    VCR.use_cassette("feature#user_deletes_idea") do

      visit "/"
      expect(page).to have_content "Test Idea Title"
      expect(page).to have_content "Test Idea Body"
      expect(page).to have_content "swill"

      within("tr#idea#{@idea.id}") do
        click_on "delete"
      end

      wait_for_ajax

      expect(page).to_not have_content "New Idea Title"
      expect(page).to_not have_content "New Idea Body"
      expect(page).to_not have_content "swill"
    end
  end
end
