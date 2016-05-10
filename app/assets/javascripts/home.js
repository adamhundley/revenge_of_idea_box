// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){
  getTheIdeas();

  function getTheIdeas(){
    return $.getJSON("/api/v1/ideas").then(function(ideas){
      addIdeasToPage(ideas);
    })
  };

  function addIdeasToPage(ideas) {
    var renderedIdeas = ideas.map(renderedIdea);
  }

  function renderedIdea(idea) {
    addIdeaToTable(idea);
  }

  function addIdeaToTable(idea) {
    html = '<tr><td>' + idea.title + '</td><td>' + idea.body + '</td><td>' + idea.quality + '</td></tr>'
    $('.ideas-table').prepend(html)
  }

  $('.addIdeaForm').on('submit', function() {
    event.preventDefault();

    var idea = $.post( "/api/v1/ideas", { title: $('#title').val(), body: $('#body').val()}, function(data) {
      addIdeaToTable(data)
  });


  $('.addIdeaForm').trigger('reset')

  });
});
