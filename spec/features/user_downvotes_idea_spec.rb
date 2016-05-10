require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserDownvotesAnIdea", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body", quality: "genius")
  end

  scenario "User visits the home page, downvotes an idea and sees change on page" do
    visit "/"
    expect(page).to have_content "genius"

    within("tr#idea#{@idea.id}") do
      click_on "downvote"

      wait_for_ajax

      expect(page).to have_content "plausible"
    end
  end
end
