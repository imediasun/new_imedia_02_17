/*global $, console, log */
(function ($) {
    "no strict";
    if($('#home').length >0){
        var isTablet = $('body').attr('data-tablet');
        $(window).ready(function() {
            ///////// preload images ////////////
            var imgArr = [];
            $('#home-inner img').each(function(){
                var img = $(this).attr('src');
                if(img){
                    imgArr.push(img);
                }
            });
            var bgImg = $('.bg-general li:eq(0)').attr('data-image');
            imgArr.push(bgImg);
            //load images and fade in when complete
            $.loadImages(imgArr.unique(),fadeInPage);
            /////////////////////////////////////

            $('.item1 .flexslider').flexslider({
                controlNav: true,
                animation: 'slide',
                directionNav: false,
                slideshow: true,
                slideshowSpeed: 7500,
                animationSpeed:500,
                easing: "easeInOutQuart",
                before: toutBefore,
                start: toutStart
            });

            $('.item2 .flexslider').flexslider({
                controlNav: true,
                animation: 'slide',
                directionNav: false,
                slideshow: false,
                slideshowSpeed: 9000,
                easing: "easeInOutQuart"
            });
            if ($('.item3').hasClass('pl2016-tout')) {
                $('.item3 .flexslider').flexslider({
                    controlNav: true,
                    animation: 'slide',
                    directionNav: false,
                    slideshow: false,
                    slideshowSpeed: 10500,
                    easing: "easeInOutQuart"
                });
            };
            //
            function toutBefore(slider){
                //log(ob.animatingTo)
                var nextSlide = slider.slides.eq(slider.animatingTo);
                if(nextSlide.hasClass('tallTitle')){
                    $('.item1').find('.tout-inner').addClass('moveUp');
                    $('.item1').find('.flex-control-paging').addClass('cancelZero');
                }else{
                    $('.item1').find('.tout-inner').removeClass('moveUp');
                    $('.item1').find('.flex-control-paging').removeClass('cancelZero');
                }
            }
            function toutStart(slider){
                $('.item1').find('.tout-inner').addClass('moveUp');
                $('.item1').find('.flex-control-paging').addClass('cancelZero');
            }

            //fullscreen slider
            homeSlider = $('#homeslider.flexslider').flexslider({
                controlNav: false,
                animation: 'slide',
                animationSpeed: 800,
                useCSS: false,
                directionNav: true,
                slideshow: false,
                slideshowSpeed: 14000,
                before: onBeforeFlexChange,
                after: onAfterFlexChange,
                easing: "easeInOutQuart"
            });

            if($('.flex-active-slide').find('.video-js').size() > 0 ){
                var myPlayer;
                videojs("vidSlider").ready(function(){
                    log("play")
                    myPlayer = this;
                    myPlayer.play();
                });
            }

            if($('.roadblock').size()>0){
                homeSlider.flexslider("pause");
                $(document).on('click', '.close-roadblock', function(e) {
                    e.preventDefault();
                    homeSlider.flexslider("play")
                });
            }
            //
        });

        function checkToutHeights(){
            setTimeout(function(){
                var hasTallTitle = false;
                $('#touts-wrapper').find('.flexslider').find('li').each(function(index, el) {
                    var titleHeight = $(this).find('h3').innerHeight();
                    if(titleHeight > 20){
                        //log("titleHeight: "+ titleHeight)
                        $(this).addClass("tallTitle");
                        hasTallTitle = true;
                    }else{
                        $(this).removeClass("tallTitle");
                    }
                });
                if(hasTallTitle){
                    $('.item1').find(".flex-control-paging").addClass("zero");
                }
            },100)
        }
        //
        setTimeout(function(){
            checkToutHeights();
        },3000)


        // change section name so we can target it, like for the global download link
        section = "home_1";
        var onAfterFlexChange = function (ob){
            //video
            if($('.flex-active-slide').find('.video-js').size() > 0 ){
                videojs("vidSlider").ready(function(){
                    myPlayer = this;
                    myPlayer.play();
                    log("playyyyy 2")
                });
            }else{
                if($('#vidSlider').size()>0){
                    videojs('vidSlider').pause();
                    log("pauseeeee: "+ myPlayer)
                }
            }

        }
        var onBeforeFlexChange = function (ob){
            // called when flex slider changes
            section = "home_"+ (ob.animatingTo +1);
        };
        //
        // size fullscrenn bg images
        var imgRatio= 1600/900;
        //
        if ($("#home").length>0){
            var homeResize =function(){
                //size and center bg images in flexslider
                var w_width = $("#all").width();
                var w_height = $("#all").height();
                var targetHeight = w_width / imgRatio;
                var targetWidth = w_width;
                if(targetHeight < w_height) {
                    targetHeight = w_height;
                    targetWidth = w_height * imgRatio;
                }
                var x = (w_width*0.5) - (targetWidth*0.5);
                var y = (w_height*0.5) - (targetHeight*0.5);
                //scale and centers main containers
                if(isTablet == 'false'){
                    $(".flex-img").css({left:x, top:y,width:targetWidth, height:targetHeight});
                }
                checkToutHeights();
            };
            $(window).resize( function(){
                homeResize();
            });
        }
        //
        $(window).load(function() {
            //call after images are loaded
            homeResize();
            setTimeout(function(){
                homeResize();
            }, 2000);
        });

        var toutOnDuration = 300;
        var toutOnEasing = "easeInOutQuart";
        var onTout=function(tout){ //FIX: class to ID below?

            if (tout.hasClass("item3") && !tout.hasClass("pl2016-tout")){
                tout.find(".tout-inner").stop().animate({top:-306},toutOnDuration, toutOnEasing);
                tout.find("#social-feed").stop().animate({height:400},toutOnDuration, toutOnEasing);
                tout.find(".scroll-pane").stop().animate({height:395},toutOnDuration, toutOnEasing,function(){
                    updateScroll()
                });
            }
            else {
                //log("XXX: "+ tout.index());
                tout.find(".tout-inner").stop().animate({top:-62},toutOnDuration, toutOnEasing);
                tout.find(".content-block").stop().animate({height:150},toutOnDuration, toutOnEasing);
                var w = tout.find('.flex-active-slide').find('.small-inner').width()+18;
                tout.find(".small-link").stop().delay(toutOnDuration).animate({width:w},toutOnDuration, "easeOutQuart");
                //tout.find(".expand-icon").attr("src", "img/toutminus.png");
                tout.find(".expand-icon").hide();
            }

        };
        var toutOffDuration=300;
        var toutOffEasing = "easeInOutQuart";
        var offTout =function(tout){

            if (tout.hasClass("item3") && !tout.hasClass("pl2016-tout")){
                tout.find(".tout-inner").stop().animate({top:0},toutOnDuration, toutOnEasing);
                tout.find("#social-feed").stop().animate({height:98},toutOnDuration, toutOnEasing);
                tout.find(".scroll-pane").stop().animate({height:87},toutOnDuration, toutOnEasing,function(){
                    updateScroll()
                });
            }
            else {
                //tout.find(".expand-icon").attr("src", "img/toutplus.png");///FIX: class to ID
                tout.find(".expand-icon").show();
                tout.find(".tout-inner").stop().animate({top:0},toutOffDuration, toutOffEasing);
                tout.find(".content-block").stop().animate({height:88},toutOffDuration, toutOffEasing);
                tout.find(".small-link").stop().animate({width:0},toutOffDuration, "easeInQuart");
            }
        };

        $("#touts >li").each(function(){
            $(this).hover(//FIX: E.HANDLER
                function(){onTout($(this));},
                function(){offTout($(this));}
            );
            $(this).click(//FIX: E.HANDLER
                function(){onTout($(this));}
            );
        });

        function updateScroll(){
            var sp = $('#social-feed .scroll-pane');
            sp.jScrollPane({
                verticalDragMaxHeight: 52,
                verticalDragMinHeight: 52,
                autoReinitialise: true,
                autoReinitialiseDelay:150
            });
        }
        updateScroll();


        ////// If we want the explore link to open a specific vehicle nav.
        $('.arrow-link').click(function(e) {
            var attr = $(this).attr('data-nav');
            if (typeof attr !== typeof undefined && attr !== false) {
                e.preventDefault();
                var arr = attr.split('/');
                $('#'+arr[0].toUpperCase()).click();
                if(arr.length>1){
                    window.skipNav = true;
                    setTimeout(function(){
                        $('#bodyType_selector li[data-type="'+arr[1]+'"]').click();
                        window.skipNav = false;
                    },500)

                }
            }


        });




        //youtube vid launch for home tout
        $('.vid-launch').click(function(ev){
            var _thisVidId = $(ev.currentTarget).attr('data-yt');
            var ytFrame = '<div id="overviewVidFrame"><img id="overviewVid_Close" src="img/gallery_closer.png"><div id="overviewVidPlayer" class="video-holder"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+_thisVidId+'?rel=0&amp;showinfo=0&amp;autoplay=1&wmode=transparent" frameborder="0" allowfullscreen></iframe></div></div>';

            $('#fullscreen-gallery').append(ytFrame).fadeIn();
            // $('#fullscreen-gallery').fadeIn();

            $('#overviewVid_Close').click(function(){
                $('#fullscreen-gallery').fadeOut();
                setTimeout(function(){
                    $('#overviewVidFrame').remove();
                }, 500);
            });
        });





    }

})(jQuery);