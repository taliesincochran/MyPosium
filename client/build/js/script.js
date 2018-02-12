
$(document).ready(function () {
  $(window).scroll(function (){
    console.log('firing');
    let wScroll = $(this).scrollTop();
    console.log(wScroll);
  });
  $("a").click(function (event) {
    if (this.hash!=="") {
      event.preventDefault();
      var hash = this.hash;
      $('html').animate({
        scrollTop: $(hash).offset().top
      },1000,  function () {
        window.location.hash = hash;
      });
    }

    $(window).scroll(function () {
          var wScroll = $(this).scrollTop();
          console.log(wScroll)
          // end of scroll
      });


  });



});
