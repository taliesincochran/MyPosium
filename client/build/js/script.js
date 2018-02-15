$(document).ready(function () {
  $(window).scroll(function (event){
    let wScroll = $(this).scrollTop();
    $('.titleOne, .titleTwo').css({
      'transform': 'translateY(-'+wScroll/2+'px) translateX(-'+wScroll/2+'px)'
    })
  })
})
