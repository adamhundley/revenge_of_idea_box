$(document).ready(function(){
  $('#clear').on('click', function(){
    $('#searchIdeaForm').trigger('reset');
  });

  $('#search').on('keyup', function() {
    searchIdeas($(this).val());
  });

  var searchIdeas = function(searchString){
    var ideas = $('.idea');

    $.each(ideas, function(idea) {
      title = $(this).children('.title').children('#title').val();
      body = $(this).children('.body').children('#body').val();

      var matchingIdeas = findMatches(title, body, searchString);
        $(this).toggle(matchingIdeas);
    });
  };

  var findMatches = function(title, body, searchString) {
    return contains(title, searchString) || contains(body, searchString);
  };

  var contains = function(titleOrBodyString, searchString) {
    return titleOrBodyString.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
  };
});
