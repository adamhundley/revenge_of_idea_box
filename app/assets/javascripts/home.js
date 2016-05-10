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
    html = '<tr id=idea'+ idea.id +'>';
    html += '<div class="form-group"><td><input type="text" name="title" value=\''+ idea.title +'\' class="toedit" id="title" readonly="readonly" data-id='+ idea.id + '/></td></div><td>';
    html += '<input type="text" name="body" value=\''+ idea.body +'\' class="toedit" readonly="readonly" id="body" size="100" data-id='+ idea.id + '/></td><td class="quality">' + idea.quality + '</td>';
    html += '<td><a href="#" class="delete-idea" id=delete data-id='+ idea.id + '>Delete</a></td>';
    html += '<td><a href="" class="downvote" id="downvote" data-id='+ idea.id +'>'
    html += '<img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/512/thumbs-down-icon.png" class="vote">'
    html += '<a href="" class="upvote" id="upvote" data-id='+ idea.id +'>'
    html += '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Thumbs_up_font_awesome.svg/2000px-Thumbs_up_font_awesome.svg.png" class="vote"></td>'
    html += '</tr>'
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
      dataType: 'json'
    });
    $('.ideas-table #idea'+ ideaId +'').hide()
  })

  $(document).on('click', '.upvote', function(){
    event.preventDefault();
    var ideaId = $(this).attr('data-id')
    $.post('/api/v1/ideas/upvote', {id: ideaId} ).then(function(idea){
      $('.ideas-table #idea'+ ideaId +' .quality').empty().append(idea.quality)
    });
  });

  $(document).on('click', '.downvote', function(){
    event.preventDefault();
    var ideaId = $(this).attr('data-id')
    $.post('/api/v1/ideas/downvote', {id: ideaId} ).then(function(idea){
      $('.ideas-table #idea'+ ideaId +' .quality').empty().append(idea.quality)
    });
  });

  $(".ideas-table").on("focus", "input, select", function(){
    $(this)
    .prop("readonly", false)
    .removeClass("toedit");
  });

  $(".ideas-table").on("blur", "input, select", function(){
      $(this)
      .prop("readonly", true)
      .addClass("toedit")

      var ideaId = $(this).attr('data-id');

      var newText = $(this).val();
      var attribute = $(this).attr('name');

      $.ajax({
        url: '/api/v1/ideas/'+ ideaId +'',
        type: 'PATCH',
        dataType: 'json',
        data: attribute + '=' + newText

      })
  });

  $(".ideas-table").on("click", "td", function(){
      $(this).children().focus();
  });
});
