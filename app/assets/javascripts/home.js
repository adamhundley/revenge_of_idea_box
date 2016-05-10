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
    html = '<tr id=idea'+ idea.id +'><td>' + idea.title + '</td><td>' + idea.body + '</td><td>' + idea.quality + '</td><td><a href="#" class="delete-idea" id=delete data-id='+ idea.id + '>Delete</a></td></tr>'
    $('.ideas-table').prepend(html)
  }

  $('.addIdeaForm').on('submit', function() {
    event.preventDefault();

    var idea = $.post( "/api/v1/ideas", { title: $('#title').val(), body: $('#body').val()}).then(function(ideas) {
      addIdeaToTable(ideas)
  });


  $('.addIdeaForm').trigger('reset')

  });

  $(document).on('click', '.delete-idea', function(){
    var ideaId = $(this).attr('data-id')
    $.ajax({
      url: '/api/v1/ideas/'+ideaId+'',
      type: 'DELETE',
      dataType: "json",
    });
    $('.ideas-table #idea'+ ideaId +'').hide()
  })
});
