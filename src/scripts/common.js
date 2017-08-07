(function() {
    var debounce = function(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    window.onresize = debounce(function() {
        $(window).trigger('winresize');
    }, 100, true);

    window.navbar = (function() {
        var _this = this,
            $eventwrap = $('.cti-subnav-event'),
            $eventright = $eventwrap.find('.pull-right'),
            $allcar = $('.cti-subnav-allcar'),
            $allcarright = $allcar.find('.pull-right'),
            $nav = $('.cti-nav'),
            $navli = $('.cti-nav li'),
            $navslider = $('.cti-nav-line .d-slider'),
            $subnav = $('.cti-subnav>div'),
            $brandtab = $('.cti-subnav-brand .d-tab li'),
            $brandlist = $('.cti-subnav-brand .cti-navslider .d-item'),
            $sections = $('.cti-welcome,.cti-brand,.cti-news,.cti-event,.cti-allcar'),
            navActive = -1,
            $eventArrow = $('.cti-subnav-event .d-btn-down'),
            $mobileBtn = $('.cti-mobile-btn'),
            $navmask = $('.cti-header .cti-nav:after'),
            isHideSubNav = false;

        //手机菜单切换
        $mobileBtn.click(function() {
            $nav.toggleClass('d-show');
            $(this).toggleClass('d-open');
        });
        //隐藏手机
        $navmask.click(function() {
            $nav.removeClass('d-show');
        });

        _this.eventRightSwiper = new Swiper('#cti_subnav_eventlistmax', {
            calculateHeight: true,
            mode: 'vertical'
        });
        //给dom 添加标识
        $('#cti_subnav_eventlistmin .swiper-slide').each(function(i, ele) {
            $(ele).attr('data-index', i);
        });

        _this.eventLeftSwiper = new Swiper('#cti_subnav_eventlistmin', {
            mode: 'vertical',
            slidesPerView: 5,
            loop: true
        });

        //事件切换
        $eventArrow.click(function() {
            _this.eventLeftSwiper.swipeNext();
        });
        //事件悬浮切换
        $(_this.eventLeftSwiper.slides).mouseenter(function() {
            var index = $(this).index();
            //console.log($(this).attr('data-index'));
            _this.eventRightSwiper.swipeTo($(this).attr('data-index'), 800);
        });
        //事件进入默认跳转第一个活动
        $('[data-target="event"]').mouseenter(function() {
            _this.eventLeftSwiper.swipeTo(0, 0);
        });

        //重置高度
        function resize() {
            var eventscale = 990.6 / 593;
            var carscale = 604 / 594;
            $eventwrap.height($eventright.width() / eventscale);
            $allcar.height($allcarright.width() / carscale);
            setTimeout(function() {
                _this.eventLeftSwiper.reInit();
            }, 500);
        };

        $(window).on('winresize', function() {
            resize();
        });

        $(window).trigger('winresize');
        //导航悬浮
        $navli.click(function() {
            var _that = this;
            _this.changeNavSlider($(_that).index());
            $(_that).addClass('d-active').siblings().removeClass('d-active');
            //切换下拉菜单
            $subnav.not($('.cti-subnav-' + $(_that).attr('data-target'))).removeClass('d-active');
            $('.cti-subnav-' + $(_that).attr('data-target')).toggleClass('d-active');
        });
        $('body').click(function() {
            $subnav.removeClass('d-active');
        });
        $('.cti-header').click(function(evt) {
            evt.stopPropagation();
        });

        //设置导航地址
        setTimeout(function() {
            if (browserTest.isphone()) {
                $('[data-havesubnav]').each(function() {
                    $(this).attr('href', $(this).attr('data-havesubnav') + $(this).attr('href'));
                })
            }
        }, 500)

        //导航hash 监听
        window.onhashchange = function() {
            if (browserTest.isphone()) {
                _this.hashmove();
            }
        }

        $('[data-hashmove]').click(function() {
            _this.hashmove();
        });

        _this.hashmove = function() {
            var hash = window.location.hash.replace('#', '.cti-');
            //尝试跳转
            try {
                var top = $(hash).offset().top - $('.cti-header').height();
                //如果是新闻页面跳到中间
                // if (hash == '.cti-news') {
                //     top += ($(hash).height() - ($(window).height() - $('.cti-header').height())) / 2;
                // }
                // if (hash == '.cti-event') {
                //     top += ($(hash).height() - ($(window).height() - $('.cti-header').height()));
                // }
                $('html,body').animate({
                    scrollTop: top
                }, 'slow');
                //切换下拉菜单
                $subnav.removeClass('d-active');
                setTimeout(function() {
                    $subnav.addClass('d-hide');
                }, 600);
            } catch (e) {
                //console.log(e.message);
            }
        }

        //二级导航移出
        $subnav.mouseleave(function() {
            //保留功能 但不开启
            return;
            $subnav.removeClass('d-active');
            var _this = $(this);
            resetNavSlider();
        });
        $subnav.mouseenter(function() {
            isHideSubNav = false;
        });
        $nav.mouseleave(function() {
            //保留功能 但不开启
            return;
            isHideSubNav = true;
            setTimeout(function() {
                if (isHideSubNav) {
                    $subnav.removeClass('d-active');
                    resetNavSlider();
                }
            }, 1000);
        });

        _this.changeNavSlider = function(i) {
            $navslider.css({
                'left': 14.285 * i + '%'
            });
            navActive = i;
        }

        var resetNavSlider = function() {
            var i = $nav.find('[nav-default="true"]').index();
            $navslider.css({
                'left': 14.285 * i + '%'
            });
            navActive = i;
        }

        //导航技艺切换
        $brandtab.mouseenter(function() {
            $(this).addClass('d-active').siblings().removeClass('d-active');
            $brandlist.eq($(this).index()).addClass('d-active').siblings().removeClass('d-active');
        });

        //记录标记
        var dataIndex = -1;
        $sections.each(function() {
            dataIndex += 1;
            $(this).attr('data-index', dataIndex)
        });

        var isHomePage = true;
        setTimeout(function() {
            if ($('[nav-default="true"]').index() != 0)
                isHomePage = false;
        }, 600);
        //导航滚动效果
        $(window).scroll(function() {
            if (!isHomePage) return;
            $sections.each(function(i, ele) {
                var top = ele.getBoundingClientRect().top //元素顶端到可见区域顶端的距离
                var se = document.documentElement.clientHeight //浏览器可见区域高度。
                if (top <= se / 2) {
                    if ($(ele).attr('data-index') == navActive) {
                        //console.log('s');
                        return;
                    }
                    _this.changeNavSlider($(ele).attr('data-index'));
                }
            });
            if ($(window).scrollTop() > 50) {
                $('.cti-zoom-icon').addClass('d-hide');
            } else {
                $('.cti-zoom-icon').removeClass('d-hide');
            }
        });
        //默认首页
        $navli.eq(0).addClass('d-active').attr('nav-default', true).siblings().removeClass('d-active').attr('nav-default', false);
        //初始化导航
        _this.default = function(index) {
            _this.changeNavSlider(index);
            $navli.eq(index).addClass('d-active').attr('nav-default', true).siblings().removeClass('d-active').attr('nav-default', false);
        };
        return _this;
    })();

    var backTOP = (function() {
        var winH = $('body').height();
        $('.cti-scrl-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
        });
        $('.cti-scrl-bom').click(function() {
            $('body,html').animate({
                scrollTop: winH
            }, 'slow');
        });
        //滚动
        $(window).scroll(function() {
            //console.log((winH - $(window).scrollTop() - $(window).height()), $(window).height());
            checkscroll();
        });

        function checkscroll() {
            var st = $(window).scrollTop();
            //console.log(st);
            //判断是否再顶部
            if (st >= $(window).height() - $('.cti-header').height()) {
                $('.cti-scrl-top').addClass('d-show');
            } else {
                $('.cti-scrl-top').removeClass('d-show');
            }

        }
        checkscroll();
    })();

    var videoModel = (function() {
        $('body').on('click', '.d-close', function() {
            var $model = $(this).parents('.cti-video-modal');
            $model.fadeOut(function() {
                $model.remove();
            });
        });
    })();

    /**
     * 底部
     * @type {[type]}
     */
    var toggleSelect = (function() {
        $('[date-toggle="select"]').on('click', function(evt) {
            $(this).find('.d-select').toggleClass('d-show');
            evt.stopPropagation();
        });
        $('body').on('click', function() {
            $('[date-toggle="select"]').find('.d-select').removeClass('d-show');
        })
    })();

    //a标签检测代码延迟
    $('[data-testcode]').click(function() {
        var ele = this;
        setTimeout(function() {
            var url = $(ele).attr('href')
            switch ($(ele).attr('target')) {
                case '_blank':
                    if (browserTest.isphone()) {
                        window.location.href = url;
                    } else {
                        window.open(url);
                    }
                    break;
                default:
                    window.location.href = url;
            }
        }, 1000)
        return false;
    })
})();

// 浏览器版本测试
var browserTest = {
    init: function() {
        this.ieversion = this.getversion(); //当前ie版本
        this.islowerversion = false; //是否为低版本
        if (this.ieversion == "ie8" || this.ieversion == "ie9" || this.ieversion == "ie7" || this.ieversion == "ie6") {
            this.islowerversion = true;
        }
    },
    getversion: function() {
        var ie_v = "";
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {
            ie_v = "ie7";
        } else
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
            ie_v = "ie8";
        } else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.") {
            ie_v = "ie9";
        } else if (navigator.appName == "Microsoft Internet Explorer") {
            ie_v = "ie6";
        }
        return ie_v;
    },
    isphone: function() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        this.phone = false;
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            this.phone = true;
        }
        if ($(window).width() <= 768) {
            this.phone = true;
        }
        return this.phone;
    }
}
browserTest.init();

/*视频工场*/
var videoFactory = function() {
    var self = this;
    this.getDevice = function() {
        if (/android/i.test(navigator.userAgent)) {
            return 'android';
        }

        if (/iphone/i.test(navigator.userAgent)) {
            return 'iphone';
        }

        if (/ipad/i.test(navigator.userAgent)) {
            return 'ipad';
        }

        if (/mac/i.test(navigator.userAgent)) {
            return 'mac';
        }

        if (/Windows/i.test(navigator.userAgent)) {
            return 'pc';
        }
        return 'unkone';
    };
    this.getPlayer = function(arg) {
        arg = $.extend({
            width: 850,
            height: 500,
            flv: '',
            ogg: '',
            mp4: '',
            teaserUrl: '',
            swfplayer: ''
        }, arg);
        var player = '<div>对不起，没有找到播放设备。</div>';
        var device = self.getDevice();
        switch (device) {
            case 'android':
                device = 'mac';
            case 'ipad':
                device = 'mac';
            case 'iphone':
                device = 'mac';
            case 'mac':
                tmp = '<video width="' + arg.width + '" height="' + arg.height + '"  autoplay="autoplay" controls="controls">' +
                    '<source src="' + arg.ogg + '" type="video/ogg">' +
                    '<source src="' + arg.mp4 + '" type="video/mp4">' +
                    'Your browser does not support the video tag.' +
                    '</video>';
                break;
            default:
                var swfplayer = arg.swfplayer || '/views/default/swf/NonverBlaster.swf';
                tmp = '<object data="' + swfplayer + '" id="video_object" width="' + arg.width + '" height="' + arg.height + '" type="application/x-shockwave-flash"' +
                    //' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"'+
                    '>' +
                    '<param value="transparent" name="wmode">' +
                    '<param value="true" name="allowFullScreen">' +
                    '<param value="mediaURL=' + arg.flv + '&amp;teaserURL=' + arg.teaserUrl + '&amp;allowSmoothing=true&amp;autoPlay=true&amp;buffer=6&amp;showTimecode=ture&amp;loop=false&amp;controlColor=0xFFFFFF&amp;controlBackColor=0x000000&amp;playerBackColor=&amp;defaultVolume=100&amp;scaleIfFullScreen=true&amp;showScalingButton=true&amp;crop=false" name="flashvars">' +
                    '<param value="/views/default/swf/NonverBlaster.swf" name="src">' +
                    '<param name="movie" value="/views/default/swf/NonverBlaster.swf">' +
                    '<param name="quality" value="high" />' +
                    '<embed src="/views/default/swf/NonverBlaster.swf" movie="NonverBlaster" autoPlay="true" transparent="wmode" allowFullScreen="true" flashvars="' + arg.flv + '&amp;teaserURL=' + arg.teaserUrl + '&amp;allowSmoothing=true&amp;autoPlay=true&amp;buffer=6&amp;showTimecode=ture&amp;loop=false&amp;controlColor=0xFFFFFF&amp;controlBackColor=0x000000&amp;playerBackColor=&amp;defaultVolume=100&amp;scaleIfFullScreen=true&amp;showScalingButton=true&amp;crop=false" width="' + arg.width + '" height="' + arg.height + '" quality="high"  type="application/x-shockwave-flash" name="video_object"></embed>' +
                    '</object>';
        }
        return tmp;
    }
};

window.playvideo = function(url, poster) {
    var object = new videoFactory();
    var html = '<div class="cti-video-modal"><div class="d-wrap">';
    html += '<span class="d-close"><img src="/views/default/images/btn_close.png" alt=""></span>';
    html += '<div class="d-video">';
    html += '{video}';
    html += '</div></div></div>';
    var player = object.getPlayer({
        width: '100%',
        height: '100%',
        mp4: url,
        flv: url,
        teaserUrl: poster
    });
    html = html.replace('{video}', player);
    $('body').append(html);
    //如果是手机端 则让视频自动播放
    if (browserTest.isphone()) {
        setTimeout(function() {
            $('.cti-video-modal video')[0].play();
        }, 200);
    }
}
