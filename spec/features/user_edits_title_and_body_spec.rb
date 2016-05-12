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
      find(".ideaPara").click
      fill_in "body", with: "New Body"
      #below simply clicks to insure body is saved
      find("#title").click
    end

    visit "/"

    within("tr#idea#{@idea.id}") do
      expect(find_field('title').value).to eq "New Title"
      expect(page).to have_content "New Body"
    end
  end

  scenario "User edits the body and it becomes longer than 100" do
    visit "/"

    within("tr#idea#{@idea.id}") do
      find("#title").click
      fill_in "title", with: "New Title"
      find(".ideaPara").click
      fill_in "body", with: "But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth."
      #below simply clicks to insure body is saved
      find("#title").click
    end

    visit "/"

    within("tr#idea#{@idea.id}") do
      expect(find_field('title').value).to eq "New Title"
      expect(page).to have_content "But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground...."
    end
  end
end
