$(function(){function i(){try{window.clearInterval(t)}catch(i){}t=setInterval(function(){l++,l==$tab.length&&(l=0),$(".cti-art-cars li").eq(l).trigger("mouseover")},4e3)}function e(){window.clearInterval(t)}function o(){browserTest.isphone()?$(".cti-design-evolvemodal .d-content").css({top:$(".cti-header").height()+10,opacity:1}):$(".cti-design-evolvemodal .d-content").css({top:($(window).height()-$(".cti-design-evolvemodal .d-content").height()+$(".cti-header").height())/2,opacity:1}),$(".cti-design-evolvemodal .d-loading").removeClass("d-show")}var t,a=$("#cti_page_slider"),s=$("#dialog_slider"),l=0,c=!1;$tab=$(".cti-art-cars li"),a.slick({fade:!0}),setTimeout(function(){$(".cti-soul-img").addClass("animated fadeOut").one(aniCallBack,function(i){$(this).removeClass("animated fadeOut").hide(),$(".cti-soul-des").addClass("animated fadeIn").show()})},4e3),s.slick({}),$(".cti-cars-dialog .d-close").click(function(e){$(".cti-cars-dialog").removeClass("d-show"),i(),e.stopPropagation()}),a.click(function(){if(c=!1,setTimeout(function(){c=!0},1e3),$(".cti-cars-dialog").attr("class").indexOf("d-show")>=0)return void $(".cti-cars-dialog .d-close").trigger("click");var i=$tab.siblings(".d-active").attr("data-flag");i||(i=artcars[0].model),$("#dialog_slider .image").each(function(i,e){$("#dialog_slider").slick("slickRemove",i)}),$("#dialog_slider").html("");try{$("#dialog_slider").slick("unslick")}catch(o){}var t="";for(var a in artcars)if(artcars[a].model==i)for(var s in artcars[a].pics)t+='<div class="image">',t+='<img src="'+artcars[a].pics[s]+'" alt="" /></div>';$("#dialog_slider").html(t),$("#dialog_slider").slick({}),$(".cti-cars-dialog").addClass("d-show"),e()}),$("body").on("click",function(){c&&($(".cti-cars-dialog").removeClass("d-show"),i())}),s.click(function(i){i.stopPropagation()}),$tab.mouseover(function(){a.slick("slickGoTo",$(this).index()),$(this).addClass("d-active").siblings("li").removeClass("d-active")}),$tab.mouseenter(function(){e()}),$tab.mouseleave(function(){i()}),i(),window.swiper=new Swiper("#cti_art_slider",{loop:!0,calculateHeight:!0,speed:800}),window.loadevolve=function(i){try{$(".cti-design-evolvemodal .d-loading").addClass("d-show"),$(".cti-design-evolvemodal .d-frwrap").load(i,function(){function i(i,e){var o=setInterval(function(){i.complete&&(e(i),clearInterval(o))},50)}$(".cti-design-evolvemodal").addClass("d-show"),$(".cti-design-evolvemodal").one("click",function(){$(".cti-design-evolvemodal").addClass("d-hide"),$(".cti-design-evolvemodal").removeClass("d-show d-hide"),$(".cti-design-evolvemodal .d-content").removeAttr("style")}),$(".cti-design-evolvemodal .slick .image").length<=0?o():i($(".cti-design-evolvemodal .slick .image").eq(0).find("img")[0],function(){setTimeout(function(){o()},500)})})}catch(e){alert("网络错误，请稍后再试！")}},$(window).resize(function(){o()}),$(".cti-design-evolvemodal .d-close").click(function(){$(".cti-design-evolvemodal").addClass("d-hide"),$(".cti-design-evolvemodal").removeClass("d-show d-hide"),$(".cti-design-evolvemodal .d-content").removeAttr("style")}),$('[data-toggle="stopPropagation"]').click(function(i){i.stopPropagation()}),$("#cti_page_slider").on("click",".slick-next,.slick-prev",function(i){e(),i.stopPropagation()})});