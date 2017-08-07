$(function() {
    window.CTI = ctirun($, Swiper);
});

function ctirun($, Swiper) {
    //第一屏
    var welcome = (function() {
        var _this = this,
            $btnNext = $('.cti-btn-next'),
            $btnPrev = $('.cti-btn-prev'),
            $pageing = $('.cti-welcome-pagination'),
            $slider = $('#cti_welcome_slider'),
            $wrap = $('.cti-welcome'),
            $icons = $('.cti-welcome-icons');

        $slider.slick({
            autoplay: false,
            autoplaySpeed: 4000,
            fade: true,
            prevArrow: $btnPrev,
            nextArrow: $btnNext
        });


        $pageing.on('click', 'span', function() {
            $slider.slick('slickGoTo', $(this).index());
        });

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            //console.log(nextSlide);
            $pageing.find('span').eq(nextSlide).addClass('d-active').siblings().removeClass('d-active');
        });

        //创建分页器
        var html = '';
        $slider.find('.image').each(function(i, ele) {
            if (i == 0) {
                html += '<span class="d-active"></span>';
            } else {
                html += '<span></span>';
            }
        });

        $pageing.html(html);
        //监听鼠标滚轮
        $wrap.on('mousewheel', function(evt) {
            //console.log(evt.deltaX, evt.deltaY, evt.deltaFactor);
            if (evt.deltaY == -1) {
                //向下
                //禁止第二屏滚动
                brand.disableMousewhell();
                $icons.addClass('d-hide');
                var top = $('.cti-brand').offset().top - $('.cti-header').height();
                $('html,body').stop().animate({
                    scrollTop: top
                }, 'slow', function() {
                    _this.slidePrev();
                    brand.enableMousewhell();
                });
            }
        });
        $wrap.bind('mousewheel', function(e) {
            scrollFunc(e);
        });
        //火狐下的鼠标滚动事件
        $wrap.bind('DOMMouseScroll', function(e) {
            scrollFunc(e);
        });

        //阻止页面滚动
        _this.scrollFunc = function(e) {
            e = e || window.event;
            if (e && e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.returnvalue = false;
                return false;
            }
        }

        function resize() {
            //ipad 不全屏
            if ($(window).width() < 1024 && $(window).width() >= 768) return;
            $wrap.height($(window).height());
            $('.cti-big-video').height($wrap.height())
        }
        $(window).on('winresize', function() {
            resize();
        });
        $(window).trigger('winresize');
        //默认首页从第一屏开始
        var timer = setInterval(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 0);
            if ($(window).scrollTop() == 0) {
                clearInterval(timer);
                //尝试跳转hash
                window.navbar.hashmove();
            }
        }, 0);
        return _this;
    })();

    //品牌
    var brand = (function() {
        var _this = this,
            //第二屏容器
            $wrap = $('.cti-brand'),
            //当前活动的索引
            activeIndex = -1,
            //鼠标上下滚动的标识
            deltaY = 0,
            //左边的文案
            $textLeft = $('.cti-brand-text .d-left a'),
            //右边的文案
            $textRight = $('.cti-brand-text .d-right a'),
            //禁止鼠标滚动
            disableScroll = false,
            //是否过度结束
            transitionEnd = true,
            ipaddirection = 0;

        //初始化swiper
        function initSwiper() {
            _this.leftswiper = new Swiper('#cti_brand_leftswiper', {
                speed: 900,
                mode: 'vertical',
                calculateHeight: true,
                noSwiping: true
            });

            _this.rightswiper = new Swiper('#cti_brand_rightswiper', {
                speed: 900,
                mode: 'vertical',
                calculateHeight: true,
                noSwiping: true
            });
        }

        //左边鼠标悬浮
        $textLeft.mouseenter(function() {
            if (browserTest.isphone()) return;
            $('#cti_brand_rightswiper').removeClass('d-hover');
            $('#cti_brand_leftswiper').addClass('d-hover');
        });
        //右边鼠标悬浮
        $textRight.mouseenter(function() {
            if (browserTest.isphone()) return;
            $('#cti_brand_rightswiper').addClass('d-hover');
            $('#cti_brand_leftswiper').removeClass('d-hover');
        });

        //判断设备如果不是移动设备则初始化swiper
        if (!browserTest.isphone() || $(window).width() > 768) {
            initSwiper();
        }

        //窗口初始化的时候
        function resize() {
            if (!browserTest.isphone() || $(window).width() > 768) {
                if (!browserTest.isphone())
                    $wrap.height($(window).height() - $('.cti-header').height());
                try {
                    if (!_this.rightswiper) {
                        initSwiper();
                    }
                    setTimeout(function() {
                        _this.rightswiper.reInit();
                        _this.leftswiper.reInit();
                        _this.enableMousewhell();
                        $textLeft.removeClass('fadeInUp fadeInDown fadeOutUp fadeOutDown');
                        $textRight.removeClass('fadeInUp fadeInDown fadeOutUp fadeOutDown');
                        $textLeft.eq(1).removeClass('animated');
                        $textRight.eq(1).removeClass('animated');
                    }, 500);
                } catch (e) {
                    //console.log(e.meesage)
                }
            } else {
                $wrap.removeAttr('style');
                try {
                    _this.rightswiper.destroy(true);
                    _this.rightswiper = null;
                    _this.leftswiper.destroy(true);
                    _this.leftswiper = null;
                    $('#cti_brand_leftswiper').removeAttr('style');
                    $('#cti_brand_rightswiper').removeAttr('style');
                    $textLeft.removeClass('fadeOutUp fadeOutDown');
                    $textRight.removeClass('fadeOutUp fadeOutDown');
                } catch (e) {
                    //console.log(e.meesage)
                }
            }
        }
        $(window).on('winresize', function() {
            resize();
        });
        $(window).trigger('winresize');

        $wrap.bind('mousewheel', function(e) {
            scrollFunc(e);
        });
        //火狐下的鼠标滚动事件
        $wrap.bind('DOMMouseScroll', function(e) {
            scrollFunc(e);
        });
        $textLeft.eq(0).addClass('animated');
        $textRight.eq(0).addClass('animated');
        //监听鼠标滚轮
        $wrap.on('mousewheel', function(evt) {
            //console.log(evt.deltaX, evt.deltaY, evt.deltaFactor);
            //如果关闭滚轮则不执行后面的代码
            if (disableScroll) return;

            if (evt.deltaY == -1) {
                //往下
                changedown();
            } else {
                //往上
                changeup();
            }
            transitionEnd = false;
            setTimeout(function() {
                transitionEnd = true;
            }, 1100);
        });

        function changeup() {
            if (!transitionEnd) return;
            if (_this.leftswiper.activeIndex == 0 && activeIndex == _this.leftswiper.activeIndex) {
                $('html,body').animate({
                    scrollTop: 0
                }, 'slow', function() {
                    activeIndex = -1;
                    $('.cti-welcome-icons').removeClass('d-hide');
                });
                return;
            }
            _this.leftswiper.swipePrev();
            $textLeft.eq(1).removeClass('fadeInUp').addClass('fadeOutDown animated');
            $textRight.eq(1).removeClass('fadeInUp').addClass('fadeOutDown animated');
            setTimeout(function() {
                _this.rightswiper.swipePrev();
                $textLeft.eq(0).removeClass('fadeOutUp').addClass('fadeInDown animated');
                $textRight.eq(0).removeClass('fadeOutUp').addClass('fadeInDown animated');
            }, 150);
            activeIndex = _this.leftswiper.activeIndex;
        }

        function changedown() {
            if (!transitionEnd) return;
            if (_this.leftswiper.activeIndex == 1 && activeIndex == _this.leftswiper.activeIndex) {
                var top = $('.cti-news').offset().top - $('.cti-header').height();
                $('html,body').stop().animate({
                    scrollTop: top
                }, 'slow', function() {
                    activeIndex = -1;
                });
                return;
            }
            _this.leftswiper.swipeNext();
            $textLeft.eq(0).removeClass('fadeInDown').addClass('fadeOutUp animated');
            $textRight.eq(0).removeClass('fadeInDown').addClass('fadeOutUp animated');
            setTimeout(function() {
                $textLeft.eq(1).removeClass('fadeOutDown').addClass('fadeInUp animated');
                $textRight.eq(1).removeClass('fadeOutDown').addClass('fadeInUp animated');
                _this.rightswiper.swipeNext();
            }, 150);
            activeIndex = _this.leftswiper.activeIndex;
        }

        //向下滚动
        _this.slideNext = function() {
            _this.leftswiper.swipeTo(1, 0);
            _this.rightswiper.swipeTo(1, 0);
            $textLeft.eq(0).removeAttr('class');
            $textRight.eq(0).removeAttr('class');
            $textLeft.eq(1).attr('class', 'animated');
            $textRight.eq(1).attr('class', 'animated');
            activeIndex = _this.leftswiper.activeIndex;
        }

        //向上滚动
        _this.slidePrev = function() {
            _this.leftswiper.swipeTo(0, 0);
            _this.rightswiper.swipeTo(0, 0);
            $textLeft.eq(0).attr('class', 'animated');
            $textRight.eq(0).attr('class', 'animated');
            $textLeft.eq(1).removeAttr('class');
            $textRight.eq(1).removeAttr('class');
            activeIndex = _this.leftswiper.activeIndex;
        }

        //阻止页面滚动
        _this.scrollFunc = function(e) {
            if (browserTest.isphone()) return;
            e = e || window.event;
            if (e && e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.returnvalue = false;
                return false;
            }
        };
        //监听滚动
        $(window).scroll(function() {
            if (browserTest.isphone()) return;
            if (deltaY < $(window).scrollTop()) {
                deltaY = $(window).scrollTop();
                return;
            }
            var top = -$wrap[0].getBoundingClientRect().top; //元素顶端到可见区域顶端的距离
            var se = document.documentElement.clientHeight; //浏览器可见区域高度。
            //(top, se);
            if (top <= se - 100 && top >= se - 300) {
                if ($('html,body').is(":animated")) return;
                //console.log($('html,body').is(":animated"));
                _this.disableMousewhell();
                var top = $('.cti-brand').offset().top - $('.cti-header').height();
                $('html,body').stop().animate({
                    scrollTop: top
                }, 'slow', function() {
                    //alert('finish');
                    _this.slideNext();
                    _this.enableMousewhell();
                });
            }
            deltaY = $(window).scrollTop();
        });
        //禁止滚动
        _this.disableMousewhell = function() {
            disableScroll = true;
        };
        //开启滚动
        _this.enableMousewhell = function() {
            setTimeout(function() {
                disableScroll = false;
            }, 600);
        };

        /*低版本浏览器忽略*/
        // setInterval(function() {
        //     if ($(window).width() >= 768 && $(window).width() <= 1024) {
        //         if (ipaddirection == 0) {
        //             ipaddirection = 1;
        //             changedown();
        //         } else {
        //             ipaddirection = 0;
        //             changeup();
        //         }
        //     }
        // }, 4000)

        /*低版本浏览器忽略*/
        var brandPageX = 0;
        //阻止冒泡
        $wrap.on('touchmove', function(evt) {
            if ($(window).width() > 768 && $(window).width() <= 1024) {
                evt.stopPropagation();
                return false;
            }
        });
        $wrap.on('touchstart', function(evt) {
            var _touch = evt.originalEvent.targetTouches[0];
            brandPageX = _touch.pageY;
        });
        $wrap.on('touchend', function(evt) {
            var _touch = evt.originalEvent.changedTouches[0];
            if ($(window).width() > 768 && $(window).width() <= 1024) {
                if (brandPageX < _touch.pageY) {
                    //console.log('up')
                    changeup();
                } else {
                    //console.log('down')
                    changedown();
                }
            }
        });

        return _this;
    })();

    //新闻
    var news = (function() {
        var _this = this;
        var $wrap = $('.cti-news'),
            $left = $wrap.find('.pull-left'),
            $imgs = $wrap.find('img');
    })();

    var events = (function() {
        var _this = this,
            $slider = $('.cti-event-slide'),
            $tab = $('.cti-event-tab .col-xs-3'),
            activeIndex = -1,
            canchange = true,
            $eventArrow = $('.cti-event-arrow a'),
            curgroup = [];
        $tab.mouseenter(function() {
            if (browserTest.isphone()) return;
            $slider.eq($(this).index()).addClass('d-active').siblings().removeClass('d-active');
        });

        $eventArrow.on('touchstart', function() {
            switch ($(this).index()) {
                case 0:
                    changeslide('right');
                    break;
                case 1:
                    changeslide('left');
                    break;
                default:
            }
        });

        setInterval(function() {
            if (!canchange) {
                setTimeout(function() {
                    canchange = true;
                }, 2000);
                return;
            }
            if (!browserTest.isphone() || $(window).width() >= 768) {
                changeslidepc();
            } else {
                changeslide('left');
            }
        }, 5000);

        function changeslide(flag) {
            if (!browserTest.isphone()) return;
            if (flag == 'left') {
                // 向右滑动执行
                activeIndex++;
                if (activeIndex > $tab.length - 1) {
                    activeIndex = 0;
                }
            } else {
                activeIndex--;
                if (activeIndex < 0) {
                    activeIndex = $tab.length;
                }
            }
            $slider.eq(activeIndex).addClass('d-active').siblings().removeClass('d-active');
            $tab.eq(activeIndex).addClass('d-active').siblings('.col-xs-3').removeClass('d-active');
        }

        function changeslidepc() {
            if (browserTest.isphone() && $(window).width() < 768) return;
            curgroup = [];
            for (var i = 0; i < 4; i++) {
                activeIndex++;
                if (activeIndex > $tab.length - 1) {
                    activeIndex = 0;
                }
                curgroup.push(activeIndex);
            }
            $tab.removeClass('d-active');
            for (var f in curgroup) {
                $tab.eq(curgroup[f]).addClass('d-active');
            }
            $slider.eq(curgroup[0]).addClass('d-active').siblings().removeClass('d-active');
        }

        if (browserTest.isphone() && $(window).width() < 768) {
            changeslide('left');
        } else {
            changeslidepc();
        }

        /*低版本浏览器忽略*/
        try {
            var hammer = new Hammer($('.cti-event-tab')[0]);
            hammer.on('swipeleft', function() {
                canchange = false;
                if ($(window).width() > 768) return;
                changeslide('left');
            });
            hammer.on('swiperight', function() {
                canchange = false;
                // 向左滑动执行
                if ($(window).width() > 768) return;
                changeslide('right');
            });
        } catch (e) {

        }


        //pc/mobile链接处理
        (function() {
            $('[pc-href]').click(function() {
                if (browserTest.isphone() && $(window).width() < 768) {
                    window.location.href = $(this).attr('mb-href');
                } else {
                    window.open($(this).attr('pc-href'));
                }
            });
            var $btndown = $('.cti-btn-down');
            $(window).scroll(function() {
                if ($(window).scrollTop() >= $('body').height() - $(window).height()) {
                    $btndown.addClass('d-hide');
                } else {
                    $btndown.removeClass('d-hide');
                }
            })
        })();

        //活动浮层
        (function() {
            var $iframewrap = $('.cti-activity-frame'),
                $btnclose = $('.cti-activity-frame .btn-close');

            window.toggleActivityFrame = function() {
                $iframewrap.toggleClass('d-show');
            }

            $btnclose.click(function() {
                $iframewrap.removeClass('d-show');
            });
        })();
    })();
    return this;
};
