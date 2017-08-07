$(function() {


    function hashchange() {
        //锚链接跳转
        var hash = location.hash.replace('#', '');
        try {
            if (hash)
                $('body,html').stop().animate({
                    scrollTop: $('[data-name="' + hash + '"]').offset().top - $('.cti-header').height() - $('#miniNav').outerHeight(true) + 5
                }, 'slow')
        } catch (e) {}
    }
    window.onhashchange = hashchange;
    $(window).on('hashlink', function() {
        hashchange();
    });
    //去除导航的新开颜面功能
    $('.cti-subnav-news a').removeAttr('target');

    //下拉框模拟
    $('.cti-news-container .d-select .d-tip').click(function(e) {
        $(this).siblings('ul').show();
        e.stopPropagation();
    });

    $('.cti-news-container .d-select').on('click', 'li', function() {
        $(this).parent().hide();
        $(this).parents('.d-select').find('.d-tip').html($(this).html());
    });

    $('body').click(function() {
        $('.cti-news-container .d-select ul').hide();
    });
    setBoxSize();
    $(window).on('resize', function() {
        setBoxSize();
    });
})

function setBoxSize() {
    $('.cti-news-list .d-imgbox').css({
        height: $('.cti-news-list .d-imgbox').width() * (144.3 / 259.75)
    })
}
