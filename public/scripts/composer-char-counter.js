$(document).ready(function() {

  $("textarea").keyup(onKeyUp);

});

const onKeyUp = function () {
  
  
  const charLength = $("textarea").val().length;
  const remainingText = 140 - charLength;
  
  $(".counter").html(remainingText)

  if(remainingText < 0) {
    $(".counter").css("color", "red")
  } else {
    $(".counter").css("color", "black")
  }
}
