$(document).ready(function(){

  $(".ideas-table").on("focus", "input, select", function(){
    $(this)
    .prop("readonly", false)
    .removeClass("toedit");
  });


  $('.ideas-table').on('keydown', "input, select", function (e){
    if(e.keyCode == 13){
      $(this).prop("readonly", true)
      $(this).addClass("toedit")

      editIdea($(this))
    }
  })

  $('.ideas-table').on('keydown', "textarea", function (e){
    if(e.keyCode == 13){
      $(this).hide()
      $(this).hide()
      if($(this).val().length > 100 ) {
        var ideaBody = truncateBody($(this).val())
      } else {
        var ideaBody = $(this).val();
      }
      $(this).siblings('.ideaPara').empty().append(ideaBody)
      $(this).siblings('.ideaPara').show()
      editIdea($(this))
    }
  })

  function truncateBody(body) {
    var bodyLength = body.lastIndexOf(' ', 100);
    return body.substring(0, bodyLength)+'...'
  }

  var editIdea = function(input){
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
    $(this).prop("readonly", true)
    $(this).addClass("toedit")
    editIdea($(this))
  });

  $(".ideas-table").on("blur", "textarea", function(){
    $(this).hide()
    if($(this).val().length > 100 ) {
      var ideaBody = truncateBody($(this).val())
    } else {
      var ideaBody = $(this).val();
    }
    $(this).siblings('.ideaPara').empty().append(ideaBody)
    $(this).siblings('.ideaPara').show()
    editIdea($(this))
  });

  $(".ideas-table").on("click", "td", function(){
      $(this).children('.ideaBody').show()
      $(this).children('.ideaPara').hide()
      $(this).children().focus();
  });
});
