$(document).ready(function(){

  $(".ideas-table").on("click", "td", function(){
    $(this).children('.ideaBody').show();
    $(this).children('.ideaPara').hide();
    $(this).children('input').focus();
    $(this).children('textarea').focus();
  });

  $(".ideas-table").on("focus", "input, select", function(){
    $(this)
    .prop("readonly", false)
    .removeClass("toedit");
  });

  $('.ideas-table').on('keydown', "input, select", function (e){
    if(e.keyCode == 13){
      textInputChanges($(this));
    }
  });

  $(".ideas-table").on("blur", "input, select", function(){
    textInputChanges($(this));
  });

  var textInputChanges = function(input){
    input.prop("readonly", true);
    input.addClass("toedit");
    editIdea(input);
  };

  var editIdea = function(input){
    var ideaId = input.attr('data-id');

    var newText = input.val();
    var attribute = input.attr('name');

      $.ajax({
        url: '/api/v1/ideas/'+ ideaId +'',
        type: 'PATCH',
        dataType: 'json',
        data: attribute + '=' + newText
      });
  };

  $('.ideas-table').on('keydown', "textarea", function (e){
    if(e.keyCode == 13){
      $(this).hide();
      var ideaBody = checkIdeaBodyLength($(this).val());
      textAreaChanges($(this), ideaBody);
    }
  });

  $(".ideas-table").on("blur", "textarea", function(){
    $(this).hide();
    var ideaBody = checkIdeaBodyLength($(this).val());

    textAreaChanges($(this), ideaBody);
  });
  var textAreaChanges = function(area, ideaBody){
    area.siblings('.ideaPara').empty().append(ideaBody);
    area.siblings('.ideaPara').show();
    editIdea(area);
  };
});
