
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


  if (window.location.pathname==='/dashboard'){
    $('html, body').css({
      'background-image': 'url("")',
      'background-attachment': 'fixed'
      //body.style.background = 'background: linear-gradient(to right, rgb(200,245,240), MintCream, MintCream, white, white, MintCream, MintCream, rgb(200,245,240));'
    })
  }
  // if (window.location.pathname==='/signup' || window.location.pathname==='/login'){
  //   $('html, body').css({
  //     'background-image': 'url("../img/coloredLines.jpg")',
  //     'background-attachment': 'fixed'
  //   })
  // }
  if (window.location.pathname==='/'){
    $('html, body').css({
      'background-image': 'url("../img/woodBackground.jpg")',
      'background-attachment': 'fixed',
      'background-size': '100% 100%'
    })
  }
});
