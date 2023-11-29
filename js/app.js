
$(window).on('load', function () {
    setTimeout(function () {
        $("#loading-screen").fadeOut();
    }, 1000);
});
$(document).ready(function () {

    $('[data-bs-toggle="tooltip"]').each(function () {
        $(this).tooltip({
            delay: { "show": 500, "hide": 0 }
        });
    });
    $('[data-bs-toggle="tooltip"]').on('shown.bs.tooltip', function() {
      var tooltip = $(this);
      setTimeout(function() {
        tooltip.tooltip('hide');
      }, 1000);
    });

    var head_count = tail_count = 0;
    // coin flip
    $('#coin').on('click', function(){
        $('#skip').html(`Next <img src="/img/arrow.png"
        alt="arrow" class="pokemon-arrow ms-1">`)
        var flipResult = Math.floor(Math.random() * 2);
        $('#coin').removeClass();
        setTimeout(function(){
          if(flipResult === 1){
            $('#coin').addClass('heads animate');
            head_count++;
            console.log('head')
          }
          else{
            $('#coin').addClass('tails animate');
            tail_count++;
            console.log('tail')
          }
        }, 100);
        setTimeout(function(){
          $('#coin').removeClass('animate');
          $('.head-count').html(head_count)
          $('.tail-count').html(tail_count)
        }, 3000)
      });
});
