 // Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){
  getTheIdeas();

  $('.addIdea').hide();

  $('.lightbulbContainer').on('click', 'img', function() {
    $(this).hide();
    $('.addIdea').show();
  });

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
    var body = idea.body.substring(0, 100)

    html = '<tr class="idea" id=idea'+ idea.id +'>';
    html += '<div class="form-group"><td class="title edit"><input type="text" name="title" value=\''+ idea.title +'\' class="toedit" id="title" readonly="readonly" data-id='+ idea.id + '></td></div><td class="edit body">';
    html += '<input type="text" name="body" value=\''+ body +'\' class="toedit" readonly="readonly" id="body" data-id='+ idea.id + '></td><td class="quality">' + idea.quality + '</td>';
    html += '<td><a href="" class="downvote" id="downvote" data-id='+ idea.id +'>';
    html += '<img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/512/thumbs-down-icon.png" class="vote">'
    html += '<a href="" class="upvote" id="upvote" data-id='+ idea.id +'>';
    html += '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Thumbs_up_font_awesome.svg/2000px-Thumbs_up_font_awesome.svg.png" class="vote"></td>';
    html += '<td><a href="#" class="delete-idea" id=delete data-id='+ idea.id + '><img src="http://www.meetchaos.com/resources/images/trash.png" class="trash"></a></td>';
    html += '</tr>';
    $('.ideas-table').prepend(html)
  }

  $('.addIdeaForm').on('submit', function() {
    event.preventDefault();

    var idea = $.post( "/api/v1/ideas", { title: $('#title').val(), body: $('#body').val()}).then(function(ideas) {
      addIdeaToTable(ideas)
  });
  $('.addIdea').hide();
  $('.lightbulbContainer img').show();
  $('.addIdeaForm').trigger('reset')

  });


});
