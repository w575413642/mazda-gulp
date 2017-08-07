$(".cti-p5-box ul").find('li').each(function(i, e) {
    var that = $(this);
    that.hoverDelay({
        hoverEvent: function() {
            that.find('i').addClass('bg-active');
            that.siblings().find('i').removeClass('bg-active');
            $(".p5-text-dex").eq(i).fadeIn().siblings(".p5-text-dex").hide();
        }
    });
});


$(function() {

    // $(".cti-soul-img").on('load error', function() {
    setTimeout(function() {
        $(".cti-soul-img").addClass('animated fadeOut').one(aniCallBack, function(event) {
            $(this).removeClass('animated fadeOut').hide();
            $(".cti-soul-des").addClass('animated fadeIn').show();
        });
    }, 2000);
    // });
    $(".history-btn").on('click', function(event) {
        event.preventDefault();
        $(".p3-img-pop").fadeIn();
    });
    $(".p3-img-pop").hoverDelay({
        outEvent: function() {
            $(".p3-img-pop").fadeOut();
        }
    });

    var _imgNum = 1;
    $(".soul-l-ctrl").on('click', function(event) {
        event.preventDefault();
        $(".pop-loading-box").fadeIn();
        _imgNum--;
        if (_imgNum < 2) {
            $(this).fadeOut();
        }

        if (_imgNum < 1) {
            _imgNum = 1;
            return;
        }

        if (_imgNum < 90) {
            $(".soul-r-ctrl").fadeIn();
        }

        $(".p3-img-inner").find('img').attr('src', '/views/default/images/history/' + _imgNum + '.jpg');
        $(".p3-img-inner").find('img').load(function() {
            /* Act on the event */
            $(".pop-loading-box").fadeOut();
        });
    });

    $(".soul-r-ctrl").on('click', function(event) {
        event.preventDefault();
        $(".pop-loading-box").fadeIn();
        _imgNum++;
        if (_imgNum > 89) {
            $(this).fadeOut();
        }

        if (_imgNum > 90) {
            _imgNum = 90;
            return;
        }

        if (_imgNum > 1) {
            $(".soul-l-ctrl").fadeIn();
        }

        $(".p3-img-inner").find('img').attr('src', '/views/default/images/history/' + _imgNum + '.jpg');
        $(".p3-img-inner").find('img').load(function() {
            /* Act on the event */
            $(".pop-loading-box").fadeOut();
        });
    });

});

// $(".mini-inner-nav").find('li').on('click', function(event) {
// 	event.preventDefault();
//     offTop1 = $(".offset-1").offset().top;
//     offTop2 = $(".offset-2").offset().top;
//     offTop3 = $(".offset-3").offset().top;
//     offTop4 = $(".offset-4").offset().top;
//     offTop5 = $(".offset-5").offset().top;
//     offTop6 = $(".offset-6").offset().top;
//     offTop7 = $(".offset-7").offset().top;
//     var scrollData = [offTop1,offTop2,offTop3,offTop4,offTop5,offTop6,offTop7];
//     var header_top = $(".cti-header").height();
// 	var i = $(this).index();
// 	$(this).addClass('act-mini').siblings().removeClass('act-mini');
// 	$('html,body').animate({scrollTop: scrollData[i] - header_top},1000);
// });
