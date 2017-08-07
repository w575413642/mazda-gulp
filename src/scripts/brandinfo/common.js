$(function() {

    var $pagenav = $('.cti-page-nav'),
        offsetTop = 0;
    if ($pagenav.length > 0)
        offsetTop = $pagenav.offset().top;

    $(window).scroll(function() {
        if ($(window).scrollTop() >= offsetTop) {
            $pagenav.addClass('d-fix');
        } else {
            $pagenav.removeClass('d-fix');
        }
    });

    $(window).on('winresize', function() {
        $pagenav.removeClass('d-fix');
    });

    $('.d-btntop').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    });
    $('.cti-subnav-brand .pull-right .d-links li a').removeAttr('target');
    $('.cti-header .cti-skyactiv .d-link a').removeAttr('target');
});
