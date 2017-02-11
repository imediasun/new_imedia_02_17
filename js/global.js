//######################## Global Vars Shared by Whole App ###########################//

//$frameHeight = $(window).height();
//$frameWidth = $(window).width();
var app = app || {};
//var app = window.applicationCache;
$body = $('body');
$allInner = $('#all-inner');
$window = $(window);
$lang = $body.attr('id');




//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// determine if lang is set by url
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

if ($lang=='notSet') {
    //no language was preset in url, so lang selector should show up in intro anim
    app.langSet=false;
}else{
    //url included lang pref onload 
    app.langSet = true;
}




//OS and Device Vars for special cases
var deviceAgent = navigator.userAgent.toLowerCase();
//$is_iPad = deviceAgent.match(/(iphone|ipod|ipad)/);
$isHandHeldDevice =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ;
$safari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1
$ie8 = navigator.userAgent.search("MSIE") && navigator.userAgent.version == 8.0
$ie8_andUnder = navigator.userAgent.search("MSIE") && navigator.userAgent.version < 9.0;
$tabCheck  =  $('body').attr('data-tablet');
if ($tabCheck=='true') {
    $isTablet=true;
    $('html').addClass('isTablet')//helpful for styling
}else{
    $isTablet=false;
}

//better ie detection
function isIE(version, comparison) {
    var cc      = 'IE',
        b       = document.createElement('B'),
        docElem = document.documentElement,
        isIE;

    if(version){
        cc += ' ' + version;
        if(comparison){ cc = comparison + ' ' + cc; }
    }

    b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
    docElem.appendChild(b);
    isIE = !!document.getElementById('iecctest');
    docElem.removeChild(b);
    return isIE;
}

//isIE(); 

// ie8 needs different vert align css
if(isIE(8,'lte')){
    $('.vAlignMe').each(function(){
        $(this).addClass('vAlign-old').removeClass('vAlignMe');
    })
}

//set scaling fonts, any font set with em or % will scale with page
fontScalePercent = 0.1




//extending for access to custom View functions
Backbone.View.prototype.eventAggregator = _.extend({}, Backbone.Events);


//###################################################################################//
//init
//pageBlockOn();



//------------------- Other global functions not related to MVC necessarily -------------------//

jQuery.fn.reverse = [].reverse;

//generic rollover effect using class
$('.rollover').hover(function() {
    $(this).find('.over').stop().animate({'opacity': 1}, 200);
    $(this).find('.off').stop().animate({'opacity': 0}, 200);
}, function() {
    $(this).find('.over').stop().animate({'opacity': 0}, 200);
    $(this).find('.off').stop().animate({'opacity': 1}, 200);
});


//re-initialize scroll-pane text areas, good to call on resize
function scroll_reInit(){
    if ($allInner.find('.scroll-pane').length>0) {
        /*if ($mobile) {
         $('.scroll-pane').jScrollPane({
         showArrows: false,
         maintainPosition: true,
         showArrows:          false,
         animateScroll:       false,
         hijackInternalLinks: true						
         });	
         }else{	*/
        $('.scroll-pane').jScrollPane({
            showArrows: false,
            autoReinitialise: false,
            maintainPosition: true,
            showArrows:          false,
            verticalDragMaxHeight: 37,
            verticalDragMinHeight: 37,
            verticalGutter : 10,
            //mouseWheelSpeed:     20,
            //animateScroll:       true,
            // animateDuration:     500,
            // hijackInternalLinks: true,
            verticalDragMinHeight: 40, //forcing dragger to keep dimension and not grow/shrink with content
            verticalDragMaxHeight: 40
        });
        //}
    };
    //
    $('.drop-pane').jScrollPane({
        showArrows: false,
        autoReinitialise: false,
        maintainPosition: true,
        showArrows:          false,
        verticalDragMaxHeight: 37,
        verticalDragMinHeight: 37,
        verticalGutter : 10
    });
}


//disable page scroll effect on iPad

/*var xStart, yStart = 0;

 document.addEventListener('touchstart',function(e) {
 xStart = e.touches[0].screenX;
 yStart = e.touches[0].screenY;
 });

 document.addEventListener('touchmove',function(e) {
 var xMovement = Math.abs(e.touches[0].screenX - xStart);
 var yMovement = Math.abs(e.touches[0].screenY - yStart);
 if((yMovement * 3) > xMovement) {
 e.preventDefault();
 }
 }); */


/*
 //load FB script to page for sharing
 window.fbAsyncInit = function() {
 FB.init({
 appId      : '1413382448934283',
 status     : true,
 xfbml      : true
 });
 };

 (function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/all.js";
 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); */


//extend fb share function 
function fbInvoke(name, description, link, picture){
    FB.ui(
        {
            method: 'feed',
            name: name,
            description: description,
            link: link,
            picture: picture
        },
        function(response) {
            if (response && response.post_id) {
                //console.log('Post was published.');
            } else {
                //console.log('Post was not published.');
            }
        }
    );
}




//uses page-blocker div in index.php, lite-weight block page from user interaction during transitions to avoid click-happiness
function pageBlockOn(){
    $('#pageBlockerOuter').css({'display': 'block'});
}
function pageBlockOff(){
    $('#pageBlockerOuter').css({'display': 'none'});
}


$.fn.vertAlign = function(){
    if ($ie8) {
        $(this).addClass('vertAlign_ie8');
    }else{
        $(this).addClass('vertAlign');
    }
}




// attempting to stop page scrollpane from moving while user scrolls inside other sections
app.nowScroll = false;

$.fn.soloScroll = function(){
    //var _mainPane = $('#vehicle_overview-section').find('.jspPane:eq(0)');

    $(this).bind( 'mousewheel DOMMouseScroll', function ( e ) {

        var _this = $(this);
        var textContainerHeight = _this.find('.jspContainer').outerHeight();
        var textInnerHeight = _this.find('.jspPane').outerHeight();

        //first check if this element has overflow, only perform scroll block if has overflow
        if( textContainerHeight<textInnerHeight ){

            //update this only the first time top or bottom of inner scroll area is reached
            if (!app.nowScroll) {

                app.nowScroll = true;
                var _curPageScroll = $('#vehicle_overview-section').find('.jspPane:eq(0)').position();
                app._curPageScroll_top = _curPageScroll.top;

            };

            //apply the pages current offset as !important style to lock it
            $('#vehicle_overview-section').find('.jspPane:eq(0)').attr('style', function(i,s) { return s + 'top: '+app._curPageScroll_top+'px !important;' });

        }

    }).mouseleave(function(){ //once user leaves designated scroll areas, allow page to resume scrolling by removing !important rule
        app.nowScroll = false;
        var _styleFix = $('#vehicle_overview-section').find('.jspPane:eq(0)').attr('style').replace('!important', '');
        $('#vehicle_overview-section').find('.jspPane:eq(0)').attr('style', _styleFix);
    });
}




function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}



//get full url of img
function escapeHTML(s) {
    return s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
}
function qualifyURL(url) {
    var el= document.createElement('div');
    el.innerHTML= '<a href="'+escapeHTML(url)+'">x</a>';
    return el.firstChild.href;
}


//Like fadeIn/out but hides from DOM with z-index instead of display
//good when you need elements to keep shape like text containers w/ scroll-panes
$.fn.zFade_out = function(timeOut) {
    if(!timeOut){timeOut= 250};
    var thisEl = $(this)
    thisEl.animate({'opacity': '0.0'}, timeOut, function(){
        thisEl.addClass('zOut');
    });
}
$.fn.zFade_in = function(timeOut) {
    if(!timeOut){timeOut= 250};
    var thisEl = $(this)
    thisEl.removeClass('zOut').animate({'opacity': '1.0'}, timeOut, function(){
        //thisEl.addClass('zOut');	
    });
}


//bring any pre-loaded imgs back into current cache for faster animation
function tempLoad(id){
    $('#animFrames_preLoad').find('.'+id+'').each(function(i,el){
        $(this).appendTo($('#reLoad_temp'));
    });
}
function tempUnload(){
    $('#reLoad_temp').find('img').each(function(i,el){
        $(this).appendTo($('#animFrames_preLoad'));
    });
}


/*
 if ($isHandHeldDevice) { 

 $('.iSwap').each(function() {
 var tablet_imgSwap = $(this).attr('src').replace('images', 'images/tablet');
 $(this).attr('src', tablet_imgSwap );	
 });

 }*/




/////////////////////////////////////////////////////////////////////////////////////////////////
// Custom functions for pulling off animated img sequences	
/////////////////////////////////////////////////////////////////////////////////////////////////

function swapImg_animJPG($el, frameRate, frameCount, direction, pageBlocker, onComplete){

    if (!pageBlocker){ pageBlockOn(); }
    else if (pageBlocker=="yesBlock"){ pageBlockOn(); }
    else if (pageBlocker=="noBlock"){  }

    var animFrame = $el;
    var animFrameFolder = animFrame.attr("id");

    //default params
    var countFrame = 0
    var stepNum = 1
    var paddingTo = 5
    var stringStart = animFrame.attr('src');
    var srcStart = stringStart.substring(0, stringStart.lastIndexOf("/") + 1);
    var srcEnd = '.jpg'

    if (!direction){ swapImgs_forward(); }
    else if (direction=="forwards"){ swapImgs_forward(); }
    else if (direction=="backwards"){ swapImgs_backwards(); }



    function swapImgs_forward() {
        var countFrame = 0

        function padUp(countFrame, paddingTo) {
            var s = "00000" + countFrame;
            return s.substr(s.length-paddingTo);
        }

        var swapF_interval = setInterval(function() {

            var newNum = padUp(countFrame, paddingTo);

            if(countFrame<frameCount) {
                animFrame.attr("src", srcStart +newNum+ srcEnd);
            }
            else if(countFrame==frameCount) {
                //run on complete. If function is in $(document).ready it needs to be attached to window like: 
                //window.closePoiPanel = function closePoiPanel(){ bla bla bla}
                if(onComplete){
                    eval(onComplete);}
                pageBlockOff();
                clearInterval(swapF_interval);
                return false;
            }

            countFrame++;
            stepNum++;

        }, (frameRate*stepNum));

    }



    function swapImgs_backwards() {
        frameCount--;

        function padDown(frameCount, paddingTo) {
            var s = "00000" + frameCount;
            return s.substr(s.length-paddingTo);
        }

        var swapB_interval = setInterval(function() {

            var newNum = padDown(frameCount, paddingTo);

            if(frameCount>-1) {
                animFrame.attr("src", srcStart +newNum+ srcEnd);
            }
            else if(frameCount==-1) {
                //run on complete. If function is in $(document).ready it needs to be attached to window like: 
                //window.closePoiPanel = function closePoiPanel(){ bla bla bla}
                if(onComplete){
                    eval(onComplete);}
                pageBlockOff();
                clearInterval(swapB_interval);
                return false;
            }

            frameCount--;
            stepNum--;

        }, frameRate*countFrame);

    }




}




function swapImg_animPNG($el, frameRate, frameCount, direction, pageBlocker, onComplete){

    if (!pageBlocker){ pageBlockOn(); }
    else if (pageBlocker=="yesBlock"){ pageBlockOn(); }
    else if (pageBlocker=="noBlock"){  }

    var animFrame = $el;
    var animFrameFolder = animFrame.attr("id");

    //default params
    var countFrame = 0
    var stepNum = 1
    var paddingTo = 5
    var stringStart = animFrame.attr('src');
    var srcStart = stringStart.substring(0, stringStart.lastIndexOf("/") + 1);
    var srcEnd = '.png'
    var taper = .89

    if (!direction){ swapImgs_forward(); }
    else if (direction=="forwards"){ swapImgs_forward(); }
    else if (direction=="backwards"){ swapImgs_backwards(); }



    function swapImgs_forward() {
        var countFrame = 0

        function padUp(countFrame, paddingTo) {
            var s = "00000" + countFrame;
            return s.substr(s.length-paddingTo);
        }

        var swapF_interval = setInterval(function() {

            var newNum = padUp(countFrame, paddingTo);

            if(countFrame<frameCount) {
                animFrame.attr("src", srcStart +newNum+ srcEnd);
            }
            else if(countFrame==frameCount) {
                //run on complete. If function is in $(document).ready it needs to be attached to window like: 
                //window.closePoiPanel = function closePoiPanel(){ bla bla bla}
                if(onComplete){eval(onComplete);}
                pageBlockOff();
                clearInterval(swapF_interval);
                return false;
            }

            countFrame++;
            stepNum++;

        }, (frameRate*stepNum));

    }



    function swapImgs_backwards() {
        frameCount--;

        function padDown(frameCount, paddingTo) {
            var s = "00000" + frameCount;
            return s.substr(s.length-paddingTo);
        }

        var swapB_interval = setInterval(function() {

            var newNum = padDown(frameCount, paddingTo);
            if(frameCount>-1) {
                animFrame.attr("src", srcStart +newNum+ srcEnd);
            }
            else if(frameCount==-1) {
                //run on complete. If function is in $(document).ready it needs to be attached to window like: 
                //window.closePoiPanel = function closePoiPanel(){ bla bla bla}
                if(onComplete){eval(onComplete);}
                pageBlockOff();
                clearInterval(swapB_interval);
            }

            frameCount--;
            stepNum--;

        }, 25);

    }




}



//Animating sprit-sheet style
//Works with background images set in css- works best cross-browser with fixed size, non-scaling images

function runForward($el, $bgWidth, duration, frameRate, dir){

    var frameWidth = $el.width();
    var frameHeight = $el.height();
    var frameNum = $bgWidth/frameWidth;
    var rate = duration/frameRate;
    var countFrame = 0

    var backgroundPos = $el.css('backgroundPosition').split(" ");
    var xPos = backgroundPos[0],
        yPos = backgroundPos[1];


    function runStrip() {

        setInterval(function() {

            if (dir == 'h'){
                if(countFrame<frameNum) {
                    $el.css({backgroundPosition: -frameWidth*countFrame + "px "+yPos});
                }
                else if(countFrame==frameNum) {
                    //run on complete
                }
            }


            else if (dir == 'v'){
                if(countFrame<frameNum) {
                    $el.css({backgroundPosition: xPos+" "+ (-frameWidth*countFrame) + "px"});
                }
                else if(countFrame==frameNum) {
                    //run on complete
                }
            }


            countFrame++;

        }, rate);

    }

    runStrip();
}



function runBackerds($el, $bgWidth, duration, frameRate, dir){

    var frameWidth = $el.width();
    var frameHeight = $el.height();
    var frameNum = $bgWidth/frameWidth;
    var rate = duration/frameRate;
    var countFrame = frameNum-1;


    var backgroundPos = $el.css('backgroundPosition').split(" ");
    var xPos = backgroundPos[0],
        yPos = backgroundPos[1];



    function runStrip() {
        setInterval(function(){

            if (dir == 'h'){
                if(countFrame>-1) {
                    $el.css({backgroundPosition: -frameWidth*countFrame + "px "+yPos});
                }
                else if(countFrame==frameNum) {
                    //run on complete
                }
            }


            else if (dir == 'v'){
                if(countFrame>-1) {
                    $el.css({backgroundPosition: xPos+" "+ (-frameWidth*countFrame) + "px"});
                }
                else if(countFrame==frameNum) {
                    //run on complete
                }
            }


            countFrame--;

        }, rate);
    }

    runStrip();

}





/////////////////////////////////////////////////////////////////////////////////////////////////
// Optional js preloader, needs to be checked on prod environment to make sure AJAX can access
/////////////////////////////////////////////////////////////////////////////////////////////////
preload_animImgs = [""];
var preLoadOn = false;
function reLoadem(preload_animImgs){
    $.each(preload_animImgs, function() {

        var folderName = this;
        var folderVar = folderName+'_count';

        //Loads all png's in specified folders
        $.ajax({
            url: "images/"+this+"/",
            success: function(data){
                $(data).find("a:contains(.png)").each(function(){
                    // will loop through 
                    var images = $(this).attr("href");
                    var insertPic_start = '<img src="images/'+folderName+'/'
                    var insertPic_end = '"/>'

                    $(insertPic_start +images+ insertPic_end).appendTo('#animFrames_preLoad');

                });

            }



        });

        //Loads all jpg's in specified folders			
        $.ajax({
            url: "images/"+this+"/",
            success: function(data){
                $(data).find("a:contains(.jpg)").each(function(){
                    // will loop through 
                    var images = $(this).attr("href");
                    var insertPic_start = '<img src="images/'+folderName+'/'
                    var insertPic_end = '"/>'

                    $(insertPic_start +images+ insertPic_end).appendTo('#animFrames_preLoad');

                });

            }

        });


    });


}

if(preLoadOn){
    reLoadem(preload_animImgs);
}

////////////////////////////////////////////////////////////////////////////////////