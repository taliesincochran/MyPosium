
$(document).ready(function () {
  $("a").click(function (event) {
    if (this.hash!=="") {
      event.preventDefault();
      var hash = this.hash;
      $('html').animate({
        scrollTop: $(hash).offset().top
      },500, function () {
        window.location.hash = hash;
      });
    }
  });
  if (window.location.pathname==='/dasbboard'){
    $('html, body').css({
      'background-image': 'url("")',
      'background-attachment': 'fixed'
    })
  }
  if (window.location.pathname==='/signup' || window.location.pathname==='/login'){
    $('html, body').css({
      'background-image': 'url("../img/coloredLines.jpg")',
      'background-attachment': 'fixed'
    })
  }
  if (window.location.pathname==='/'){
    $('html, body').css({
      'background-image': 'url("../img/woodBackground.jpg")',
      'background-attachment': 'fixed',
      'background-size': 'cover'
    })
  }
});
