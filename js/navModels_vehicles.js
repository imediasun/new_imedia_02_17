

(function ($) {
    'use strict';






//defining empty model for app.VehicDeetsExpanded to use
/////////////////////////////////////////////////////////////////////////////////////

    app.Vehic = Backbone.Model.extend({});







    //model to get some vehicle data like tagline and CO2 info in 'vehicle_overview.js' file
    //
    /////////////////////////////////////////////////////////////////////////////////////

    //need empty obj to build co2 array (if needed for new per vehicle nav data)
    app.co2AllOBJ = [];

    app.vehicleNavData = Backbone.Model.extend({

        url: function(){
            var _this = this;
            return "data/"+app.langToSwap+"/vehicles/" + app.thisVehicModel + "/vehicle_overview.js";
        },

        parse: function(response){
            return response;
        },

        getVehicleNavData: function(model){

            var _this = this;

            app.vehicleNavInfo.clear().set(app.vehicleNavInfo.defaults);

            app.vehicleNavInfo.fetch({
                success: function(response) {
                    //console.log('vehicel specific overview data:\n '+JSON.stringify(response))                 
                    app.navCurVehic_header = response.get('pageTitle');
                    app.navCurVehic_subHeader = response.get('pageSubtitle');
                    app.navCO2 = response.get('co2');
                },
                error: function(){
                    //console.log('There was some error in loading and processing the JSON file');
                }
            });/**/

        },

        buildCO2List: function(model){
            var _this = this;
            app.vehicleNavInfo.fetch({
                success: function(response) {
                    var _thisCO2 = response.get('co2');
                    //console.log(_thisCO2) 
                    app.co2AllOBJ.push({model: model, co2: _thisCO2});
                    //log("app.LinksBottomLength: "+ app.LinksBottomLength);                                  
                },
                error: function(){
                    //console.log('There was some error in loading and processing the JSON file');
                }
            });/**/
        }

    });


    //this called after vehicle is known
    //app.vehicleNavInfo = new app.vehicleNavData(); 







    /* GENERAL PAGE DATA */


    var pageInfo = Backbone.Model.extend({

        defaults: {
            navigate: '',
            activePage: '',
            nextPage: '',
            scrolledPage: '',
            mainPageLoad: false,
            pageOff: false,
            vehicleInfoLoaded: false,
            mainUIDataLoaded: false
        }

    });
    app.vehiclePageInfo = new pageInfo();














})(jQuery);