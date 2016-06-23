
$(document).ready(function(){
  $('.billSearch').keypress(function(event){
    event.preventDefault();
    if(event.keyCode==13) {
      $('div.hiddenBills').fadeIn(7000).removeClass('hiddenBills');
      $('div.introContent').fadeOut(4000);
    }
  });
  $('.politicianSearch').keypress(function(event){
    event.preventDefault();
    if(event.keyCode==13) {
      $('div.hiddenPoliticians').fadeIn(7000).removeClass('hiddenPoliticians');
      $('div.introContent').fadeOut(4000);
    }
  });
});
