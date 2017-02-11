
(function ($) {
    'use strict';






    //build list of available vehicles models per class from main vehicles overview page
    /////////////////////////////////////////////////////////////////////////////////////

    app.VehicDeetsExpanded = Backbone.Collection.extend({

        model: app.Vehic, //collections need at least a blank model defined in models file (vehicleModels.js in this case) 

        url: function(){ //but we are using dynamic path
            var _this = this;
            return  "data/"+app.langToSwap+"/vehicles/overview.js";
        },

        parse: function(response){

            //app.exploreCTA = response.exploreDeets;
            app.vehicleDeets = response;
            app.exploreCTA = response.explore;
            app.sportsVidCTA = response.sportVidCopy;

            //just faster to get these for overview section now
            app.ui_accel = response.accel;
            app.oneManMessage = response.oneManMessage;
            app.ui_viewWebspecial = response.viewWebspecial;
            app.ui_viewPressRelease = response.viewPressRelease;
            app.ui_getAQuote = response.getAQuote;
            app.ui_brochureLink = response.brochureLink;
            app.ui_downloadBrochure = response.downloadBrochure;
            app.ui_extVis = response.extVis;
            app.ui_packages = response.packages;
            app.ui_intVis = response.intVis;
            app.ui_backToTop = response.backToTop;

            app.ui_customizeText = response.customizeText;
            app.ui_customizeLink = response.customizeLink;

            //app.vehicList_forSM = response.vehicles
            //console.log(app.exploreCTA)

            return response.vehicles;  //reduce nested data to vehicles data only to get just related models per class (for subnav)
        }

    });

    app.C02 = Backbone.Collection.extend({

        model: app.Vehic, //collections need at least a blank model defined in models file (vehicleModels.js in this case) 

        url: function(){ //but we are using dynamic path
            var _this = this;
            return 'includes/veh_co2_proxy.php?lang='+lang;
            //return  "data/"+app.langToSwap+"/vehicles/overview.js";
        },

        parse: function(response){
            //log("GGGGGGGGGGGGGG")
            //log(response);
            return response;
        }

    });

    //this will be initialized in app-vehiclePageView.js once page knows language



    //build list of available vehicles classes from main vehicles overview page
    /////////////////////////////////////////////////////////////////////////////////////

    app.VehicClasses = Backbone.Collection.extend({

        model: app.Vehic,

        url: function(){
            var _this = this;
            return  "data/"+app.langToSwap+"/vehicles/overview.js";
        },

        parse: function(response){
            //console.log(response.vehicleTree)
            app.vehicleOverviewData = response;
            return response.vehicleTree; //reduce nested data to vehicleTree data only to get just classes and related models shorthand 
        },

        filterVehicle: function(vehicle){

            //based on user-selected vehicle class, find associated vehicle models
            var filtered = this.models.filter(function(car) {
                return car.get("class") == vehicle;
            });/**/

            app.selectedVehicleClass = new app.VehicClasses(filtered);

            app.selectedVehicleClass.each(function(el, i){
                //all vehicles for that class                          
                app.searchedClass = el.get('vehicles');
            });

            //remove any blacListed models that have no landing page
            var check_blacList = _.without(app.searchedClass, app.blacList)

            app.vehicSubNav_data = check_blacList; //gets shortHand vehicle model names from vehicleTree, minus blacListed




            app.modelDetailsSelected = [] //blank array for extended model details of selected class

            //re-search based on shorthand model names to find full names
            $.each( app.searchedClass, function( index, value ){
                var indiVehicle  = _.where(app.LinksBottom, {id: value})
                app.modelDetailsSelected.push(indiVehicle);
            });
            app.extendedDeetsSelected = _.flatten(app.modelDetailsSelected) //bust out of nested array
            //log(app.extendedDeetsSelected);

            var pluckedNAMES = _.pluck(app.extendedDeetsSelected, 'text') //pluck only full vehicle names for subnav use

            app.plucked_engine = _.pluck(app.extendedDeetsSelected, 'topSpeed') //associated engine specs
            app.plucked_accel = _.pluck(app.extendedDeetsSelected, 'accel') //associated engine specs
            app.plucked_hp = _.pluck(app.extendedDeetsSelected, 'power') //associated engine specs

            app.plucked_footnote = _.pluck(app.extendedDeetsSelected, 'footnote') //grab footnote if it exists

            app.plucked_webspecial = _.pluck(app.extendedDeetsSelected, 'webspecial') //associated webspecial
            app.plucked_noLandingPage = _.pluck(app.extendedDeetsSelected, 'noLandingPage') //noLandingPage check

            app.plucked_typeKey = _.pluck(app.extendedDeetsSelected, 'typeKey') //associated typeKey for bodyType filtering
            app.plucked_vehicleCaption = _.pluck(app.extendedDeetsSelected, 'vehicleCaption') //associated vehicleCaption for extended nav copy

            app.vehicSubNav_fullNames = pluckedNAMES; //provide global list of current full model names for selected class


            //console.log('vehicles to load: '+app.curVehicClass)
            //Backbone.View.prototype.eventAggregator.trigger("load_extendedNav");
            Backbone.View.prototype.eventAggregator.trigger("animOn_extNav");

        },

        getClassDescriptions: function(vehicleClass){

            app.typeDescArray = [];

            var filtered = this.models.filter(function(car) {
                return car.get("class") == vehicleClass;
            });

            var _thisClass = new app.VehicClasses(filtered);

            _thisClass.each(function(el, i){
                //get main class copy for selected class                  
                app.typeDesc = el.attributes.bodyTypes;
                app.classHeader = el.get('classHeader');
                app.classDescription = el.get('classDescription');
            });


            $.each( app.typeDesc, function( index, value ){
                var thisType = value.type
                var _thisTypeDesc = value.typeText;
                app.typeDescArray.push(_thisTypeDesc)
            });

        },

        getTypeDescriptions: function(bodyType){
            //console.log('attempting to get new data for class: '+app.curVehicClass)

            var filtered = this.models.filter(function(car) {
                return car.get("class") == app.thisVehicClass;
            });

            var _thisClass = new app.VehicClasses(filtered);

            _thisClass.each(function(el, i){

                //console.log(el)

                var _thisAttr = el.attributes.bodyTypes;
                var _typeCount = _thisAttr.length;

                if (_typeCount>1) {
                    $.each( _thisAttr, function( index, value ){
                        var thisType = value.type
                        if (thisType==bodyType) {
                            app.modelHeader = value.typeTitle;
                            app.modelDescription = value.typeText;
                            //console.log('thisType '+thisType) 
                        };
                    });
                }else{
                    //console.log('(no body type')          
                }
            });

        },

        getAssocModles: function(vehicle){
            //this function uses nav data but is called only from vehicle specific page to get related models subNav
            //get bodyType array (vehicleTree) where class == curmodel 
            app.assocModelName_forNav = []; //blank array to catch full vehicle names for subNav 
            //console.log('app.curVehicClass: '+app.curVehicClass);

            var filtered = this.models.filter(function(car) {
                return car.get("class") == app.curVehicClass;
            });/**/

            //find where type matches current bodyType and get associted models
            var _thisClass = new app.VehicClasses(filtered);

            _thisClass.each(function(el, i){
                //console.log('pre: '+JSON.stringify(el))

                var _thisAttr = el.attributes.bodyTypes;
                var _typeCount = _thisAttr.length;

                //console.log('_thisAttr: '+JSON.stringify(_thisAttr)+' _typeCount: '+_typeCount)
                //console.log('\n\napp.curModel_type: '+app.curModel_type)

                if (_typeCount>0) {
                    $.each( _thisAttr, function( index, value ){
                        var thisType = value.type
                        if (thisType==app.curModel_type) {
                            app.assocModels_forNav = value.models
                            finishSerching()
                        };
                    });
                }else{
                    //console.log('no body type')          
                }/**/

            });

            function finishSerching(){
                //console.log('app.assocModels_forNav: '+app.assocModels_forNav) 
                //console.log('app.AllVehicClasses: '+JSON.stringify(app.AllVehicClasses))

                //remove any blacListed models that have no landing page

                //var check_blacList = _.without(app.assocModels_forNav, str);
                var check_blacList = _.without.apply(_, [app.assocModels_forNav].concat(app.blacList));
                //log("YYYY")
                // log(check_blacList)
                app.assocModelLinks_forNav = check_blacList;

                //console.log('app.assocModelLinks_forNav: '+app.assocModelLinks_forNav)

                $.each( app.assocModelLinks_forNav, function( index, value ){
                    var indiVehicle  = _.where(app.LinksBottom, {id: value});
                    var indiVehicleFLAT = _.flatten(indiVehicle) //bust out of nested array
                    var _thisNameFull = _.pluck(indiVehicleFLAT, 'text')
                    app.assocModelName_forNav.push(_thisNameFull)
                    //console.log('ok, so now: '+JSON.stringify(_thisNameFull)) 
                });

            }

            //iterate out each result to model subnav with name and link for page     
            Backbone.View.prototype.eventAggregator.trigger("loadRelatedModels_subNav");

        }

    });


    // Create our global collection of **AllVehicClasses**.
    //app.AllVehicClasses = new VehicClasses(); 













})(jQuery);