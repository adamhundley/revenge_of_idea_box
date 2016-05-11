$(document).ready(function(){
  $(".ideas-table").on("focus", "input, select", function(){
    $(this)
    .prop("readonly", false)
    .removeClass("toedit");
  });

  $('.ideas-table').on('keydown', "input, select", function (e){
    if(e.keyCode == 13){
      editIdea($(this))
    }
  })

  var editIdea = function(input){

    input.prop("readonly", true)
    input.addClass("toedit")

    var ideaId = input.attr('data-id');

    var newText = input.val();
    var attribute = input.attr('name');

      $.ajax({
        url: '/api/v1/ideas/'+ ideaId +'',
        type: 'PATCH',
        dataType: 'json',
        data: attribute + '=' + newText
      })
  }

  $(".ideas-table").on("blur", "input, select", function(){
    editIdea($(this))
  });

  $(".ideas-table").on("click", "td", function(){
      $(this).children().focus();
  });
});
