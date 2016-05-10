require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserDeletesAnIdea", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
  end

  scenario "User visits the home page, deletes an idea and " do
    visit "/"
    within("tr#idea#{@idea.id}") do
      expect(find_field('title').value).to eq "Test Idea Title"
      expect(find_field('body').value).to eq "Test Idea Body"
      expect(page).to have_content "swill"
      click_on "delete"
    end

    wait_for_ajax

    expect(page).to_not have_content "Test Idea Title"
    expect(page).to_not have_content "Test Idea Body"
    expect(page).to_not have_content "swill"
  end
end
