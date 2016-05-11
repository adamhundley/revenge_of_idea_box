require 'rails_helper'

Selenium::WebDriver.for :chrome

RSpec.feature "UserCreatesAnIdea", type: :feature, js: true do

  scenario "User the home page and adds a new idea and it is immediately rendered to the table" do
    visit "/"

    expect(current_path).to eq "/"
    expect(page).to have_content "Welcome to your Idea Box!"

    find('.lightbulb').click

    within('div#addIdea') do
      fill_in "title", with: "New Idea Title"
      fill_in "body", with: "New Idea Body"
      click_on "save"
    end

    wait_for_ajax

    within('div.ideas') do
      expect(find_field('title').value).to eq "New Idea Title"
      expect(find_field('body').value).to eq "New Idea Body"
      expect(page).to have_content "swill"
    end

    expect(current_path).to eq "/"
  end
end
