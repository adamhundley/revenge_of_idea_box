class IdeaEditor
  def self.upvoter(idea)
    if idea.quality == "swill"
      idea.update(quality: "plausible")
    elsif idea.quality == "plausible"
      idea.update(quality: "genius")
    end
  end

  def self.downvoter(idea)
    if idea.quality == "plausible"
      idea.update(quality: "swill")
    elsif idea.quality == "genius"
      idea.update(quality: "plausible")
    end
  end

  def self.updater(idea, params)
    if params[:title]
      idea.update(title: params[:title])
    elsif params[:body]
      idea.update(body: params[:body])
    end
  end
end
