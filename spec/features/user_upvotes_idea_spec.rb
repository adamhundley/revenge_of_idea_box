require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserUpvotesAnIdea", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
  end

  scenario "User visits the home page,upvotes an idea and sees change on page" do
    visit "/"
    expect(page).to have_content "swill"

    within("tr#idea#{@idea.id}") do
      find('.upvote').click

      wait_for_ajax

      expect(page).to have_content "plausible"
    end
  end
end
