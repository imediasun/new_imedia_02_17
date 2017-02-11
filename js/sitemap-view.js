(function ($) {
    'use strict';

    //vars
    app.sitemapOpen = false;
    app.langSet = $('body').attr('data-lang');


    // Interior Visualizer View 'app.interiorView' 
    // this will call to another view that handles just the visualizer part
    ////////////////////////////////////////////////////////////////////// 

    //vars 
    var $sitemapContainer = $('#sitemapContainer');
    var $closeSitemapBtn = $('#closeSitemapBtn');
    var $sitemapTitle = $('#sitemapTitle');
    var $smBG_darken = $('#smBG_darken');

    //init
    $closeSitemapBtn.css({opacity:'0.5'});
    $smBG_darken.css({opacity:'0.0', display:'none'});

    app.sitemapView = Backbone.View.extend({

        el: $sitemapContainer,

        events: {
            'click #closeSitemapBtn': 'closeSitemap',
            'mouseenter a': 'smLinks_hoverOn',
            'mouseleave a': 'smLinks_hoverOff',
            'mouseenter #closeSitemapBtn': 'smClose_hoverOn',
            'mouseleave #closeSitemapBtn': 'smClose_hoverOff'
        },

        initialize: function (){
            var _this = this;

            this.collection = new app.siteMapData(); //pass in id to collection
            this.collection.on("reset", this.render, this); //listen when data is received in collection, then render
            this.collection.fetch({reset:true});


            //since btn isn't within actual view, set old-school trigger
            $('#sitemapBtn').click(function(){
                if (!app.sitemapOpen) {
                    _this.launchSitemap();
                }else{
                    _this.closeSitemap();
                }
            });

            //same for darken bg element
            $('#smBG_darken').click(function(){
                _this.closeSitemap();
            });
        },

        render: function(){
            //console.log(app.siteMapAll)    	
            var _this = this;
            var _lang = '?lang='+app.langSet;

            // stringify for easy access to flat data
            var _sitemapData = JSON.stringify(app.siteMapAll);

            var _pluckedSM_title = _.pluck(app.siteMapAll, 'sitemapTitle');
            $sitemapTitle.html(app.smTitle);


            var linkArr = []; // set/reset blank array

            _.each(app.smLinks,function(e, i){

                var _thisSection = e.section;

                //build related link lists per section
                _.each(e.links,function(e, i){

                    if (e.url.indexOf('?') === -1 && e.url !== '*autoFill' && e.url !== '*engines') {
                        //there is no ? already
                        var $urlFix = e.url+_lang
                    }else{
                        var $urlFix = e.url.replace('?', _lang+'&')
                    }


                    if (e.title=='*autoFill') {
                        //leave blank for now, function below will fill it in
                        //console.log('_thisSection: '+_thisSection)
                        app.sm_vehicle = _thisSection.toLowerCase();
                    }else{
                        if (e.specialCase=="*engines") { //give engine list case padding on top
                            linkArr.push('<a class="engineBuffer" href="'+$urlFix+'">'+e.title+'</a>')
                        }else{
                            linkArr.push('<a href="'+$urlFix+'">'+e.title+'</a>')
                            //console.log('also: '+e.title)
                        }
                    }
                })/**/

                //for each link, grab name and creat li
                $('#sm_allList').append('<li id="'+(e.section).toLowerCase()+'_sm" style="width:'+e.liWidth+'%"><h2>'+e.section+'</h2>'+linkArr.join("")+'</li>');
                linkArr = []
            });


            function checkVehicData(){
                if (app.greenList_class) {
                    //this needs to append to 'vehicle' sitemap links
                    _this.appendActiveVehiclePages()
                }else{

                    setTimeout(function(){
                        checkVehicData()
                    }, 250);

                }
            }
            checkVehicData()

        },

        launchSitemap: function(){
            //slide on sitemap
            app.sitemapOpen = true;
            $sitemapContainer.stop().animate({bottom:'80px'}, 750, "easeInOutQuad");
            $smBG_darken.css({display:'block'}).stop().delay(350).animate({opacity:'0.65'}, 500);
        },

        closeSitemap: function(){
            //close sitemap
            app.sitemapOpen = false;
            $sitemapContainer.stop().animate({bottom:'-100%'}, 450, "easeInCirc");
            $smBG_darken.stop().delay(150).animate({opacity:'0.0'}, function(){
                $smBG_darken.css({display:'none'});
            });
        },

        appendActiveVehiclePages: function(){
            var vehicAutoArr = [];
            //var _lang = '?lang='+app.langSet;
            var listGen = $('#smVehicleHolder');
            //console.log(listGen)
            // console.log(app.AllVehicDeets) 



            // app.AllVehicClasses = new app.VehicClasses();
            app.AllVehicDeets_SM = new app.VehicDeetsExpanded();
            app.AllVehicDeets_SM.fetch({
                success: function(response) {

                    var vehicleNavInfo = new app.vehicleNavData();
                    var deets = app.AllVehicDeets_SM.toJSON();
                    var pluckedLinks = _.pluck(deets, 'linksBottom') //pluck only linksBottom from nested array
                    var LinksBottom = _.flatten(pluckedLinks) //bust out of nested array


                    $.each( LinksBottom, function( index, value ){
                        var _this = this;

                        // console.log(value.modelTitle,value.noLandingPage)

                        // if (value.noLandingPage && value.webspecial=="") { 
                        if (value.noLandingPage) { //
                            // //app.blacList=(_this.id);   
                            // console.log('blacListed from build: '+app.blacList)
                        }else{

                            //if using only specified vehicle name in data (as appears on vehicle page and nav)
                            /*$('#'+app.sm_vehicle+'_sm').append('<a href="'+_this.id+'.php?lang='+app.langToSwap+'">'+_this.modelTitle+'</a>')*///also just generate list of available vehicles for sitemap 


                            //need to use new naming field in ENG and DEU only first
                            if (app.langToSwap == 'eng' || app.langToSwap == 'deu' || app.langToSwap == 'rus' || app.langToSwap == 'ita' || app.langToSwap == 'nld' || app.langToSwap == 'kor') {
                                $('#'+app.sm_vehicle+'_sm').append('<a href="'+_this.id+'.php?lang='+app.langToSwap+'">'+_this.siteMapTitle+'</a>');
                            }else{
                                $('#'+app.sm_vehicle+'_sm').append('<a href="'+_this.id+'.php?lang='+app.langToSwap+'">'+_this.modelTitle+'</a>');
                            }


                            //if wanting to append vehicle type designation to names (for differentiation in list)
                            //only for certain designations
                            /*if (_this.typeKey==="sedan" || _this.typeKey==="coupe") {
                             $('#'+app.sm_vehicle+'_sm').append('<a href="'+_this.id+'.php?lang='+app.langToSwap+'">'+_this.modelTitle+'  <span style="color:#868282; vertical-align:middle; font-size:9px;">('+_this.typeKey+')</span></a>');
                             }else{
                             $('#'+app.sm_vehicle+'_sm').append('<a href="'+_this.id+'.php?lang='+app.langToSwap+'">'+_this.modelTitle+'</a>')
                             }*/



                            //console.log(_this);         
                        }

                    });

                    scroll_reInit();
                    $(window).resize();
                },
                error: function(){
                    //console.log('There was some error in loading and processing the JSON file');
                }
            });




            // $('#'+app.sm_vehicle+'_sm').append(listGen);
            // $(window).resize();
        },

        smLinks_hoverOn: function(e){
            var _this = $(e.currentTarget);
            _this.stop().animate({color:'#222', marginLeft:'5px'}, 200);
        },

        smLinks_hoverOff: function(e){
            var _this = $(e.currentTarget);
            _this.stop().animate({color:'#666', marginLeft:'0px'}, 400);
        },

        smClose_hoverOn: function(e){
            var _this = $(e.currentTarget);
            _this.stop().animate({opacity:'1.0'});
        },

        smClose_hoverOff: function(e){
            var _this = $(e.currentTarget);
            _this.stop().animate({opacity:'0.5'});
        }

    });

    //triggered after page loads data in 'app.AppView'
    new app.sitemapView();





})(jQuery);