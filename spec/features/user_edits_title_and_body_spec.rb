require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserUpvotesAnIdea", type: :feature, js: true do
  before(:each) do
    @idea = Idea.create(title: "Test Idea Title", body: "Test Idea Body")
  end

  scenario "User visits the home page,edits the body and title an idea and sees change on page" do
    visit "/"

    within("tr#idea#{@idea.id}") do
      find("#title").click
      fill_in "title", with: "New Title"
      find("#body").click
      fill_in "body", with: "New Body"
      #below simply clicks to insure body is saved
      find("#title").click
    end

    visit "/"

    within("tr#idea#{@idea.id}") do
      expect(find_field('title').value).to eq "New Title"
      expect(find_field('body').value).to eq "New Body"
    end
  end
end
