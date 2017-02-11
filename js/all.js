/* CONTAINS:
 <script src="js/script.js"></script>
 <script src="js/nav.js"></script>
 <script src="js/introvideo.js"></script>
 <script src="data:application/octet-stream;base64,LypnbG9iYWwgJCwgY29uc29sZSwgbG9nICovDQoNCi8vaGFuZGxlcyB0aGUgdmlkZW8gbW9kYWwuIHJlcXVpcmVzIHBsdWdpbjogdmlkZW8uanMNCi8vc2V0IG9uIHRvcA0KJCgnI3ZpZGVvX292ZXJsYXknKS5wcmVwZW5kVG8oJ2JvZHknKTsNCg0KaWYoJCgnI3ZpZGVvX292ZXJsYXknKS5sZW5ndGggPiAwKXsNCiAgLy9pbml0aWFsaXplIHBsdWdpbg0KICBfVl8ub3B0aW9ucy5mbGFzaC5zd2YgPSAidmlkZW8tanMuc3dmIjsNCiAgdmFyIHZpZFBsYXllciA9IF9WXygidmlkZW9fcGxheWVyIikucmVhZHkoZnVuY3Rpb24oKXsNCiAgICAgICAgbXlQbGF5ZXIgPSB0aGlzOw0KICB9KTsNCn0NCg0KJCh3aW5kb3cpLmJpbmQoImluaXRpYWxpemUiLCBmdW5jdGlvbigpey8vRklYOiBFLkhBTkRMRVIgDQogIA0KICAkKCcudmlkX2xpbmsnKS5jbGljayhmdW5jdGlvbihlKSB7Ly9GSVg6IEUuSEFORExFUiAvL0ZJWDogY2xhc3MgdG8gSUQNCiAgICAvLw0KICAgIHZhciBtcDQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbXA0Jyk7DQogICAgdmFyIG9nZyA9ICAkKHRoaXMpLmF0dHIoJ2RhdGEtb2dnJyk7DQogICAgLy9kb21haW5VUkwNCiAgICBvcGVuVmlkZW8obXA0LCBvZ2cpOw0KICAgIC8vDQogICAgZS5wcmV2ZW50RGVmYXVsdCgpOw0KICB9KTsNCiAgDQogICQoJyN2aWRfY2xvc2UnKS5jbGljayhmdW5jdGlvbihlKSB7Ly9GSVg6IGNsYXNzIHRvIElEDQogICAgY2xvc2VWaWRlbygpOw0KICAgIGUucHJldmVudERlZmF1bHQoKTsNCiAgfSk7DQogIA0KICAkKCcjdmlkX2V4cGFuZCcpLmNsaWNrKGZ1bmN0aW9uKGUpIHsvL0ZJWDogRS5IQU5ETEVSDQogICAgdmlkUGxheWVyLnJlcXVlc3RGdWxsU2NyZWVuKCk7DQogICAgZS5wcmV2ZW50RGVmYXVsdCgpOw0KICB9KTsNCiAgDQp9KTsNCg0Kb3BlblZpZGVvID0gZnVuY3Rpb24obXA0LCBvZ2cpew0KICAvL2NyZWF0ZSBmdWxsIHBhdGggaW5jbHVkaW5nIGRvbWFpbiBuYW1lDQogIHZhciBtcDRfcGF0aCA9IGRvbWFpblVSTCsnLycrbXA0Ow0KICB2YXIgb2dnX3BhdGggPSBkb21haW5VUkwrJy8nK29nZzsNCiAgbG9nKCdtcDRfcGF0aDogJysgbXA0X3BhdGgpOw0KICAvL2NoYW5nZSBzb3VyY2Ugb2YgdmlkZW8gcGx1Z2luDQogIHZpZFBsYXllci5zcmMoWw0KICAgICAgeyB0eXBlOiAidmlkZW8vbXA0Iiwgc3JjOiBtcDRfcGF0aH0sDQogICAgICB7IHR5cGU6ICJ2aWRlby9vZ2ciLCBzcmM6IG9nZ19wYXRoIH0NCiAgICBdKTsNCiAgLy8NCiAgc2V0VGltZW91dChmdW5jdGlvbigpew0KICAgIC8vdGltZW91dCBmaXhlcyBhIGJ1ZywgdGhlbiBwbGF5DQogICAgIHZpZFBsYXllci5wbGF5KCk7DQogICB9LCAxMDApOw0KIA0KICAkKCcjdmlkZW9fb3ZlcmxheScpLmZhZGVJbihmdW5jdGlvbigpew0KDQogIH0pOw0KfTsNCg0KZnVuY3Rpb24gY2xvc2VWaWRlbygpew0KICB2aWRQbGF5ZXIucGF1c2UoKTsNCiAgJCgnI3ZpZGVvX292ZXJsYXknKS5mYWRlT3V0KCk7DQp9"></script>
 */
/*global $, console, log, page, branch, template, vClass, lang, defaultLeftNavItem */

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
        console.log( Array.prototype.slice.call(arguments) );
    }
};
//helper function to remove duplicates from array
Array.prototype.unique = function unique() { var i = 0; while (i < this.length) { var current = this[i]; for (var k = this.length; k > i; k--) { if (this[k] === current) { this.splice(k,1); } } i++; } return this; };
//helper function to get query string parameter with javasctip
function getParameterByName(name) {
    var match = new RegExp('[?&]' + name + '=([^&]*)')
        .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

////////////////////////////// preload images //////////////////////////////
var images = [
    'img/amg_logo.png',
    'img/mercedes_logo.png',
    'img/spinner.gif'
];

if (typeof branch != 'undefined') {
    if(branch=='vehicles' && section!='overview'){
        //preload nav tab images on vehicle pages
        /*
         images.push('img/vehicles/'+page+'/navtabs/tab1.jpg');
         images.push('img/vehicles/'+page+'/navtabs/tab2.jpg');
         images.push('img/vehicles/'+page+'/navtabs/tab3.jpg');
         images.push('img/vehicles/'+page+'/navtabs/tab4.jpg');
         */
    }
}
$(images).each(function() { var image = $('<img />').attr('src', this); });

/* // not being used but leaving just in case
 function refreshScrollPane() {
 var pane = $('.scroll-pane').each(function(){
 var api = $(this).data('jsp');
 try{
 api.reinitialise();
 }catch(e){}
 });    
 }*/

var animHomeUI = true;
var homeSoundOn= true;
var animHomeUI = true;

var $activeMenuHighlight_vehicle = $('#activeMenuHighlight_vehicle');
var $activeMenuHighlight_vehicle_img = $('#activeMenuHighlight_vehicle').find('img');


if (animHomeUI && $('#home-section').length>0){
    $('.item1, .item2, .item3').css({marginTop:'300px'});
    $('.flex-direction-nav a').css({opacity:'0.0'});
    $('#home .copy-outer').css({opacity:'0.0'});
    $('.flex-active-slide ul li').css({opacity:'0.0'});
}

if(homeSoundOn && $("#homeSound").length>0){
    $("#homeSound").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: "sound/introRev01.mp3"
            }).jPlayer("pause"); // auto play
        },
        ended: function (event) {
            $(this).jPlayer("pause");
        },
        swfPath: "swf",
        supplied: "mp3"
    });
}

$(window).load(function() {//FIX: E.HANDLER
    //add elem to display window dimensions for debugging
    $('.flex-prev, .flex-next').text('');

    if(getParameterByName('debug')== 'true'){
        $("body").append("<h4 id='debug' style='position:absolute; left:20px; top: 80px; z-index:999999; color:#500;'><h4>");
    }
    ////////////////////////////// activate sizing tool //////////////////////////////
    /* - not being used corret?
     var slEditorIndTemp = window.location.search.indexOf("sleditor=");
     var editMode = (slEditorIndTemp>0);
     if (editMode) {
     var slEditor = window.location.search.substring(10).replace(/\W/g, '');
     $("body").streamline({
     fields:slFields,
     editor:slEditor
     });
     }*/


    //if video isn't going to play but home animation is turned on, still animate on Home page ui
    if (animHomeUI && $('#intro-video').length<=0 && $('#home-section').length>0){
        animateIn_homeUI();
    }
    if (animHomeUI && $('#home-section').length>0){
        $('.item1, .item2, .item3').css({marginTop:'300px'});
        $('.flex-direction-nav a').css({opacity:'0.0'});
        $('#home .copy-outer').css({opacity:'0.0'});
    }
});
//adding language as a class, beacause russina needs different fonts
$('html').addClass(lang);

// add fade transition to all specified links
$('.with-fade').click(function(e) {//FIX: E.HANDLER ...is this query heavy?
    e.preventDefault();
    var href = $(this).attr('href');
    fadeOutPage(href);
});

fadeOutPage = function(href){
    $('.black-cover').fadeIn(350, function() {
        window.location = href;
    });
};
fadeOutPageFast = function(href){
    //log('fadeOutPageFast');
    $('.black-cover').fadeIn(250, function() {
    });
};

fadeInPage =function(){
    //log('fade in page!!!!')
    $('.black-cover').fadeOut(400);
};


// add hover states to all arrow tabs
/*
 $('.arrow-link').hover(
 function(e) {
 var $this = $(this);
 $this.find('.over').stop().animate({opacity:1});
 $this.find('.on').stop().animate({opacity:0});
 }, function(e) {
 var $this = $(this);
 $this.find('.over').stop().animate({opacity:0});
 $this.find('.on').stop().animate({opacity:1});
 }
 );
 */
$(document).on('mouseenter', '.arrow-link', function(e) {
    var $this = $(this);
    $this.find('.over').stop().animate({opacity:1});
    $this.find('.on').stop().animate({opacity:0});
});

$(document).on('mouseleave', '.arrow-link', function(e) {
    var $this = $(this);
    $this.find('.over').stop().animate({opacity:0});
    $this.find('.on').stop().animate({opacity:1});
});

$(document).on('click', '.video-link', function(e) {
    e.preventDefault();
    var ytID = $(this).attr('data-id');
    //
    var str = "<div class='vid-modal'><div class='vid-modal-inner'><div id='yt-outer'><div id='yt-holder'></div></div><div class='modal-close'><img src='img/close_icon_white.png'></div></div></div>";
    $('#all-inner').prepend(str);
    var yt = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ ytID +'?rel=0&amp;showinfo=0&amp;autoplay=1&wmode=transparent" frameborder="0" allowfullscreen></iframe>'
    $('#yt-holder').append(yt);
});
//
$(document).on('click', '.modal-close', function(e) {
    $('.vid-modal').fadeOut(function(){
        $(this).remove();
    })

});


$(document).on('mouseenter', '.misc-closer', function(e) {
    var $this = $(this);
    var w = $(".close-text").width();
    $this.stop().animate({width:w+40});
    $('#misc-outer').animate({right:w+79});
    $this.find('img').attr('src', 'img/close_icon_white.png');
});

$(document).on('mouseleave', '.misc-closer', function(e) {
    var $this = $(this);
    $this.stop().animate({width:26});
    $('#misc-outer').stop().animate({right:65});
    $this.find('img').attr('src', 'img/close_icon_grey.png');
});


//// email form at bottom of page
if($('#newsletterForm').size() > 0){
    var validAlert = "Valid email is required.";
    if(lang == 'rus'){
        validAlert = "Введите e-mail";
    }

    $("#newsletterForm").validate({
        submitHandler: function() {
            // if forms are valid
            var options = {
                target: '#newsResponse'
            };
            $('#newsletterForm').ajaxSubmit(options);
            //console.log("SSSSSSSSSSUBMIT");
            //show message here
            $('#newsletterForm').fadeOut().delay(4000).fadeIn();
            $('.newsWrapper').addClass('forceOffBG');
            $('#newsletterConfirm').fadeIn().delay(4000).fadeOut();
            var s=s_gi(s_account);
            s.linkTrackVars='events,eVar10,prop10';
            s.linkTrackEvents='event5';
            s.prop10 = lang;
            s.eVar10 = lang;
            s.events = "event5";
            var trackVar = lang + '>newsletter ' ;
            s.tl(true,'o',trackVar,null);
            //$('.newsWrapper').delay(4000).removeClass('forceOffBG');
            setTimeout(function(){
                $('.newsWrapper').removeClass('forceOffBG');
            },4350);
        },
        errorLabelContainer: $(".newsErrorBox"),
        errorClass: "error",

        showErrors: function() {
            $(".newsErrorBox").html('');
            this.defaultShowErrors();
            //fade out after2 sec

            setTimeout(function(){
                $(".newsErrorBox").fadeOut(function(){
                    $(this).html('');
                });
            },2000);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
        },
        messages: {
            email: validAlert
        }
    });

    $("label").inFieldLabels();
}














//
////////////////// Fullscreen GALLERY //////////////////////
//not for vehicles page ////////

if($('#vehicle_overview-section').size() == 0){
    $('body').prepend($('#fullscreen-gallery'));
    var galleryIndex = 0;


    var fullGallery = $('#fullscreen-gallery');

    $('.arrow-link-right').hover(function() {  //FIX: E.HANDLER
        $(this).find('.over').fadeIn('fast');
        $(this).find('.on').fadeOut('fast');
    }, function() {
        $(this).find('.over').fadeOut('fast');
        $(this).find('.on').fadeIn('fast');
    });

    //fullscreen button which gets added dynamically above
    $('body').on("click", '#fullscreen-button',function(){  //FIX: E.HANDLER 
        $('#fullscreen-gallery').fadeIn();
        updateFSGallery();
    });


    //hijack close button to hide c02 overlay
    /*$('body').on("click", '#main-image',function(){  //FIX: E.HANDLER

     });*/


    //hijack close button to hide c02 overlay
    $('body').on("click", '.fancybox-close',function(){  //FIX: E.HANDLER
        $('#co2Overlay_gallery').css({display:'none'});
    });


    window.stripCo2 = function stripCo2(){
        var strippedCo2Content = $('#main-image').find('.news-co2').html();
        // console.log(strippedCo2Content);

        if (strippedCo2Content) {
            $('#co2Overlay_gallery').remove();
            $('body').append('<div id="co2Overlay_gallery" style="display:none;"><div id="co2GalleryDuplicate" class="news-co2">'+strippedCo2Content+'</div></div>');
        };

    }

    var galleryArr;
    var updateFSGallery =function(){
        //updates fullscreen gallery image
        alet('wait')
        var imgPath = galleryArr[galleryIndex];
        var img = $("<img />").bind("load", function(e) {
            //after load
            $(this).fadeIn(function(){
                //delete old image
                if($('#fs-imgholder img').size()>1){
                    $('#fs-imgholder img').eq(0).remove();
                }
            });
        }).appendTo($('#fs-imgholder')).css({display:'none'});

        img.attr("src", imgPath);
    };

    $('#left-arrow').click(function(e) {
        e.preventDefault();
        galleryIndex --;
        if(galleryIndex < 0){
            galleryIndex = galleryArr.length-1;
        }
        updateFSGallery();
    });
    $('#right-arrow').click(function(e) {
        e.preventDefault();
        galleryIndex ++;
        if(galleryIndex > galleryArr.length-1){
            galleryIndex = 0;
        }
        updateFSGallery();
    });
    //

    var dLinks= $('.download-links-outer').blacbox({
        type:'slide-left',
        minWidth: '0px',
        speed: 250
    });

    $('.download-container').hover(function() {  //FIX: E.HANDLER
        dLinks.blacbox('open');
    }, function() {
        dLinks.blacbox('close');
    });
    //fullscreen links
    var fsLinks= $('#fs-links-outer').blacbox({
        type:'slide-left',
        minWidth: '0px',
        speed: 250
    });

    $('#fs-container').hover(function() {  //FIX: E.HANDLER
        fsLinks.blacbox('open');
    }, function() {
        fsLinks.blacbox('close');
    });
    ///// !!! the following functions are called from gallery.js
    fancyboxGalleryChanged = function(index){
        log("INDEX: "+ index);
        galleryIndex = index;
    };
    setFullscreenGallery =function(arr){
        galleryArr = arr;
        //alert(arr.length); 
        stripCo2();
        //this function is called when the fancybox pops up 
        $(window).resize();
        setTimeout(function(){
            $('#co2GalleryDuplicate').css({opacity:'0.0'});
            $('#co2Overlay_gallery').css({display:'block'}).find('#co2GalleryDuplicate').stop().animate({opacity:'1.0'}, 500);
        }, 500);
    };
    hideDownloadLinks = function(){
        $('.download-container').hide();
        $('#fs-button').hide();
    };
    showDownloadLinks = function(){
        $('.download-container').show();
        $('#fs-button').show();
    };
    hideExpandLink = function(){
        $('#fullscreen-outer').hide();
    };
    showExpandLink = function(){
        $('#fullscreen-outer').show();
    };
    //
    fancyboxSingle = function(){
        //if only one image, then no thumbnail bar so shorten height of fancybox
        var singleHeight = 595;
        setTimeout(function(){
            $('.fancybox-inner').css({'height': singleHeight});
            $.fancybox.current.height = singleHeight;
        },450);
        $('.fancybox-inner').css({'height': singleHeight});
        $.fancybox.current.height = singleHeight;
    };
    ///////////////////////////////////////

    $('#fullgallery-close').click(function(e) { //FIX: E.HANDLER
        e.preventDefault();
        $('#fullscreen-gallery').fadeOut(400, function() {

        });
    });
    //
    //these classes used twice so leave as classes. global galery download links
    $('.mobile-button').click(function(e) { //FIX: E.HANDLER
        e.preventDefault();
        var jpg = galleryArr[galleryIndex].replace('fullscreen','downloads/mobile');
        window.open (jpg);
    });
    $('.desktop-button').click(function(e) { //FIX: E.HANDLER
        e.preventDefault();
        var jpg = galleryArr[galleryIndex].replace('fullscreen','downloads/desktop');
        window.open (jpg);
    });
    $('.hd-button').click(function(e) { //FIX: E.HANDLER 
        e.preventDefault(e);
        var jpg = galleryArr[galleryIndex].replace('fullscreen','downloads/hd');
        window.open (jpg);
    });
    // for youtube videos
    $(".fancybox-video").fancybox({
        width  : 853,
        height : 480,
        padding: 1,
        fitToView : false,
        autoSize : false
    });
}
////////////////// end Fullscreen GALLERY //////////////////////
function resizeSmoothScroller(){
    //resize smooth scrollers - like new DNA section
    $('.copy-block-wrapper').each(function() {
        var bg = $(this).find('.text-bg-gradient');
        var scroller = $(this).find('.scroll-pane');
        var h3Height = $(this).find('h3').outerHeight();
        scroller.height(bg.height()-(h3Height+60));
    });
}
$(window).resize(function() {
    //wrapping at try/catch to fix IE8 bug
    setHiliteWidth();
    try{
        ie8MediaQuery();
    }catch(e){}
    //
    /*
     if(lang =="rus" && $("#landing-detail").size()>0 ){
     var topH = $('#landing-detail h1').offset().top + $('#landing-detail h1').outerHeight();
     var h =$(window).height()-(topH +180);
     if(h<274){
     h = 274;
     }
     $('.landing-pane').height(h);
     }
     setTimeout(function(){
     //resizeSmoothScroller();
     }, 50);
     */
    setTimeout(function(){
        scroll_reInit();
    },20)



    setTimeout(function(){
        //when news gallery opened, make sure c02 overlay stay in position
        if ($('#co2Overlay_gallery').length>0 && $('div.fancybox-wrap').length>0) {
            var topOfffset = $('div.fancybox-wrap').offset().top;
            var leftOfffset = $('div.fancybox-wrap').offset().left;
            $('#co2Overlay_gallery').css({top:(topOfffset)+'px', left:(leftOfffset)+'px'});
        };
    }, 500);



});

///// END script.js ///////////////////
/// Start nv.js///////////

/*global $, console, log, page, branch, template, vClass, lang, defaultLeftNavItem */
// handles top, left and bottom, breadcrumbs and utility navs

//FIX: E.HANDLERs, especially blaclight
//FIX: class to ID ... section change needs to address this in the naming

//IE Style fix
if ( $.browser.msie && $.browser.version < 9 ) { $('#top-nav > ul li a').css({fontWeight: 'bold'}); }
$('#connect_fb_over, #connect_twitter_over, #connect_google_over, #connect_yt_over,  #connect_in_over, #sound_replay_btn_over').animate({opacity: '0.0'}, 1);

//rollover entire top menu, show second tier. rolloff tier1, tier2 nav and dropdown to hide
$("#top-nav >ul").blaclight({
    components:[
        {element:$("#vehicle-nav"), onState:{height:240}, offState:{height:0} }
    ],
    onDuration:400,
    offDuration:600,
    hoverOnGroup: $("#top-nav >ul"),
    hoverOffGroup: $("#top-nav, #vehicle-nav .nav, #vehicle-nav-dropdowns li")
});

$("#top-nav >ul a").each( function(){
    var $this = $(this);
    var $hoverOff = $this.add("#vehicle-nav .nav, #vehicle-nav-dropdowns li");
    var $img = $this.parent().find('.topnav-bg');
    var parent = $this.parent();
    $this.blaclight({
        components:[
            // MW - moved into changeVehicleNav() function for delay
            //{element:$(this), onState:{color:"#FF0000"}, offState:{color:"#000000"} }
            //{element:$img, onState:{'display':'block'}, offState:{'display':'none'} }
        ],
        onDuration:400,
        offDuration:600,
        onFunction:changeVehicleNav,
        clickFunction:changeVehicleNav,
        clickGroup:$("#top-nav >ul a"),
        hoverOffGroup: $hoverOff
    });
});


//lock top nav
var currentVehicleNavId="";
if(branch === 'vehicles' && typeof vClass !== 'undefined'){
    var classArr = [];
    /*
     var classArr = ['A','C','CLA','CLS','E','G','GL', 'GLA','ML', 'S','SL','SLK','SLS'];
     if(lang==="rus" || lang==="ita"){
     //exception for russian, because has no GLA class
     classArr = ['A','C','CLA','CLS','E','G','GL','ML','S','SL','SLK','SLS'];
     }*/

    $('#top-nav ul li').each(function( index ) {
        var id = $(this).find('a').text();
        //log("XXX: "+ id);
        classArr.push(id);
    });

    var defaultTopNavItem = $.inArray(vClass, classArr);
    $("#top-nav >ul a:eq("+defaultTopNavItem+")").blaclight("lock").addClass('top-selected');
    currentVehicleNavId ='#vehicle-nav-'+vClass.toLowerCase();
    //$(currentVehicleNavId).stop().animate({opacity:0}, function(){ $(this).css({display:"none"}); });
}
//$('#top-nav >ul a').unbind("click");
$('#top-nav >ul a').click(function(e){
    e.preventDefault();
    e.stopPropagation();
});


$('#vehicle-nav').mouseenter(function() {
    clearTimeout(hoverTimeOut);
});
$('#vehicle-nav').mouseleave(function() {
    //leave only selcted vehicle
    $("#top-nav >ul a").not('.top-selected').find('.topnav-bg').css({"display":'none'});
    $("#top-nav >ul a").not('.top-selected').css({color:'#000000'});
});

var hoverTimeOut;
function changeVehicleNav(me){
    clearTimeout(hoverTimeOut);
    hoverTimeOut = setTimeout(function(){
        var newVehicleNavId = me.attr("href");
        $(newVehicleNavId).css({display:"block"});
        $(currentVehicleNavId).hide();
        $(newVehicleNavId).show();
        currentVehicleNavId = newVehicleNavId;
        //
        $("#top-nav >ul a").not('.top-selected').find('.topnav-bg').css({"display":'none'})
        var $img = me.parent().find('.topnav-bg');
        $img.css({"display":'block'});
        //
        $("#top-nav >ul a").not('.top-selected').css({color:'#000000'});
        me.css({color:'#FF0000'});
    }, 200);
}

$("#top-nav >ul a").hover(
    function () {
        //var $img = $(this).parent().find('.topnav-bg');
        //$img.css({"display":'block'})
    },
    function () {

    }
);


/////////////// VEHICLE NAV AND ROLLOVERS /////////////

$("#vehicle-nav .nav a").each( function(){
    var $this = $(this);
    $this.wrapInner("<div class='inner'>");
    var $target = $( $this.attr("data-subnav") );
    $this.blaclight({
        components:[
            {element:$target, onState:{height:320}, offState:{height:0}, offDelay:200 },
            {element:$target.find(".inner"), onState:{width:265}, offState:{width:0}, onDelay:200}
        ],
        onDuration:300,
        onDelay:0,
        offDuration:300,
        onFunction:onVehicleNav,
        clickFunction:onVehicleNav,
        hoverOnGroup: $this,
        hoverOffGroup: $this.add( $($this.attr("data-subnav")) )
    });
});


function onVehicleNav(link){
    var $target = $( link.attr("data-subnav") );
    $target.css({left: (link.offset().left-135)+"px"});
}

//replay video ink
/*
 $('#replayVideo').click(function(e){
 $.removeCookie('intro-video-shown', { path: '/' });
 e.preventDefault();
 log('replayVideo');
 setTimeout(function(){
 window.location = 'home.php?lang='+window.language;
 }, 250);

 });
 */
var col = '#000';
if($('#veh-nav-container').hasClass("nav2016")){
    col = '#FFF';
}
//////////////// BOTTOM NAV ///////////////////
var menuOpen = false;
$("#menu-btn").click(function(event) {
    if(menuOpen){
        closeMenu();
        menuOpen = false;
    }else{
        openMenu();
        menuOpen = true;
    }
});

function openMenu() {
    $("#menu-btn").addClass("on");
    $("#main-nav").addClass("open");
}
function closeMenu() {
    $("#menu-btn").removeClass("on");
    $("#main-nav").removeClass("open");
}

$("#main-nav li a").each( function(){
    var $this = $(this);
    var $img = $this.parent().find('.mainnav-bg');
    $this.blaclight({
        components:[
            {element:$this, onState:{color:'#F00'}, offState:{color:col} },
            {element:$img, onState:{'display':'block'}, offState:{'display':'none'} }
        ],
        onDuration:250,
        offDuration:250,
        clickGroup:$(".bottom-nav li a")
    });
});
var mainNavArr
if(lang == 'deu' || lang =='eng'){
    mainNavArr = ['vehicles','racing','engineering', 'amgthebrand','about','personalize','lifestyle','latest'];
}else{
    mainNavArr = ['vehicles', 'racing', 'engineering', 'about', 'personalize', 'lifestyle', 'latest'];
}
if(lang == 'ara'){
    mainNavArr = ['vehicles','racing','engineering','about','personalize','lifestyle'];
    mainNavArr = mainNavArr.reverse();
}
if (lang == "twn") {
    mainNavArr = ['vehicles', 'amgthebrand', 'racing','engineering','about','lifestyle','latest'];
}
if (lang == "kor") {
    mainNavArr = ['vehicles','racing','engineering','about','personalize','latest'];
}
if (lang == "nld") {
    mainNavArr = ['vehicles','racing','about','personalize','lifestyle','latest'];
}
var curBranch = branch;
if (page==="racing") { curBranch = "racing"; }
if (branch==="customize") { curBranch = "personalize"; }

var defaultMainNavItem = $.inArray(curBranch, mainNavArr );
if(curBranch == "home"){
    $("#homeicon-bg").css({opacity:1});
}
//log("defaultMainNavItem: "+ defaultMainNavItem);
$("#main-nav li a:eq("+defaultMainNavItem+")").blaclight("lock");


function setHiliteWidth(){
    //position highlights
    $("#main-nav li").each( function(){
        var $this = $(this);
        var w = $this.width()-2;
        if($(window).width()< 1250){
            w = $this.width()-8;
        }
        $this.find('.mainnav-bg-middle').css({width: w});
        var offset = 47;

        $this.find('.mainnav-bg-right').css({left: w+offset});
    });
}
setHiliteWidth()


function shiftFooterForms(sw, nw){
    $(".searchWrapper").stop().animate({width:sw-20, right:nw+10});
    $(".searchWrapper form").stop().animate({width:sw-20});
    $(".searchWrapper input").stop().animate({width:sw-45});
    $(".searchWrapper label").stop().animate({width:sw-45});

    $(".newsWrapper").stop().animate({width:nw-20, right:8});
    $(".newsWrapper form").stop().animate({width:nw-20});
    $(".newsWrapper input").stop().animate({width:nw-45});
    $(".newsWrapper label").stop().animate({width:nw-45});
}
$(".searchWrapper #query").focus(function(e){
    e.stopImmediatePropagation();
    //shiftFooterForms(140,95);
});
$(".newsWrapper #email").focus(function(e){
    e.stopImmediatePropagation();
    //console.log("news");
    //shiftFooterForms(95,140);
});

//////////////// LEFT NAV & INTRA PAGE TRNSITIONS///////////////////////////////////
$("#left-nav li:eq(0)").css({'background-image':'none'});
//
$("#left-nav >ul li a, #left-nav .related-links a").each( function(){
    var $this = $(this);
    var $el = $this;
    var $rArrow = $this.parent().find('.ln_rightarrow');
    var $lArrow = $this.parent().find('.ln_leftarrow');
    $this.blaclight({
        components:[
            {element:$el, onState:{color:'#FFF'}, offState:{color:'#9d9d9d'} },
            {element:$lArrow, onState:{opacity:1}, offState:{opacity:0} }
            // {element:$rArrow, onState:{opacity:1}, offState:{opacity:0} }
        ],
        onDuration:250,
        offDuration:250,
        doClick:true,
        clickGroup:$("#left-nav li a")
    });
});
//expand globe icon after set period of time
/**/var globeTimeout = setTimeout(function(){
    //$("#left-nav-tabs li:last").find('a').triggerHandler('mouseenter');
},15000);
//
$("#left-nav-tabs").blaclight({
    components:[
    ],
    onDuration:400,
    offDuration:500,
    offFunction: function(){
        //log('rolled off #left-nav-tabs');
        //$("#left-nav-tabs").stop().animate({"height":48},500);
        //$('#tab-global-selector').animate({width:0},200);
    },
    hoverOffGroup: $("#left-nav-tabs, #tab-global-selector")
});

defaultMb_title = $(".tab-title h3").text();


//ripping out href links and killing old links
$('#left-nav #left-nav-tabs >ul a').each(function(){
    var checkContent = $(this).find("img").attr("src");
    if(checkContent=="img/leftNavTabIcon1_Larger_over.png"){ $(this).closest("li").remove(); }
    if(checkContent=="img/leftNavTabIcon2_Larger_over.png"){ $(this).closest("li").attr("id", "newLinkOne"); }
    if(checkContent=="img/leftNavTabIcon3_Larger_over.png"){ $(this).closest("li").attr("id", "newLinkTwo"); }
    if(checkContent=="img/leftNavTabIcon4_Larger_over.png"){ $(this).closest("li").remove(); }
    /* if(!lang==="rus"){	
     var myContent = leftNavTabContent[ $(this).attr("href").substring(1) ]; 
     var blablabla = $("#left-nav .tab-content").html(myContent);	
     var getLink = blablabla.find("a").attr("href");
     var getLinkDescription = blablabla.find(".tab-title h3").text();
     $(this).attr("href",getLink).attr("data-info",getLinkDescription);
     }*/
    if(lang==="rus"){
        //russian doesn't have other links so hide bottom of left-nav
        $('#left-nav-tabs').css({height:'0px'}).find('ul').css({height:'0'});
    }else{
        //alert('ok');
        var myContent = leftNavTabContent[ $(this).attr("href").substring(1) ];
        var blablabla = $("#left-nav .tab-content").html(myContent);
        var getLink = blablabla.find("a").attr("href");
        var linkType = blablabla.find("a").attr("target");
        var getLinkDescription = blablabla.find(".tab-title h3").text();
        $(this).attr("href",getLink).attr("target",linkType).attr("data-info",getLinkDescription);
    }

    //IF LANG IS TWN ADJUST MASTER CSS FOR THE ABOVE TAB(S) -PB
    if (lang == "twn") {
        $("#left-nav #left-nav-tabs >ul a").css({'margin-left':'21.5px'});

    }



});

$('#left-nav #left-nav-tabs >ul a').hover(function() {
    var currentNewTitle = $(this).attr("data-info");
    $(".tab-title h3").text(currentNewTitle);
}, function() {
    $(".tab-title h3").text(defaultMb_title);
});	/**/



$("#left-nav #left-nav-tabs >ul a").click(function(e){
    //e.preventDefault();  
    //e.stopPropagation();
});
//



setTimeout(function(){
    $('#left-nav').not(".splashLeft").find('ul').find('li').each(function() {
        //alert($(this).outerHeight())
        if($(this).outerHeight()>36){
            $(this).css({paddingTop:'7px', paddingBottom:'4px'});
            $(this).find('a').css({lineHeight: '120%'});
            $(this).find('img').css({height:'165%', top:'-31%'});
            //$(this).find('img').css({height:'130%', top:'-31%'});
        }
        //$(this).find('img').css({display:'block', opacity:'1.0'});
    });	/**/
}, 500);

/*$('#left-nav >ul li').click(function() {
 $(this).find('a').click();
 });	*/


var tabContentHeight;
$("#left-nav #left-nav-tabs >ul a").mouseenter(function(e){
    //e.preventDefault();
    //e.stopPropagation();
    var $this = $(this);
    clearTimeout(globeTimeout);
    var myContent = leftNavTabContent[ $this.attr("href").substring(1) ];
    $("#left-nav .tab-content").html(myContent);

    /* $("#left-nav .tab-content .content-image").bind('load', function(){ //wait for image load in chrome, then redo the animation
     var imgHeight = $("#left-nav-tabs .content-image").height() //94;
     //log("img height:"+imgHeight);
     tabContentHeight = $("#left-nav-tabs ul").height()+$("#left-nav-tabs .tab-title").height()+$("#left-nav-tabs .tab-text").height()+$("#left-nav-tabs .tab-link").height()+imgHeight+30;
     /*$("#left-nav-tabs").stop().animate({"height":tabContentHeight},200);
     });
     var imgHeight = $("#left-nav-tabs .content-image").height() //94;
     //log("img height:"+imgHeight);
     tabContentHeight = $("#left-nav-tabs ul").height()+$("#left-nav-tabs .tab-title").height()+$("#left-nav-tabs .tab-text").height()+$("#left-nav-tabs .tab-link").height()+imgHeight+30;
     $("#left-nav-tabs").stop().animate({"height":tabContentHeight},200); 

     //there are only 3 tabs if no webspecial, so handling accordingly
     if ($this.parent().siblings().size() == 2 && $this.parent().index()<2 ||  $this.parent().siblings().size() == 3 && $this.parent().index()<3){ 
     $('#tab-global-selector').animate({width:0},200); 
     }else { $("#global-link").click(function(e){
     //log("global link clicked");
     e.preventDefault();
     var $sel = $('#tab-global-selector');
     $sel.css({height:tabContentHeight-30,left:$("#left-nav").width()+$("#left-nav").offset().left+'px', top:$("#left-nav-tabs").position().top+35+"px"}).animate({width:150},500);
     $sel.find('.scroll-pane').css({height:tabContentHeight-50});
     }); }*/
});

$("#tab-global-selector  .scroll-pane a").click(function(e){
    s.pageName = "Dealer Link > "+$(this).html();
    s.tl(this,'o');
});



if($('#left-nav').size()>0){
    $("#left-nav >ul li a:eq("+defaultLeftNavItem+")").blaclight("lock");
}


$("#left-nav-tabs >ul a").each( function(){
    var $this = $(this);
    $this.blaclight({
        components:[
            {element:$this.find("img"), onState:{opacity:1}, offState:{opacity:0} }
        ],
        onDuration:400,
        offDuration:500,
        doClick:true,
        clickGroup:$("#left-nav-tabs >ul li")
    });
    if ($this.parent().index()==3) {
        $this.blaclight("lock");
    }/**/
});

var sp = $('#tab-global-selector .scroll-pane');
sp.jScrollPane({
    verticalDragMaxHeight: 52,
    verticalDragMinHeight: 52,
    autoReinitialise: true,
    autoReinitialiseDelay:150,
    animateScroll:true
});
// for media -> news section within vehicles pages. and/remove breadcrums dynamically when changing between media and news page
function checkBreadcrumbs(thisTemplate){
    if(thisTemplate=='latest_news' && branch == 'vehicles'){
        //add media bread crumb
        var mediaTitle = $('#left-nav ul li').eq(6).text();
        var li = "<li class='breadnews'><a href='#' class='media-breadcrumb'>"+mediaTitle+"</a>";

        $('.breadcrumb').append(li);
        //turn vehicle breadcrumb into a link
        var targetText = $('.breadcrumb li').eq(1).find('h4').text();
        $('.breadcrumb li').eq(1).find('h4').replaceWith('<a href="#" class="media-breadcrumb">'+targetText+'</a>');
    }else{
        //turn vehicle breadcrumb into a not a link
        $('.breadnews').remove();
        var targetText = $('.breadcrumb li').eq(1).find('a').text();
        $('.breadcrumb li').eq(1).find('a').replaceWith('<h4>'+targetText+'</h4>');

    }
}


var oldLeftNavIndex = -1;
var ajaxLoad;
var $h0;
//change main section with ajax load
function changeSection2(thisTemplate, thisSection, noLock){
    if(thisSection == section){
        return;
    }
    checkBreadcrumbs(thisTemplate);
    section = thisSection;
    setFullURL();
    var $oldSection = $(".section");
    ajaxLoad = true;

    //
    var thisIndex;
    if(!noLock){
        $("#left-nav a").each(function(i){
            var $this=$(this);
            if ($this.attr("data-section")==thisSection){
                $this.blaclight("lock");
                thisIndex = i;
            }
        });
    }

    $h0= $(window).height();
    if (oldLeftNavIndex>thisIndex) { $h0= -$(window).height(); }
    oldLeftNavIndex = thisIndex;
    if(thisSection == "dna"){
        $('.breadcrumb-outer').addClass('dark');
    }else{
        $('.breadcrumb-outer').removeClass('dark');
    }
    $oldSection.addClass("old");
    $oldSection.after('<div class="section" id="'+thisSection+'-section"></div>');
    var $newSection = $("#"+section+"-section");
    //don't want to happend for 'The Latest' pages, becasue latest pages only has opacity transitions
    if($('#latest').size() ==0){
        $newSection.css("top", $h0+"px");
    }else{
        //
        $newSection.css({'opacity':0});
    }
    fadeOutPageFast();
    var templateUrl = "templates/"+thisTemplate+".php?branch="+branch+"&page="+page+"&section="+thisSection+"&lang="+lang+"&path=1";
    var scriptUrl = "js/templates/"+thisTemplate+".js";
    $newSection.load(templateUrl,
        function(){
            $(window).trigger("initialize");
            reverseSubNavs();
        }
    );

    if (thisTemplate=="lander") { $("#left-nav").animate({"left":-300},500); }
    else { $("#left-nav").delay(500).animate({"left":0},500); }

    s.pageName = lang +">" +branch+">"+page+">"+section;
    s.tl();

}
// called from each sections js file once images are done loading
function changeSection(){
    $(".section.old").animate({top:-$h0}, 2000, "easeInOutQuart");//FIX: class to ID
    $("#"+section+"-section").animate({top:0}, 1200, "easeInOutQuart", function(){
        $(".section.old").remove();
    });
    ajaxLoad = false;
    fadeInPage();
}

//called from "Latest" section. transitions only uses opacity
function changeSectionLatest(){
    $("#"+section+"-section").animate({opacity:1}, 800, "easeInOutQuart", function(){
        $(".section.old").remove();
    });
    ajaxLoad = false;
    fadeInPage();
}

if ($("#latest").size()>0){
    $featuredHeader = $(".featured .fcopy-inner h2");
    $featuredSubheader = $(".featured .fcopy-inner p");
    $featuredCopy = $(".featured .fcopy-inner");
    $(window).resize(function() {
        $featuredHeader.width($featuredCopy.width()-110);

        var timeout=30;
        while ($featuredSubheader.width()>$featuredCopy.width()-20 && timeout>0){
            var s= $featuredSubheader.html();
            if($featuredSubheader.size()>0){
                $featuredSubheader.html( s.substring(0, s.length-10) +"..." );
            }
            timeout--;
        }
    });
    $featuredHeader.width($featuredCopy.width()-110);
}
$("#left-nav >ul a").click(function(e){
    e.preventDefault();
    var $this = $(this);
    $(".activeTab").removeClass("activeTab");
    $this.addClass("activeTab");
    var href = $this.attr('href');
    if($this.attr('target')=='_blank'){
        // for new window
        window.open(href, '_blank');
    }else if (href !== '#'){
        //window.location = href;
        fadeOutPage(href);
    }
    else{
        if ( $this.attr("data-section") ){
            //log('---------1: '+ $this.attr("data-template"))
            //log('---------2: '+ $this.attr("data-section"))
            changeSection2( $this.attr("data-template"), $this.attr("data-section") );
        }
    }
});

$("#left-nav >ul a").each(function(){
    if ($(this).attr("data-section")==section) $(this).addClass("activeTab");
});


//////////////// LATEST/VEHICLE FLOATING NAV //////////////////////////////////

if ( (branch=="vehicles" && section=="overview") || branch=="latest"){

    var $topFloatingNav = $("#filter-nav");
    if (branch=="vehicles") $topFloatingNav = $("#top-sub-nav");


    function navArrowAndBgOn2(){
        //var windowWidth = $(window).width();
        var activeTabPosition = 0;
        if ( $('.activeTab').length>0 ) activeTabPosition = $('.activeTab').position();
        var activeTabWidth = $('.activeTab').width()*.5;
        //
        var activeTabPositionLeft = activeTabPosition.left+activeTabWidth -5;
        //alert(activeTabPositionLeft);
        $('#topNav_arrow').delay(300).animate({left: activeTabPositionLeft+4}, 500);
        $('#topNav_arrowVehic').delay(300).animate({left: activeTabPositionLeft+4}, 500);
    };


    function navArrowAndBgOn(){
        var activeTabPosition = $('.activeTab').position();
        var activeTabWidth = $('.activeTab').width()*.5;
        var activeTabPositionLeft = activeTabPosition.left+activeTabWidth -5;
        $('#topNav_arrow').delay(300).animate({left: activeTabPositionLeft+4}, 500);
        $('#topNav_arrowVehic').delay(300).animate({left: activeTabPositionLeft+4}, 500);
    }


    //Vehicles arrow slide
    function initArrow(){
        $topFloatingNav.find("a:first-child").addClass("activeTab");
        navArrowAndBgOn2();
    }
    initArrow();


    ////// top sub nav as seen on "THe Latest" page /////////////
    $("#top-sub-nav >ul li a").each( function(){
        "no strict";
        var $this = $(this);
        var $el = $this;
        $this.blaclight({
            components:[
                {element:$el, onState:{color:'#FFF'}, offState:{color:'#CCC'} }
            ],
            onDuration:250,
            offDuration:250,
            doClick:true,
            clickGroup:$("#top-sub-nav >ul li a"),
            onFunction: function($self){
                $self.parent().css({'background-image':'url(img/nav_hilight.png)'});
            },
            offFunction: function($self){
                if(!$self.data("d").isLocked){
                    $self.parent().css({'background-image':'none'});
                }
            }
        });
    });

    if($('#top-sub-nav').size()>0){
        "no strict";
        //log(defaultLeftNavItem);
        $("#top-sub-nav li a:eq("+defaultLeftNavItem+")").blaclight("lock");
        //make arrow move to correct nav item if going directly through query string
        $('.activeTab').removeClass('activeTab');
        $("#top-sub-nav li a:eq("+defaultLeftNavItem+")").addClass('activeTab');
        navArrowAndBgOn();
    }

    $("#top-sub-nav a").click(function(e){
        "no strict";
        e.preventDefault();
        var $this = $(this);
        $(".activeTab").removeClass("activeTab");
        $this.addClass("activeTab");
        var href = $this.attr('href');
        //navBgOn();
        navArrowAndBgOn();
        if (href !== '#'){
            //window.location = href;
            fadeOutPage(href);
        }
        else{
            if ( $this.attr("data-section") ){
                changeSection2( $this.attr("data-template"), $this.attr("data-section") );
            }
        }
    });

}
//////////////// MISC //////////////////////////////////
var $hideElements;
var currentPage;
setFullURL = function(skipSec){
    currentPage = window.location.toString();
    //log("CCCC: "+currentPage);
    if(section && !skipSec){
        var pre ="&";
        if(currentPage.indexOf("?") == -1){
            //if doesnt contain q-mark, start with it
            pre = "?";
        }

        if(currentPage.indexOf("section") != -1){
            //if has 'section' in query string, then replace with new value
            currentPage = currentPage.replace(/(section=)[^\&]+/, '$1' + section);
        }else{
            //else add 'section' in query
            currentPage += pre+"section="+section;
        }
    };


    if(section=="news" && window.newsID){
        if(currentPage.indexOf("id") != -1){
            //if has 'id' in query string, then replace with new value
            currentPage = currentPage.replace(/(id=)[^\&]+/, '$1' + window.newsID);
        }else{
            currentPage += "&id="+window.newsID;
        }
    }
    //so this works on blacqube.net and preview server
    currentPage = currentPage.replace("http://10.0.1.15:8888", "http://www.mercedes-amg.com");
    //currentPage = currentPage.replace("http://www.blacqube.net/secure/clients/amg/3dot0", "http://www.mercedes-amg.com");
    currentPage = currentPage.replace("http://www.preview.mercedes-amg.com/3dot0preview", "http://www.mercedes-amg.com");
    currentPage = encodeURIComponent(currentPage);
    //
    //strip any number sign
    currentPage = currentPage.replace('%23','');
    //log("currentPage: " + currentPage);
    log("currentPage: " + currentPage);
};
//setting "skipSec" to true inititally because not needed wanted initial load
setFullURL(true);

$(window).bind("initialize", function(){
    //define any elements that should be hidden when expanded
    //$hideElements = $('#touts, .breadcrumb-outer, .copy, .page-title, #left-nav, #top-sub-nav,.bottom-nav, .copy-block, .ui-outer, .end-buttons, #landing-detail, #tout-landing, #misc, .circle-nav, #footerTopShadow');
    $hideElements = $('#touts, .breadcrumb-outer, .copy, .page-title, #left-nav, #top-sub-nav,.bottom-nav, .copy-block, .ui-outer, .end-buttons, #landing-detail, #tout-landing, #misc, .circle-nav, .circle-navAudio, #footerTopShadow, #learnMoreNew, #getQuoteBtn, #viewWebspecialBtn, #viewEditionsBtn, #overviewData, #splashTopUI, #leftRotateArrow, #rightRotateArrow');
});
var expanded = false;
function expandAll(){
    $('#expand-cover').show();
    $('#top-nav').animate({'top':'-90px'});
    $('#footer-wrapper').animate({'bottom': -150});
    //$('#main-nav').animate({'bottom':0,'height':0});
    //$('#footer-nav').animate({'height':0, opacity:0});
    // $('#co2-footer').animate({'bottom':-60});
    $('.sub-nav, .dl-inner').fadeOut();
    $('.flex-direction-nav, .splashLeft ul, .splashLinkBG').fadeOut();
    //
    $hideElements.fadeOut();
    expanded = true;
}
function showAll(){
    $('#expand-cover').hide();
    $('#top-nav').animate({'top':'0px'});
    $('#footer-wrapper').animate({'bottom': 0});
    //$('#main-nav').animate({'bottom':'0px', 'height':'50px'});
    //$('#footer-nav').animate({'height':'30px', opacity:1});
    //$('#co2-footer').animate({'bottom':0});
    $('.sub-nav, .dl-inner').fadeIn();
    $('.flex-direction-nav, .splashLeft ul, .splashLinkBG').fadeIn();
    //
    $hideElements.fadeIn();
    expanded = false;
    $(window).resize(); //qetQuote menu scroll-pane loses size once hidden, this brings it back
}
function clickMisc(linkClicked){
    "no strict";

    if (!linkClicked) { linkClicked = $(""); }

    if (linkClicked.attr("id")=="expand-link"){
        if(expanded){
            showAll();
        }else{
            expandAll();
        }
    }
    else if (linkClicked.attr("id")==="share-link"){
        //window.open("http://www.facebook.com/share.php?u="+currentPage,"","menubar=0,resizable=0,width=640,height=380");
        openFBshare();
        //("#share-link")
    }

    $("#misc li").each( function(){
        var $this = $(this);
        var hw = $this.find("h4").width();
        if ($this.attr("id") == linkClicked.attr("id")) {
            $this.find(".inner").animate({width:hw+35},500);
        }
        else {
            $this.find(".inner").animate({width:20},500);
        }
    });
}

$('#expand-cover').click(function(e){
    e.preventDefault();
    showAll();
});

$("#misc li").each( function(){

    var $me = $(this);
    $me.wrapInner("<div class='inner'><div class='inner2'>");

    $me.find(".over").click(function(e){//FIX: E.HANDLER
        clickMisc($(this).parent().parent().parent());
        e.preventDefault();
    });

    $me.blaclight({
        components:[
            {element:$me.find(".over"), onState:{opacity:1}, offState:{opacity:0} },
            {element:$me.find(".off"), onState:{opacity:0}, offState:{opacity:1} }
        ],
        onDuration:400,
        offDuration:800,
        doClick:true,
        clickGroup: $("#misc li"),
        onFunction: function($self){
            $self.find(".inner").stop().animate({width:$self.find("h4").width()+35},500);
        },
        offFunction: function($self){
            $self.find(".inner").stop().animate({width:20},500);
        }
    });
});
//
$('#misc-outer').show();

$("#iphone-dload, #standard-dload, #hd-dload, #share-text-link, #expand-text-link").each( function(){
    "no strict";
    var $this = $(this);

    $this.blaclight({
        components:[
            {element:$this, onState:{color:"#FFF"}, offState:{color:"#CCC"} }
        ],
        onDuration:400,
        offDuration:800,
        doClick:true,
        clickGroup: $("#iphone-dload, #standard-dload", "#hd-dload"),
        clickFunction:function(linkClicked){
            var path = 'img/'+branch +"/"+page +"/"+section+"/download_";
            if (linkClicked.attr("id")==="iphone-dload"){
                //window.open(path+'mobile.jpg');
                window.open('http://www.mercedes-amg.com/webspecial/sl63/img/gallery/iphone/gallery_2_1.jpg');
            }
            if (linkClicked.attr("id")==="standard-dload"){
                //window.open(path+'standard.jpg');
                window.open('http://www.mercedes-amg.com/webspecial/sl63/img/gallery/standard/gallery_2_1.jpg');
            }
            if (linkClicked.attr("id")==="hd-dload"){
                //window.open(path+'hd.jpg');
                window.open('http://www.mercedes-amg.com/webspecial/sl63/img/gallery/hidef/gallery_2_1.jpg');
            }
            //
            if (linkClicked.attr("id")==="share-text-link"){
                openFBshare()
                //window.open("http://www.facebook.com/share.php?u="+currentPage,"","menubar=0,resizable=0,width=640,height=380");
            }
            if (linkClicked.attr("id")==="expand-text-link"){
                if(expanded){
                    showAll();
                }else{
                    expandAll();
                }
            }
            //expand-text-link
        }
    });
});

$('#share-text-link, #expand-text-link').click(function(e) {
    e.preventDefault();
});

$("#facebook_share").click(function(e) {
    openFBshare();
});
$("#twitter_share").click(function(e) {
    var t = $(this).attr('data-text');
    window.open("http://twitter.com/home?status="+t+"","","menubar=0,resizable=0,width=640,height=380", '_blank');
});

function openFBshare(){
    //window.open("http://www.facebook.com/share.php?u=http://www.mercedes-amg.com","","menubar=0,resizable=0,width=640,height=380");
    //
    //var url = $('meta[property="og:url"]').attr('content');
    //alert('url: '+ url)
    window.open("http://www.facebook.com/share.php?u="+currentPage,"","menubar=0,resizable=0,width=640,height=380");
    log("currentPage::: "+ currentPage);
}

if ( $.browser.msie && $.browser.version < 9 ) {

    $('#sound_replay_btn_over').hover(function() {
        $(this).css({opacity: '1.0'});
    }, function(){
        $(this).css({opacity: '0.0'});
    });

    $('#connect_fb_over').hover(function() {
        $(this).css({opacity: '1.0'});
    }, function(){
        $(this).css({opacity: '0.0'});
    });

    $('#connect_twitter_over').hover(function() {
        $(this).css({opacity: '1.0'});
    }, function(){
        $(this).css({opacity: '0.0'});
    });

    $('#connect_google_over').hover(function() {
        $(this).css({opacity: '1.0'});
    }, function(){
        $(this).css({opacity: '0.0'});
    });

    $('#connect_yt_over').hover(function() {
        $(this).css({opacity: '1.0'});
    }, function(){
        $(this).css({opacity: '0.0'});
    });
    $('#connect_in_over').hover(function() {
        $(this).css({opacity: '1.0'});
    }, function(){
        $(this).css({opacity: '0.0'});
    });

}

else {

    $('#sound_replay_btn_over').hover(function() {
        $(this).stop(true).animate({opacity: '1.0'}, 350);
    }, function(){
        $(this).stop(true).animate({opacity: '0.0'}, 450);
    });

    $('#connect_fb_over').hover(function() {
        $(this).stop(true).animate({opacity: '1.0'}, 350);
    }, function(){
        $(this).stop(true).animate({opacity: '0.0'}, 450);
    });

    $('#connect_twitter_over').hover(function() {
        $(this).stop(true).animate({opacity: '1.0'}, 350);
    }, function(){
        $(this).stop(true).animate({opacity: '0.0'}, 450);
    });

    $('#connect_google_over').hover(function() {
        $(this).stop(true).animate({opacity: '1.0'}, 350);
    }, function(){
        $(this).stop(true).animate({opacity: '0.0'}, 450);
    });

    $('#connect_yt_over').hover(function() {
        $(this).stop(true).animate({opacity: '1.0'}, 350);
    }, function(){
        $(this).stop(true).animate({opacity: '0.0'}, 450);
    });
    $('#connect_in_over').hover(function() {
        $(this).stop(true).animate({opacity: '1.0'}, 350);
    }, function(){
        $(this).stop(true).animate({opacity: '0.0'}, 450);
    });
}

//// END nav.js //////
////// start introvideo.js ////////

// handles the full-browser intro video to a page
/*global $, console, log */
(function ($) {
    "no strict";
    if ($("#intro-video").size()>0){
        var videoRatio = 1024/576;
        var videoComplete=function(){
            //when video reaches the end or skip button clicked...
            try{
                //set homepage flex slider to first image
                homeSlider.flexslider(0);
            }catch(error){}
            //set cookie to not show video again
            $.cookie('intro-video-shown', 'true', { expires:9999, path: '/' });
            $('#skip_intro').hide();
            $('#skip_button').hide();
            //$('#galleryNav').fadeIn();
            //pause video, if needed
            if($('#intro-video').length>0){
                try{
                    videojs("intro-video").pause();
                }catch(e){};
            }
            //if home page and animHomeUI true
            if (animHomeUI && $('#home-section').length>0){
                animateIn_homeUI();
            }
            //fade out video
            $('#intro-video').delay(500).fadeOut(1000, function() {
                // Animation complete.
                //remove from dom
                $('.home-video').remove();
                $('#skip_intro').remove();

                //if backplate video mode on other pages 
                if($('.vidBelow').length > 0){
                    fadeIn_bodyCopy();
                }
            });
        };
        // make video full screen and centered
        var resizeVideo = function() {
            //don't see a way around scling this with just css
            if ($("#intro-video").size()>0){
                var w;
                var h;
                if (($(window).width() / $(window).height()) < videoRatio) {
                    h = Math.round($(window).height());
                    w = Math.round(h * videoRatio);
                    //
                    $('#intro-video').css({
                        width: w,
                        height: h
                    });
                } else {
                    w =Math.round($(window).width());
                    h = Math.round(w * videoRatio);
                    $('#intro-video').css({
                        height: h,
                        width: w
                    });
                }

                // center
                var leftOffset = ($(window).width() - $('#intro-video').width()) * 0.5;
                var topOffset = ($(window).height() - $('#intro-video').height()) * 0.5;

                $('#intro-video').css({
                    left: Math.round(leftOffset) + 'px',
                    top: Math.round(topOffset) + 'px'
                });
            }
        };
        //
        var videoError = function(e){
            if ( $.browser.msie && $.browser.version < 9 ) {
                videoComplete();
            }
        };
        // requires plugin: video.js on the page
        if($('#intro-video').length > 0){
            //log('1');
            videojs("intro-video").addEvent("error", videoError);
            //log('2');
            videojs("intro-video").ready(function(){
                //when video ready, hide preload cover
                //fadeInPage();
                $('.black-cover').hide();
                resizeVideo();
                this.addEvent("ended", videoComplete);
                $('.vjs-loading-spinner').remove();

            });
            resizeVideo();
        }
        //called from video.js if no no html5 or no flash
        $('#intro-video').bind('noflashevent', function(){
            videoComplete();
        });

        if($('#video-1').length > 0){
            videojs("video-1").ready(function(){
                //this.addEvent("timeupdate", videoProgress2);
            });
        }

        /*$('#skip_button, #skip_intro, #intro-video').click(function(e) {
         e.preventDefault();
         //videojs("intro-video").pause();
         videoComplete();
         });*/

        //$('#skip_button, #skip_intro, #intro-video').click(function(e) {
        $('#skip_button, #skip_intro, #intro-video').live('click', function(e){
            e.preventDefault();
            //videojs("intro-video").pause();
            videoComplete();
        });

        function fadeIn_bodyCopy(){
            $("#landing-detail").css({display:'block'}).animate({top:'-=4%', opacity: '1.0'}, 1000);
        }

        window.animateIn_homeUI =  function animateIn_homeUI(){
            pageBlockOn();
            var numLiHome = $('.flex-active-slide ul li').length;
            $('.flex-active-slide ul li:lt('+numLiHome+')').each(function(){
                $(this).css({opacity:'0.0', marginTop:'-10px'});
            });

            setTimeout(function(){
                $('.item1').animate({marginTop:'0px'}, 1600, 'easeInOutBack');
                $('.item2').delay(100).animate({marginTop:'0px'}, 1600, 'easeInOutBack');
                $('.item3').delay(200).animate({marginTop:'0px'}, 1600, 'easeInOutBack');
                $('.flex-direction-nav a').delay(3000).animate({opacity:'1.0'}, 2000);
                $('#home .copy-outer').delay(3000).animate({opacity:'1.0'}, 2500, function(){
                    //pageBlockOff();
                });

                setTimeout(function(){
                    pageBlockOff();
                }, 2000);

                setTimeout(function(){
                    var del = 0;
                    $('.flex-active-slide ul li:lt('+numLiHome+')').each(function(){
                        $(this).delay(del).animate({marginTop:'0px', opacity:'1.0'}, 500);
                        del += 500;
                    });
                }, 3600);

                if(homeSoundOn){
                    setTimeout(function(){$("#homeSound").jPlayer("play"); }, 1450);
                }

                setTimeout(function(){
                    var numLi = $('#top-nav li').length;
                    var delay = 0;
                    var delay2 = 150;
                    $('#top-nav li:lt('+numLi+')').each(function(){
                        $(this).find('a').delay(delay).animate({color:'rgb(255, 0, 0)'}, 100, function(){
                            $(this).find('img').css({display:'block'});
                        });
                        delay += 35;
                    });
                    $('#top-nav li:lt('+numLi+')').each(function(){
                        $(this).find('a').delay(delay2).animate({color:'rgb(0, 0, 0)'}, 80, function(){
                            $(this).find('img').css({display:'none'});
                        });
                        delay2 += 25;
                    });

                }, 1500);

            }, 300);
        } /**/

        $(window).resize(function() {
            resizeVideo();
        });

        ///// iPad exceptions
        var is_touch_device=function() {
            return !!('ontouchstart' in window);
        };

        // if is a touch device, skip video entirley
        if(is_touch_device()){
            videoComplete();
        }

    }


//grab webspecial link from nav if there is one, add to new webspecial link
    if ($('#viewWebspecialBtn').length>0){
        var vehicle = $('body').attr('id');
        var curVehicleData = $("#"+vehicle+"-subnav");
        var webspecLink = curVehicleData.find('.link1').attr("href");
        if(!webspecLink){$('#viewWebspecialBtn').remove();}	//fail-safe, remove link if it aint got no url	
        $("#viewWebspecialBtn").find('a').attr("href",webspecLink);
    }

    $('#tab-global-selector').die().appendTo('#getQuoteBtn').attr("id","tab-global-selectorNEW");
    $('#tab-global-selectorNEW li').each(function(){
        var $this = $(this)
        //$this.append('<img class="quoteMenu_liBg" src="img/vehicles/visualizer/ui/quoteMenu_liBg.png"/><img class="quoteMenu_arrow" src="img/vehicles/visualizer/ui/getQuoteMenu_arrow.png"/>');
        $this.append('<img class="quoteMenu_arrow" src="img/vehicles/visualizer/ui/getQuoteMenu_arrow.png"/>');
        $this.find(".quoteMenu_liBg").fadeOut();
        $this.find(".quoteMenu_arrow").css({opacity:'0.0'});
        $this.click(function(){
            var urlGoTo = $this.find("a").attr("href");
            window.open(urlGoTo, '', '');
            return false;
        });
    });

    var getQuotBtn = $('#getQuoteBtn >span');
    var getQuoteBtn_over = $('#getQuoteBtn_over');

    /*
     getQuotBtn.hover(function(){
     $('#left-nav').fadeOut();
     getQuotBtn.parent().find("#getQuoteInner, span").stop().animate({opacity:"0.0"}, 350, "easeInOutQuart");
     getQuoteBtn_over.stop().animate({left:"0px"}, 350, "easeInOutQuart");
     getQuoteBtn_over.find('span').stop().animate({width:"100%"}, 350, "easeInOutQuart");
     getQuotBtn.parent().find("#tab-global-selectorNEW").stop().delay(50).animate({left:"0px"}, 350, "easeInOutQuart");
     }, function(){
     getQuoteBtn_over.find('span').stop().animate({width:"0%"}, 350, "easeInOutQuart");	
     getQuoteBtn_over.stop().animate({left:"-400px"}, 350, "easeInOutQuart");	
     getQuotBtn.find("#getQuoteInner, span").stop().animate({opacity:"1.0"}, 350, "easeInOutQuart");
     getQuotBtn.find("#tab-global-selectorNEW").stop().animate({left:"-400px"}, 250, "easeInOutQuart", function(){
     $('#left-nav').fadeIn();  
     });
     });*/

    getQuotBtn.mouseenter(function() {
        $('#left-nav').fadeOut();
        getQuotBtn.parent().find("#getQuoteInner, span").stop().animate({opacity:"0.0"}, 350, "easeInOutQuart");
        getQuoteBtn_over.stop().animate({left:"0px"}, 350, "easeInOutQuart");
        getQuoteBtn_over.find('span').stop().animate({width:"100%"}, 350, "easeInOutQuart");
        getQuotBtn.parent().find("#tab-global-selectorNEW").stop().delay(50).animate({left:"0px"}, 350, "easeInOutQuart");
    });

    $('#getQuoteBtn').mouseleave(function() {
        closeQuotes()
    });

    $('#getQuoteOuter, #getQuoteIner').mouseenter(function() {
        closeQuotes();
    });


    function closeQuotes(){
        getQuoteBtn_over.find('span').stop().animate({width:"0%"}, 350, "easeInOutQuart");
        getQuoteBtn_over.stop().animate({left:"-400px"}, 350, "easeInOutQuart");
        getQuotBtn.parent().find("#getQuoteInner, span").stop().animate({opacity:"1.0"}, 350, "easeInOutQuart");
        getQuotBtn.parent().find("#tab-global-selectorNEW").stop().animate({left:"-400px"}, 250, "easeInOutQuart", function(){
            $('#left-nav').fadeIn();
        });
    }


    $('#tab-global-selectorNEW li').hover(function(){
        $(this).find(".quoteMenu_liBg").stop().fadeIn();
        $(this).find("a").stop().animate({color:'#fff'});
        $(this).find(".quoteMenu_arrow").animate({marginRight:'0%', opacity:'1.0'}, 400, "easeInOutQuad");
    }, function(){
        $(this).find(".quoteMenu_arrow").animate({opacity:'0.0', marginRight:'50%'}, 300, "easeInOutQuad");
        $(this).find("a").animate({color:'#ccc'});
        $(this).find(".quoteMenu_liBg").fadeOut();
    });

    var forBlur = $('.section, #left-nav, #misc-outer, .breadcrumb-outer, #getQuoteBtn, .page-title, #extSwitchBtn');

    $('#viewEditionsBtn').click(function(){
        $('#editionsModal').animate({left:'0%'}, 500, "easeInOutQuad");
        $('#editionsModal_bg').css({opacity:'0.0', display:'block'}).delay(150).animate({opacity:'1.0'}, 500, function(){
            //forBlur.addClass("blur");
        });

    });


    $('#editionsCloseBtn').click(function(){
        $('#editionsModal').animate({left:'100%'}, 500, "easeInOutQuad");
        //forBlur.removeClass("blur");
        $('#editionsModal_bg').animate({opacity:'0.0'}, 500, function(){
            $('#editionsModal_bg').css({display:'none'});
        });
    });


})(jQuery);

//// end intro video.js ///////
///// start videomodal.js /////
/*global $, console, log */

//handles the video modal. requires plugin: video.js
//set on top
$('#video_overlay').prependTo('body');

if($('#video_overlay').length > 0){
    //initialize plugin
    videojs.options.flash.swf = "video-js.swf";
    var vidPlayer = videojs("video_player").ready(function(){
        myPlayer = this;
    });
}


window.animateIn_homeUI =  function animateIn_homeUI(){
    pageBlockOn();
    var numLiHome = $('.flex-active-slide ul li').length;
    $('.flex-active-slide ul li:lt('+numLiHome+')').each(function(){
        $(this).css({opacity:'0.0', marginTop:'-10px'});
    });

    setTimeout(function(){
        $('.item1').animate({marginTop:'0px'}, 1600, 'easeInOutBack');
        $('.item2').delay(100).animate({marginTop:'0px'}, 1600, 'easeInOutBack');
        $('.item3').delay(200).animate({marginTop:'0px'}, 1600, 'easeInOutBack');
        $('.flex-direction-nav a').delay(3000).animate({opacity:'1.0'}, 2000);

        $('#home .copy-outer').delay(3000).animate({opacity:'1.0'}, 2500, function(){

        });


        setTimeout(function(){
            pageBlockOff();
        }, 2000);


        setTimeout(function(){
            var del = 0;
            $('.flex-active-slide ul li:lt('+numLiHome+')').each(function(){
                $(this).delay(del).animate({marginTop:'0px', opacity:'1.0'}, 500);
                del += 500;
            });
        }, 3600);

        if(homeSoundOn){
            setTimeout(function(){$("#homeSound").jPlayer("play"); }, 1450);
        }

        setTimeout(function(){

            /*$activeMenuHighlight_vehicle.css({opacity:'0.0', left:'20%'}).animate({opacity:'1.0', left:'80%'}, 1500);
             $activeMenuHighlight_vehicle_img.delay(750).animate({opacity:'0.0'}, 500, function(){
             $(this).css({opacity:'1.0'});
             $activeMenuHighlight_vehicle.css({opacity:'1.0', left:'-100px'});
             });*/

            var numLi = $('#vehicleClassMenu li').length;
            var delay = 0;
            var delay2 = 150;
            /*
             $('#vehicleClassMenu li:lt('+numLi+')').each(function(){ 
             $(this).delay(delay).animate({color:'rgb(255, 0, 0)'}, 100, function(){
             //$(this).find('img').css({display:'block'});
             });							   
             delay += 35;
             });
             $('#vehicleClassMenu li:lt('+numLi+')').each(function(){ 
             $(this).delay(delay2).animate({color:'rgb(0, 0, 0)'}, 80, function(){
             //$(this).find('img').css({display:'none'});
             });							   
             delay2 += 25;
             });	
             */


        }, 1500);

    }, 300);
} /**/


$(window).bind("initialize", function(){//FIX: E.HANDLER 	
    $(document).on('click', '.vid_link',function(e) {//FIX: E.HANDLER //FIX: class to ID
        //
        var mp4 = $(this).attr('data-mp4');
        var ogg =  $(this).attr('data-ogg');
        //domainURL
        openVideo(mp4, ogg);
        //
        e.preventDefault();
    });

    $('#vid_close').click(function(e) {//FIX: class to ID
        closeVideo();
        e.preventDefault();
    });

    $('#vid_expand').click(function(e) {//FIX: E.HANDLER
        vidPlayer.requestFullScreen();
        e.preventDefault();
    });

});

openVideo = function(mp4, ogg){
    //create full path including domain name
    var mp4_path = domainURL+'/'+mp4;
    var ogg_path = domainURL+'/'+ogg;
    log('mp4_path: '+ mp4_path);
    //change source of video plugin
    vidPlayer.src([
        { type: "video/mp4", src: mp4_path},
        { type: "video/ogg", src: ogg_path }
    ]);
    //
    setTimeout(function(){
        //timeout fixes a bug, then play
        vidPlayer.play();
    }, 100);

    $('#video_overlay').fadeIn(function(){

    });
};

function closeVideo(){
    vidPlayer.pause();
    $('#video_overlay').fadeOut();
}
///// end videomodal.js /////


//price list rollover
$("#pricelist-copy-block").find("li a").hover(function(){
    $(this).find("img.off").stop().animate({opacity:0});
    $(this).find("img.on").stop().animate({opacity:1});
}, function(){
    $(this).find("img.on").stop().animate({opacity:0});
    $(this).find("img.off").stop().animate({opacity:1});
});

$("#tab-global-selector a").click(function(e){
    e.preventDefault();
    $this = $(this);
    //alert($this.html());
    window.open($this.attr("href"));
});


var pageBlockAbility = true;
if(pageBlockAbility){
    $('<div id="pageBlockerOuter"><img src="img/transparent_1x1.gif"/></div>').appendTo('body');

    function pageBlockOn(){
        $('#pageBlockerOuter').css({'display': 'block'});
    }
    function pageBlockOff(){
        $('#pageBlockerOuter').css({'display': 'none'});
    }
}

//this is WIP, not finished
highlightHeaders = false;
if(highlightHeaders){
    $('<style type="text/css">.whiteTextOverride {color: #fff !important; white-space: nowrap; position: absolute; left:-14%;} .darkTextOverride {color: #888 !important; white-space: nowrap; position: absolute; left:-14%;}</style>').appendTo($('head'));
    var headerHolder = $('#landing-detail');
    var headerOrig = headerHolder.find('h1');
    var headerText = headerOrig.text();
    var headerColor = headerHolder.attr('class');
    if(headerColor== 'copy-white'){ var highlightColor = 'darkTextOverride'}
    else{var highlightColor = 'whiteTextOverride'}

    //headerOrig.clone().insertBefore(headerOrig).css({position:'absolute', zIndex:'900'}).addClass(highlightColor);
    $('<div id="highlighter" class="skewOuter"><h1><span class="'+highlightColor+' skewInner">'+headerText+'</span></h1></div>').insertBefore(headerOrig).css({position:'absolute', zIndex:'900', opacity:'0.0', height: '100%', width:'80px', overflow:'hidden'});


    setTimeout(function(){
        $('#highlighter').css({opacity: '0.85'});
        $('#highlighter').animate({marginLeft: '300px'}, 750);
        $('.darkTextOverride, .whiteTextOverride').animate({marginLeft: '-300px'}, 750);
    }, 1500);/**/

}

// revers su bottom navs
function reverseSubNavs(){
    if(lang == 'ara'){

        var list = $("#"+section+"-section").find('.bottom-nav').find('.inner').find('ul');
        if(!list.hasClass('reversed')){
            list.addClass('reversed');
            var listItems = list.children('li');
            list.append(listItems.get().reverse());
            //now chagne just first and last
            list.find('li').eq(0).find('img').attr('src','img/botsubnav_left.png');
            list.find('li').last().find('img').attr('src','img/botsubnav_right.png');
        }
    }
}
reverseSubNavs();




//roadblock!!
//////////////////////////////////////////////////////////////////////////////////////////////

var roadblockSelection;
$(document).on('click', '.close-roadblock, .roadblock', function(e) {
    e.preventDefault();
    //set cookie, expires 30 days
    $.cookie('roadblock-pl', 'true', { expires: 30});
    //remove roadbloack
    /*$('.roadblock').fadeOut(function(){
     $(this).remove();
     });*/
    roadblockSelection = 'declined';
    closeOutRoadblock();
});






$(document).on('click', '.roadblock-yes', function(e) {
    $.cookie('roadblock-pl', 'true', { expires: 30});
    roadblockSelection = 'accepted';
    // alert('clicked');
    // console.log('got click: '+$(this).attr('data-url')+ ' first pass');
    // closeOutRoadblock();  

    closeOutRoadblock();

});




//faking link for emmission statement
$(document).on('click', '.blankSelectLink', function(e) {
    e.stopPropagation();
    window.open($('.HiddenLink2016').find('p').find('a').attr('href'));
});

$(document).on('click', '.roadblock-inner', function(e) {
    e.stopPropagation();
});

var closeOutRoadblock = function(url){
    // alert(roadblockSelection,'closing...'); 
    //need to track selection and A/B viewed
    $.cookie('roadblock-pl', 'true', { expires: 30});
    var convertAB;
    var randoAB = $('.pl2016').attr('data-rb');
    var lang = $('.pl2016').attr('data-lang');
    if (randoAB=='roadblock_pl2016-B') {
        convertAB = 'people version (B)';
    }
    else{
        convertAB = 'vehicle version (A)';
    }


    $('.roadblock').fadeOut(function(){

        //if accepted link (yes)- load PL URL since this is after tracking has captured
        /*if (url) {
         console.log('should now launch link: '+url+' ?');
         window.open(url);
         };*/
        /*if (roadblockSelection=="accepted") {
         document.getElementById('theLink').click();
         };*/
        $(this).remove();
    });
    // console.log("Roadblock 2016 PL > A/B: "+convertAB+" > action: "+roadblockSelection);
    trackEvent("Roadblock 2016 PL > A/B: "+convertAB+" > action: "+roadblockSelection+" > Language: "+lang);
}



//if needed, to keep updated pl roadblock separate in case cookies conflict with TW or w/e
/*$(document).on('click', '.plRB_2016', function(e) {
 e.preventDefault();
 //set cookie, expires 30 days
 $.cookie('roadblock-pl2016', 'true', { expires: 30});
 //remove roadbloack
 $('.roadblock').fadeOut(function(){
 $(this).remove();
 })
 });*/


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////










