require 'rails_helper'

RSpec.describe Idea, type: :model do
  describe Idea do
    it { should validate_presence_of :title }
    it { should validate_presence_of :body }
    it { should validate_presence_of :quality }
  end

  it "should be valid and default to swill" do
    idea = Idea.create(title: "New title",
                       body: "new body")

    expect(idea).to be_instance_of Idea
    expect(idea).to be_valid
    expect(idea.title).to eq "New title"
    expect(idea.body).to eq "new body"
    expect(idea.quality).to eq "swill"
  end

  it "should be invalid with no title" do
    idea = Idea.create(title: "",
                       body: "new body")

    expect(idea).to_not be_valid
  end

  it "should be invalid with no title" do
    idea = Idea.create(title: "title",
                       body: "")

    expect(idea).to_not be_valid
  end
end
