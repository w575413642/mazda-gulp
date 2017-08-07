/*
    ==============
    @_@
    by cti Hniker.
    ==============
*/
// hover事件延迟处理(√)
(function($) {
    $.fn.hoverDelay = function(options) {
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function() {
                $.noop();
            },
            outEvent: function() {
                $.noop();
            }
        };
        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer;
        return $(this).each(function() {
            $(this).hover(function() {
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            }, function() {
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    }
})(jQuery);

// 动画回调
var aniCallBack = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

(function($) {
    //变量定义区域



    // 屏幕相关
    var WinH = $(window).height(),
        WinW = $(window).width();

    // 外层架构
    var $pages;

    // 各个屏幕的舞台（绘图区域）
    var $pageStages;


    pageInit();

    //重置全局变量
    function fixWinHW() {
        WinH = $(window).height();
        WinW = $(window).width();

        // 外层架构
        $pages = $('.cti-page');
        $jpage = $('.cti-jpage');

        // 各个屏幕的舞台（绘图区域）
        $pageStages = $('.cti-bg');

    };


    //自适应每一屏幕的高度
    function fixPageHeight() {
        var _jW = 1920;
        var _miniW = 750;
        if (WinW > 768) {
            $jpage.each(function(i, el) {
                var that = $(this);
                var _jH = that.attr('data-h');
                _scale = _jW / _jH;
                _newH = WinW / _scale;
                $(this).height(_newH);
            });
            $pages.height(WinH);
        } else {
            $jpage.each(function(i, el) {
                var that = $(this);
                var _jH = that.attr('data-mini');
                _scale = _miniW / _jH;
                _newH = WinW / _scale;
                $(this).height(_newH);
            });
        }
    }


    //自适应每一屏幕的舞台
    function fixPageBg() {
        $pageStages.each(function(i) {
            var _t = $(this),

                natW = $(this).attr('data-w'),

                natH = $(this).attr('data-h'),

                natQuotient = natW / natH,

                _oH = $(this).parent().height(),

                _oW = $(this).parent().width(),

                winQuotient = _oW / _oH;

            if (winQuotient > natQuotient) {
                //console.log("a");
                //屏幕宽高比大于img宽高比
                _t.css({
                    'width': _oW,
                    'height': _oW / natQuotient
                });
                var fixTop = Math.round(_oH - _t.height() >> 1);

                _t.css({
                    'position': 'absolute',
                    'bottom': fixTop / 2,
                    'left': '-1px'
                });


            } else if (winQuotient < natQuotient) {
                //console.log("b");

                _t.css({
                    'width': _oH * natQuotient,
                    'height': _oH
                });
                var fixLeft = Math.round(_oW - _t.width() >> 1);


                _t.css({
                    'position': 'absolute',
                    'left': fixLeft,
                    'bottom': 0
                });

            } else {
                //console.log("c");

                _t.css({
                    'position': 'absolute',
                    'width': _oW,
                    'height': _oH,
                    'left': '-1px',
                    'bottom': 0
                });

            }
        });
    }

    $(window).scroll(function() {
        var $miniNav = document.getElementById('miniNav');
        var $page2 = document.getElementById('page2');
        var fix = $miniNav.getBoundingClientRect().top //元素顶端到可见区域顶端的距离
        var fix2 = $page2.getBoundingClientRect().top //元素顶端到可见区域顶端的距离
        var ses = document.documentElement.clientHeight //浏览器可见区域高度。
        var _hideTop = $(document).scrollTop();
        var $btndown = $('.cti-btn-down');
        if (WinW <= 768) {
            $(".cti-mini-nav").fadeIn();
            if (fix <= 50) {
                $(".cti-mini-nav").addClass('fix-50');
            }
            if (fix2 > 100) {
                $(".cti-mini-nav").removeClass('fix-50');
            }
        } else {
            if (_hideTop > WinH * 0.8) {
                $(".cti-mini-nav").fadeIn();
            } else {
                $(".cti-mini-nav").fadeOut();
            }
        }
        if (($(window).scrollTop()) > WinH) {
            $('.cti-scrl-top').addClass('d-show');
        } else {
            $('.cti-scrl-top').removeClass('d-show');
        }

        if (_hideTop >= $('body').height() - $(window).height()) {
            $btndown.addClass('d-hide');
        } else {
            $btndown.removeClass('d-hide');
        }
    });

    $(".mini-end").on('touchend', function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    });

    function p1Wrap() {
        $(window).resize(function(event) {
            fixWinHW();
            fixPageHeight();
            fixPageBg();
        }).resize();
    }

    function pageInit() {
        // 首屏初始化
        p1Wrap();
    }

    window.onload = function() {
        gopage();
    }

    window.onhashchange = function() {
        gopage();
    }

    function gopage() {
        //锚链接跳转
        var hash = location.hash.replace('#', '');
        try {
            if (hash)
                $('body,html').animate({
                    scrollTop: $('[data-name="' + hash + '"]').offset().top - $('.cti-header').height() - $('#miniNav').outerHeight(true) + 5
                }, 'slow')
        } catch (e) {}
    }
    //去除二级导航的target
    $('.cti-subnav-brand .pull-left ul li a').removeAttr('target');
    $('.cti-subnav-brand .pull-right .d-btn a').removeAttr('target');

})(jQuery);
// end.
