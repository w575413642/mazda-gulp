$(".cti-p3-li").find('li').on('click', function(event) {
    event.preventDefault();
    var _idx = parseInt($(this).index());
    var _src = $(this).find('img').eq(0).attr('src');
    $(this).find('img').eq(1).attr('src', 'images/technique/t_' + (_idx + 1) + '_act.png');

    $(this).siblings().each(function(i, e) {
        var idx = parseInt($(this).index()) + 1;
        $(e).find('img').eq(1).attr('src', 'images/technique/t_' + idx + '.png');
    });

    $(".p3-inner-box").eq(_idx).fadeIn().siblings().hide();

});

$(".cti-p3-li").find('li').eq(0).trigger('click');

$(function() {

    // $(".cti-soul-img").on('load error', function() {
    setTimeout(function() {
        $(".cti-soul-img").addClass('animated fadeOut').one(aniCallBack, function(event) {
            $(this).removeClass('animated fadeOut').hide();
            $(".cti-soul-des").addClass('animated fadeIn').show();
        });
    }, 2000);

    $('.cti-p4-box').mouseenter(function() {
			$(this).find('.cti-bottom-btn').trigger('hover');
    });
});
