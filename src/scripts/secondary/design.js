$(function() {
    var $slider = $('#cti_page_slider'),
        $dialog = $('#dialog_slider'),
        curIndex = 0,
        timer,
        canclose = false;
    $tab = $('.cti-art-cars li');

    $slider.slick({
        fade: true
    });

    setTimeout(function() {
        $(".cti-soul-img").addClass('animated fadeOut').one(aniCallBack, function(event) {
            $(this).removeClass('animated fadeOut').hide();
            $(".cti-soul-des").addClass('animated fadeIn').show();
        });
    }, 4000);

    //初始化
    $dialog.slick({});

    $('.cti-cars-dialog .d-close').click(function(e) {
        $('.cti-cars-dialog').removeClass('d-show');
        timerstart();
        e.stopPropagation();
    });

    $slider.click(function() {
        canclose = false;
        setTimeout(function() {
            canclose = true;
        }, 1000);
        //如果当前列表打开则关闭
        if ($('.cti-cars-dialog').attr('class').indexOf('d-show') >= 0) {
            $('.cti-cars-dialog .d-close').trigger('click');
            return;
        }

        //切换列表
        var flag = $tab.siblings('.d-active').attr('data-flag');
        if (!flag) flag = artcars[0].model;
        //销毁
        $('#dialog_slider .image').each(function(index, ele) {
            $('#dialog_slider').slick('slickRemove', index);
        });
        $('#dialog_slider').html('');
        try {
            $('#dialog_slider').slick('unslick');
        } catch (e) {

        }
        var html = '';
        for (var f in artcars) {
            if (artcars[f].model == flag) {
                for (var j in artcars[f].pics) {
                    html += '<div class="image">';
                    html += '<img src="' + artcars[f].pics[j] + '" alt="" /></div>';
                }
            }
        }
        $('#dialog_slider').html(html);
        $('#dialog_slider').slick({});
        $('.cti-cars-dialog').addClass('d-show');
        stoptimer();
    });

    $('body').on('click', function() {
        if (!canclose) return;
        $('.cti-cars-dialog').removeClass('d-show');
        timerstart();
    });

    $dialog.click(function(e) {
        e.stopPropagation();
    });

    $tab.mouseover(function() {
        $slider.slick('slickGoTo', $(this).index());
        $(this).addClass('d-active').siblings('li').removeClass('d-active');
    });

    $tab.mouseenter(function() {
        stoptimer()
    });

    $tab.mouseleave(function() {
        timerstart()
    });

    function timerstart() {
        try {
            window.clearInterval(timer);
        } catch (e) {

        }
        timer = setInterval(function() {
            curIndex++;
            if (curIndex == $tab.length)
                curIndex = 0;
            $('.cti-art-cars li').eq(curIndex).trigger('mouseover');
        }, 4000);
    }
    timerstart();

    function stoptimer() {
        window.clearInterval(timer);
    }

    window.swiper = new Swiper('#cti_art_slider', {
        loop: true,
        calculateHeight: true,
        speed: 800
    });
    //加载设计进化
    window.loadevolve = function(url) {
        try {
            $('.cti-design-evolvemodal .d-loading').addClass('d-show');
            $('.cti-design-evolvemodal .d-frwrap').load(url, function() {
                $('.cti-design-evolvemodal').addClass('d-show');
                $('.cti-design-evolvemodal').one('click', function() {
                    $('.cti-design-evolvemodal').addClass('d-hide');
                    $('.cti-design-evolvemodal').removeClass('d-show d-hide');
                    $('.cti-design-evolvemodal .d-content').removeAttr('style');
                });

                function imgLoad(img, callback) {
                    var timer = setInterval(function() {
                        if (img.complete) {
                            callback(img)
                            clearInterval(timer)
                        }
                    }, 50)
                }
                if ($('.cti-design-evolvemodal .slick .image').length <= 0) {
                    setHeight();
                } else {
                    imgLoad($('.cti-design-evolvemodal .slick .image').eq(0).find('img')[0], function() {
                        setTimeout(function() {
                            setHeight();
                        }, 500)
                    });
                }


            });
        } catch (e) {
            alert('网络错误，请稍后再试！');
        }
    }

    function setHeight() {
        if (!browserTest.isphone()) {
            $('.cti-design-evolvemodal .d-content').css({
                'top': ($(window).height() - $('.cti-design-evolvemodal .d-content').height() + $('.cti-header').height()) / 2,
                'opacity': 1
            });
        } else {
            $('.cti-design-evolvemodal .d-content').css({
                'top': $('.cti-header').height() + 10,
                'opacity': 1
            });
        }

        $('.cti-design-evolvemodal .d-loading').removeClass('d-show');
    }

    $(window).resize(function() {
        setHeight();
    })

    $('.cti-design-evolvemodal .d-close').click(function() {
        $('.cti-design-evolvemodal').addClass('d-hide');
        $('.cti-design-evolvemodal').removeClass('d-show d-hide');
        $('.cti-design-evolvemodal .d-content').removeAttr('style');
    });
    //阻止冒泡
    $('[data-toggle="stopPropagation"]').click(function(evt) {
        evt.stopPropagation();
    });

    $('#cti_page_slider').on('click', '.slick-next,.slick-prev', function(evt) {
        stoptimer();
        evt.stopPropagation();
    })
})
