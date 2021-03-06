$(document).on('click', '.delete-idea', function(){
  var ideaId = $(this).attr('data-id');
  $.ajax({
    url: '/api/v1/ideas/'+ideaId+'',
    type: 'DELETE',
    dataType: 'json'
  });
  $('.ideas-table #idea'+ ideaId +'').hide();
});

$(document).on('click', '.upvote', function(){
  event.preventDefault();
  var ideaId = $(this).attr('data-id');
  $.post('/api/v1/ideas/upvote', {id: ideaId} ).then(function(idea){
    $('.ideas-table #idea'+ ideaId +' .quality').empty().append(idea.quality);

  $('.ideas-table #idea'+ ideaId +' .downvoteImage').removeClass('dimVote');

    if(idea.quality === 'genius'){
      $('.ideas-table #idea'+ ideaId +' .upvoteImage').addClass('dimVote');
    }
  });
});

$(document).on('click', '.downvote', function(){
  event.preventDefault();
  var ideaId = $(this).attr('data-id');
  $.post('/api/v1/ideas/downvote', {id: ideaId} ).then(function(idea){
    $('.ideas-table #idea'+ ideaId +' .quality').empty().append(idea.quality);

      $('.ideas-table #idea'+ ideaId +' .upvoteImage').removeClass('dimVote');

    if(idea.quality === 'swill'){
      $('.ideas-table #idea'+ ideaId +' .downvoteImage').addClass('dimVote');
    }
  });
});
