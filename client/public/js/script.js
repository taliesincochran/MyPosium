
$(document).ready(function () {
  console.log('(((((((((((((((((((((((((())))))))))))))))))))))))))')
  $("a").click(function (event) {
    console.log('++++++++++++++++++++++++++', this.hash)
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
});
