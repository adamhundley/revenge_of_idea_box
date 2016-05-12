 // Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function truncateBody(body) {
  var bodyLength = body.lastIndexOf(' ', 100);
  return body.substring(0, bodyLength)+'...';
}

function checkIdeaBodyLength(body){
  if(body.length > 100) {
    return truncateBody(body);
  } else {
    return body;
  }
}

$(document).ready(function(){
  getTheIdeas();

  function getTheIdeas(){
    return $.getJSON("/api/v1/ideas").then(function(ideas){
      addIdeasToPage(ideas);
    });
  }

  function addIdeasToPage(ideas) {
    var renderedIdeas = ideas.map(renderedIdea);
  }

  function renderedIdea(idea) {
    addIdeaToTable(idea);
  }

  function addIdeaToTable(idea) {

    var ideaBody = checkIdeaBodyLength(idea.body);

    html = '<tr class="idea" id=idea'+ idea.id +'>';
    html += '<td class="title edit"><input type="text" name="title" value=\''+ idea.title +'\' class="toedit" id="title" readonly="readonly" data-id='+ idea.id + '></td><td class="edit body">';
    html += '<p class="ideaPara">'+ ideaBody +'</p><textarea name="body" rows="3" wrap="hard" cols="70" class="ideaBody toedit" id="body" data-id='+ idea.id + '>'+ idea.body +'</textarea></td><td class="quality">' + idea.quality + '</td>';
    html += '<td><a href="" class="downvote" id="downvote" data-id='+ idea.id +'>';
    html += '<img src="http://icons.iconarchive.com/icons/custom-icon-design/mono-business-2/512/thumbs-down-icon.png" class="vote downvoteImage" id="downvote'+ idea.id +'"></a>';
    html += '<a class="upvote" id="upvote" data-id='+ idea.id +'>';
    html += '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Thumbs_up_font_awesome.svg/2000px-Thumbs_up_font_awesome.svg.png" class="vote upvoteImage" id="upvote'+ idea.id +'"></a></td>';
    html += '<td><a class="delete-idea" id=delete data-id='+ idea.id + '><img src="http://www.meetchaos.com/resources/images/trash.png" class="trash"></a></td>';
    html += '</tr>';
    $('.ideas-table').prepend(html);

    if (idea.quality == "swill") {
      $('#downvote'+ idea.id +'').addClass('dimVote');
    } else if (idea.quality == "genius") {
      $('#upvote'+ idea.id +'').addClass('dimVote');
    }
  }

  $('.addIdeaForm').on('submit', function() {
    event.preventDefault();

    var idea = $.post( "/api/v1/ideas", { title: $('#title').val(), body: $('#body').val()}).then(function(ideas) {
      addIdeaToTable(ideas);
  });
  $('.addIdea').hide();
  $('.lightbulbContainer img').show();
  $('.addIdeaForm').trigger('reset');
  });
});
