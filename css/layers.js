$( document ).ready(function() {
    $('.sample-content', this).toggle()
  });

$('.sample').click(function() {
  $('.sample-content', this).fadeToggle("fast")
});