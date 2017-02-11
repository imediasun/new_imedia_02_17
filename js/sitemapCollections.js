
(function ($) {
    'use strict';

    app.smData = Backbone.Model.extend({});


    //build list of sitemap links per page/section of site
    /////////////////////////////////////////////////////////////////////////////////////

    app.siteMapData = Backbone.Collection.extend({

        model: app.smData, //collections need at least a blank model defined in models file (vehicleModels.js in this case) 

        url: function(){ //but we are using dynamic path
            var _this = this;
            var $curLang = $('body').attr('data-lang');
            return  "data/"+$curLang+"/sitemap_data.js";
        },

        parse: function(response){
            app.smTitle = response.sitemapTitle; //pluck out title
            app.smLinks = response.smLinks; //pluck out smLinks
            app.siteMapAll = response;
        }

    });

    //new app.siteMapData();




})(jQuery);