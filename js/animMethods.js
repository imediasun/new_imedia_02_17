// Functions for pulling off animated img sequences
//If preLoading animation frames
var preload_animImgs = ["exampleFolder"];
var preLoadOn = false;



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





function runLoop($el, $bgWidth, duration, frameRate, dir){

    var frameWidth = $el.width();
    var frameHeight = $el.height();
    var frameNum = $bgWidth/frameWidth;
    var rate = duration/frameRate;
    var countFrame = frameNum-1;

    var backgroundPos = $el.css('backgroundPosition').split(" ");
    var xPos = backgroundPos[0],
        yPos = backgroundPos[1];


    /*
     function runStrip() {				
     setInterval(function(){

     if (dir == 'h'){			
     if(countFrame<frameNum) {	
     $el.css({backgroundPosition: -frameWidth*countFrame + "px 0px"});
     }
     else if(countFrame==frameNum) {	
     //run on complete
     }	
     }


     else if (dir == 'v'){
     if(countFrame>-1) {	
     $el.css({backgroundPosition: "0px "+ (-frameWidth*countFrame) + "px"});
     }	
     else if(countFrame==frameNum) {	
     //run on complete
     }	
     }


     countFrame--;

     }, rate);				
     }*/

    // runStrip();

}







function swapImg_anim($el, frameRate, frameCount, direction, pageBlocker, onComplete){

    if (!pageBlocker){ pageBlockOn(); }
    else if (pageBlocker=="yesBlock"){ pageBlockOn(); }
    else if (pageBlocker=="noBlock"){  }

    var animFrame = $el;
    var animFrameFolder = animFrame.attr("id");

    //default params
    var countFrame = 0
    var stepNum = 1
    var paddingTo = 5
    var srcStart = 'img/'+animFrameFolder+'/'
    var srcEnd = '.png'

    if (!direction){ swapImgs_forward(); }
    else if (direction=="forwards"){ swapImgs_forward(); }
    else if (direction=="backwards"){ swapImgs_backwards(); }



    function swapImgs_forward() {
        var countFrame = 0

        function padUp(countFrame, paddingTo) {
            var s = "00000" + countFrame;
            return s.substr(s.length-paddingTo);
        }

        setInterval(function() {

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
            }

            countFrame++;
            stepNum++;

        }, frameRate*stepNum);

    }



    function swapImgs_backwards() {
        frameCount--;

        function padDown(frameCount, paddingTo) {
            var s = "00000" + frameCount;
            return s.substr(s.length-paddingTo);
        }

        setInterval(function() {

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
            }

            frameCount--;
            stepNum--;

        }, frameRate*stepNum);

    }




}


////////////////////////////////////////////////////////////////////////////////////
/////PreLoading animation frames from folders set as array at top of this page/////

if(preLoadOn){

    $('body').prepend('<div id="animFrames_preLoad"></div>').css({position:'fixed', height:'0px', zIndex:'-5', overflow:'hidden'});
    $("<style type='text/css'> #animFrames_preLoad img{ position:absolute;} </style>").appendTo("head");

    $.each(preload_animImgs, function() {

        var folderName = this;
        var folderVar = folderName+'_count';

        //Loads all png's in specified folders
        $.ajax({
            url: "img/"+this+"/",
            success: function(data){
                $(data).find("a:contains(.png)").each(function(){
                    // will loop through 
                    var images = $(this).attr("href");
                    var insertPic_start = '<img src="img/'+folderName+'/'
                    var insertPic_end = '"/>'

                    $(insertPic_start +images+ insertPic_end).appendTo('#animFrames_preLoad');

                });

            }



        });

        //Loads all jpg's in specified folders			
        $.ajax({
            url: "img/"+this+"/",
            success: function(data){
                $(data).find("a:contains(.jpg)").each(function(){
                    // will loop through 
                    var images = $(this).attr("href");
                    var insertPic_start = '<img src="img/'+folderName+'/'
                    var insertPic_end = '"/>'

                    $(insertPic_start +images+ insertPic_end).appendTo('#animFrames_preLoad');

                });

            }

        });


    });
}


////////////////////////////////////////////////////////////////////////////////////