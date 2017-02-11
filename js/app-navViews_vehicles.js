

(function ($) {
    'use strict';



    app.AppView_vehicleNav = Backbone.View.extend({

        //el: 'body', can attach to an actual element, or if undeclared backbone will create a temp obj

        initialize: function (){
            var self = this;

            app.langToSwap = $('body').attr('data-lang'); //this is now global and can be used anywhere, like as a var in pulling data into models and collections

            app.pageCheck = $('body').attr('data-template'); //for use below when cheching if on vehicle-specific page
            $('#extendedNav').remove();
            self.render();
        },

        render: function(){
            app.greenList_class = [];
            $('body').append("<img src='img/vehicles/nav_models/line_placeholder.png' style='display:none'>")
            app.AllVehicClasses = new app.VehicClasses();

            app.AllVehicDeets = new app.VehicDeetsExpanded();
            app.AllVehicDeets.fetch({
                success: function(response) {
                    app.vehicleNavInfo = new app.vehicleNavData();
                    //something like this could be used to dynamically build the main vehicle menu minus blacListed models
                    var deets = app.AllVehicDeets.toJSON();
                    var pluckedLinks = _.pluck(deets, 'linksBottom') //pluck only linksBottom from nested array
                    app.LinksBottom = _.flatten(pluckedLinks) //bust out of nested array
                    //gather class id's for preloading images
                    var allDeets = response.toJSON();
                    var ids = _.pluck(allDeets, 'id');
                    preload(ids);
                    //
                    app.blacList = []
                    $.each( app.LinksBottom, function( index, value ){
                        //
                        var _this = this;
                        if (value.noLandingPage) {
                            //app.blacList=(_this.id); 
                            app.blacList.push(_this.id);
                            //console.log(value)
                            console.log('blacListed from build: '+app.blacList )
                        }else{
                            //if we need to collect all CO2 info from all over the place for use in new nav details
                            app.greenList_class.push(_this.id); //also just generate list of available vehicles for sitemap
                            // app.greenList_title.push(_this.text); //also just generate list of available vehicles for sitemap 
                        }
                    })

                    //push c02 data into each vehile object
                    app.c02 = new app.C02();
                    app.c02.fetch({
                        success: function(response) {
                            //log("C02");
                            //log(response.toJSON());
                            app.co2Array = response.toJSON();
                            //
                            _.each(app.LinksBottom,function(e,i){
                                //
                                //
                                var x =  _.findWhere(app.co2Array, {id: e.id});
                                var x2 = "";
                                if (typeof x != "undefined") {
                                    x2 = x.co2;
                                }
                                //log("x2: "+ x2)
                                e.co2 ="";
                                if(x2 && typeof x != "undefined"){
                                    var s = x2.split('<br/>');
                                    var _minusTitle = s[1]+'<br/>'+s[2];
                                    e.co2 = _minusTitle;
                                    e.co2 = e.co2.replace(/\u00a0/g, " ");
                                    //e.co2 = e.co2.replace("| ", "<br/>");
                                    e.co2Arr = e.co2.split("<br/>")
                                    //log(e.co2Arr[0]);
                                }
                            });
                            //
                            new app.navView_mainVehicles();
                            //
                        },
                        error: function(response) {
                            log("fetch error: "+ response);
                        }
                    });


                },
                error: function(){
                    //console.log('There was some error in loading and processing the JSON file');
                }
            });

            //doResize_vehicNav();

        }

    });


// the top level main vehicle nav by class 'app.navView_mainVehicles' 
    //  
    ////////////////////////////////////////////////////////////////////// 

    //vars
    app.extNavOpen = false;
    app.justOpen = false;
    var $topNav = $('#top-nav');
    var $topNav_ul = $topNav.find('#vehicleClassMenu');
    var $activeMenuHighlight_vehicle = $('#activeMenuHighlight_vehicle');
    var $vehicleMenuHighlight_middle = $('#vehicleMenuHighlight_middle');
    var $vehicleMenuHighlight_right = $('#vehicleMenuHighlight_right');
    app.thisVehicClass = $('body').attr('data-class')
    //init 

    app.navView_mainVehicles = Backbone.View.extend({

        el: '#top-nav',

        events: {
            'mouseover #veh-nav-container': 'classNav_hoverOn',
            'mouseleave #veh-nav-container': 'classNav_hoverOff',
            'mouseenter .vehicClass_navItem': 'classLinks_hoverOn',
            'mouseleave .vehicClass_navItem': 'classLinks_hoverOff'

        },

        initialize: function (){
            var self = this;
            this.collection = app.AllVehicClasses;
            this.eventAggregator.on("seekToLink", this.seekToLink);

            this.collection.fetch().done(function(){
                self.render();
                self.mainArr = app.AllVehicClasses.toJSON();
                appendAccel();
                //
                //log(self.mainArr);
            });
            //
            //get all class name id's   
        },
        render: function(){
            var vehicleClasses = this.collection.models;
            //build main vehicle class header
            _.each(vehicleClasses, function (modelEach) {
                var attr = modelEach.get('class');
                var typeCount = modelEach.get('bodyTypes').length;
                //determine if class gets borken down by bodyTypes
                //var bodyTypes = modelEach.get('bodyTypes');
                var bodyTypes = '';
                var typeKeys = '';
                //var allClass = _.pluck(modelEach.get('bodyTypes'), 'id');
                //log('allClacc')
                //log(allClass)
                bodyTypes = _.pluck(modelEach.get('bodyTypes'), 'typeTitle');
                typeKeys = _.pluck(modelEach.get('bodyTypes'), 'type');

                $('<li id="'+attr+'" class="vehicClass_navItem" data-types="'+bodyTypes+'" data-keys="'+typeKeys+'">'+attr+'</li>').appendTo($topNav_ul);
            });/**/

            if(app.thisVehicClass){
                $("#"+app.thisVehicClass).addClass('activeClass').animate({color:'#f00'});
            }
            //see if current page is a vehicle specific page to auto-highlight class nav

            setTimeout(function(){
                app.vehiclePageInfo.set('vehicleInfoLoaded', true);
            }, 500);


            Backbone.View.prototype.eventAggregator.trigger("seekToLink");
        },
        seekToLink: function(id){
            var _this
            if(app.thisVehicClass || id){
                if(id){
                    _this = eval('$("#'+id+'")');
                }else{
                    _this = eval('$("#'+app.thisVehicClass+'")');
                }

                //$topNav_ul.find('li').stop().animate({color:'#000'}).removeClass('activeClass'); //unHighlight previous
                setTimeout(function(){
                    //once styled, this will move active class highlight to selected topNav class
                    var offset = ($(window).width() *.01)-15
                    var leftOffset = (_this.offset().left +offset);
                    //var leftoffset_percentage = ((leftOffset*100)/$(window).width());
                    var oSet = -9;
                    if ($isTablet) {
                        oSet = 0;
                        //leftoffset_percentage = leftoffset_percentage -2;
                    }
                    var linkWidth = _this.width()+ oSet;
                    //log("linkWidth: "+linkWidth)

                    $activeMenuHighlight_vehicle.stop().animate({left:leftOffset, height:'76px', opacity:1},300);
                    $vehicleMenuHighlight_right.stop().animate({left:linkWidth},300);

                }, 50);
            }else{
                $activeMenuHighlight_vehicle.stop().animate({opacity:0})
            }

        },
        classLinks_hoverOn:function(ev){
            var _this = $(ev.currentTarget);
            var id = _this.attr('id')
            if (!_this.hasClass('activeClass')) {
                _this.stop().animate({color:'#f00'});
            }
            //
            //log(this.mainArr)
            var ob = _.findWhere(this.mainArr, {class:id});
            //log(ob);
            app.classNav.render(ob)
            app.classNav.hideHilite();
            app.modelNav.close();
            this.seekToLink(id);
        },
        classLinks_hoverOff:function(ev){
            //log('off')
            var _this = $(ev.currentTarget);
            if (!_this.hasClass('activeClass')) {
                var col = '#000'
                if($('#veh-nav-container').hasClass("nav2016")){
                    col ='#FFF'
                }
                _this.stop().animate({color:col});
            }
        },
        classNav_hoverOn: function(ev){
            var _this = $(ev.currentTarget);
            if($(ev.target).attr('id') != "vehicleClassMenu"){


                //log("c: "+ $(ev.target).attr('id'));
                app.classNav.open();
                $('#top-nav-cover').fadeIn();
                var h = 81;
                if($isTablet){
                    h = 63
                }
                if(!$('#veh-nav-container').hasClass("nav2016")){
                    $('#vehicleClassMenu, #vehicleClassMenu-outer').height(h);
                }
            }
        },

        classNav_hoverOff: function(ev){
            var _this = $(ev.currentTarget);
            app.classNav.close();

            $('#top-nav-cover').fadeOut();
            if(!$('#veh-nav-container').hasClass("nav2016")){
                $('#vehicleClassMenu, #vehicleClassMenu-outer').delay(300).animate({height:50},50)
            }
            this.seekToLink();
        }

    });

    app.ClassNav = Backbone.View.extend({
        el: '#veh-nav-class',
        events: {
            'mouseenter li':"openModelNav"
        },
        initialize:function(){
            //this.$el.append("<ul id='class-list'></ul><img src='img/class_nav_bg.png' id='class-nav-bg'>");
            this.$el.append("<ul id='class-list'></ul><div id='class-nav-bg'><img src='img/class_nav_left.png' class='left'><img src='img/class_nav_right.png' class='right'></div>");
            this.$classList = this.$el.find('#class-list');
            this.$hilite = this.$el.find('#class-nav-bg');
        },
        render:function(ob){
            var str = '';
            _.each(ob.bodyTypes, function(item, index) {
                var nobr = '';
                if(item.nobreak){
                    nobr = 'nobreak';
                }
                if (typeof(item.useModelYear) != "undefined"){
                    str += '<li data-models="'+item.models+'" class="'+nobr+'"><img src="img/vehicles/overview/'+item.id+'_'+item.useModelYear+'.png"><h5>'+item.typeTitle+'</h5></li>';
                }else{
                    str += '<li data-models="'+item.models+'" class="'+nobr+'"><img src="img/vehicles/overview/'+item.id+'.png"><h5>'+item.typeTitle+'</h5></li>';
                }
            });
            this.$classList.css({opacity:0}).stop().animate({opacity:1}, 550)
            this.$classList.html(str);
        },
        openModelNav:function(e){
            var w = $(e.currentTarget).width();
            $('#class-nav-bg').width(w);
            var models = $(e.currentTarget).attr('data-models');
            app.modelNav.render(models);
            var x = $(e.currentTarget).position().left;
            this.$hilite.stop().animate({'left':x-10, opacity:1},300);
            //
            this.$el.find('li').animate({opacity:.3}, 300);
            $(e.currentTarget).stop().animate({opacity:1},300);
        },
        hideHilite:function(){
            this.$hilite.animate({opacity:0},200)
        },
        open:function(){
            this.$el.stop().animate({height:80},250);
        },
        close:function(){
            this.$el.stop().animate({height:0},250);
            app.modelNav.close()
        }

    });

    app.ModelNav = Backbone.View.extend({
        el: '#veh-nav-model',
        initialize:function(){
            this.isOpen = false;
            this.template = _.template($('#nav-model-template').html());
            if ($isTablet || lang == 'ara' || lang == 'rus') {
                this.template = _.template($('#nav-model-template-tablet').html());
            }
            // TweenMax.set(this.$el,{x:30, y:-90})
        },
        render:function(models){
            var _this = this;
            var ob;
            var mods = models.split(',');
            //
            this.$el.find('.oldList').fadeOut(function(){
                $(this).remove()
            })
            this.$el.append("<ul class='model-list new-list'></ul>");
            this.$modelList = this.$el.find('.new-list');
            //this.$modelList.css({opacity:0}).animate({opacity:1},250)


            _.each(mods, function(item, index) {
                //log("item: "+ item);
                ob = _.findWhere(app.LinksBottom, {id:item});
                ob.onlyExplore = "";
                ob.onlySpecial = "";
                if(!ob.webspecial){
                    ob.onlyExplore = "onlyLander";
                }
                if(ob.noLandingPage){
                    ob.onlySpecial = "onlySpecial";
                }
                log("++++++++++++++++++++++");
                //log(ob);
                _this.$modelList.append(_this.template(ob));
                //app.LinksBottom
            });

            //stagger on
            TweenMax.set(this.$modelList.find(".model-item"),{x:30, y:-80, opacity:0})
            TweenMax.staggerTo(this.$modelList.find(".model-item"), 0.4, {x:0, y:0, opacity:1}, 0.08);


            this.$modelList.addClass('oldList').removeClass('new-list');
            this.open();
            //fade in vehicle images after loaded
            $('.model-img').each(function(index, el) {
                var $that = $(this);
                $(this).imagesLoaded(function() {
                    $that.stop().animate({'opacity':1},300);
                });
            });



        },
        clearModels:function(){

        },
        open:function(){
            this.isOpen = true;
            this.$el.stop().animate({height:380},250);
            TweenMax.set(this.$el,{x:0, y:0})
        },
        close:function(){
            var _this = this;

            if(this.isOpen){
                TweenMax.to(this.$el,.25,{x:30, y:-80})
                this.$el.stop().animate({height:0},250,function(){
                    _this.$modelList.remove();
                });
            }
            this.isOpen = false;
        }
    });


    app.classNav = new app.ClassNav()
    app.modelNav = new app.ModelNav()

    $('#top-nav-cover').click(function(e) {
        $('#veh-nav-container').trigger('mouseleave');
    });

    /*****************************************************************************************************/
//Remove splashLoad div after page elements have loaded, perform any other functions as page displays
    /***************************************************************************************************/

    $(window).load(function () {
        doResize_vehicNav();
    });

    function doResize_vehicNav() {
        var frameHeight = $window.height();
        var frameWidth = $window.width();
        var screenRatio = (frameWidth/frameHeight).toFixed(2);

        //nav needs different styling for more 4x3 ratios, like iPad landscape.
        if(screenRatio<1.77){
            $('body').addClass('taller');
        }else{
            $('body').removeClass('taller');
        }


        var $activeNavClass = $('#vehicleClassMenu').find('.activeClass');

        if ($activeNavClass.length>0) {
            setTimeout(function(){
                Backbone.View.prototype.eventAggregator.trigger("seekToLink");
            }, 500);
        };

        //scroll_reInit();

    }

    $(window).resize(function() {
        //setTimeout(function(){
        doResize_vehicNav();
        //}, 50); //small timeout helps ie keep up
    });


//helper
    function appendAccel(){
        var accel = app.vehicleOverviewData.accel;
        _.each(app.LinksBottom,function(e,i){
            e.accel = accel +" "+e.accel;
            e.exploreTitle = app.vehicleOverviewData.explore;
            e.webspecialTitle = app.vehicleOverviewData.webspecial;
            e.url = e.id+".php?lang=" + app.langToSwap;
        });
    }

    function preload(sources){
        var images = [];
        for (var i = 0, length = sources.length; i < length; ++i) {
            images[i] = new Image();
            images[i].src = "img/vehicles/overview/"+sources[i]+".png";
        }
    }



})(jQuery);