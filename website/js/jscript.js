$(document).ready( function () {
    var classAdded = false;
    
    $(window).scroll(function (event) {
        if ($(window).scrollTop() > 12) {
            $('header').addClass('headerActive');
        } else {
            $('header').removeClass('headerActive');
        }
    });
    
    $('nav a').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - $('header').outerHeight()
        }, 1000);
        return false;
    });
    
    $('.carouselWrapper').slick({
        accessibility: true,
        arrows: true,
        dots: true,
        draggable: true,
        infinite: true
    });
});