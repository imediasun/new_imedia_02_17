
//handles language selector on bottom of page and language variables

//fix for IE8, when changing href, it was also changin the value
$('.copy-slide p').find('a').prepend('<wbr></wbr>');

//add language querystring to all links that contain '.php' and if not already set
$('a').each(function(){
    var href = $(this).attr('href');
    //don't change if already has lang
    if(href){
        if(href.indexOf("?lang") == -1){
            if (href && href.indexOf(".php") >= 0 && href.indexOf("lang=") < 0 ){

                if (href.indexOf("?")<0) { $(this).attr('href', href+"?lang="+window.language); }
                else { $(this).attr('href', href+"&lang="+window.language); }
            }
            if (href && href.indexOf(".php") >= 0 && href.indexOf("v=") < 0 ){
                if (href.indexOf("?")<0) { $(this).attr('href', href+"?lang="+window.language); }
                else { $(this).attr('href', href+"&lang="+window.language); }
            }
        }
    }
});

function changeLanguage(lang){
    //reloads the page with the lang parameter reset
    var url = $(location).attr('href');
    if($('#news-section').size() > 0){
        changeNewsLanguage(lang);
    }else if( url.indexOf("lang") != -1 ){
        //if url contains lang querystring, then swap it out
        url = url.replace(/(lang=)[^\&]+/, '$1' + lang);
        window.location = url;
    } else{
        // if doesnt contain lang query, then add it
        url = updateQueryStringParameter(url, 'lang', lang);
        window.location = url;
    }
}

function changeNewsLanguage(lang){
    var prevLang = $('body').attr('data-lang');
    var id;
    if(prevLang =='eng'){
        //cur lang is eng
        id = window.newsID +'_'+lang;
    }
    if(lang == 'eng'){
        //going to eng
        id = window.newsID.substr(0, window.newsID.length-4);
    }
    var url = "latest.php?lang="+lang+"&section=news&id="+id;
    log("X: "+ url);
    window.location = url;
}
//helper function to add either ? or & to the query string
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

//bottom language switcher
if(window.language === "eng"){
    $('#footer-language h4').text($('#lang-eng').text());
    $('#lang-eng').parent().addClass('lang-active');
}else if(window.language === "deu"){
    $('#footer-language h4').text($('#lang-deu').text());
    $('#lang-deu').parent().addClass('lang-active');
}else if(window.language === "rus"){
    $('#footer-language h4').text($('#lang-rus').text());
    $('#lang-rus').parent().addClass('lang-active');
}else if(window.language === "ita"){
    $('#footer-language h4').text($('#lang-ita').text());
    $('#lang-ita').parent().addClass('lang-active');
}else if(window.language === "twn"){
    $('#footer-language h4').text($('#lang-twn').text());
    $('#lang-twn').parent().addClass('lang-active');
}else if(window.language === "ara"){
    $('#footer-language h4').text($('#lang-ara').text());
    $('#lang-ara').parent().addClass('lang-active');
}else if(window.language === "nld"){
    $('#footer-language h4').text($('#lang-nld').text());
    $('#lang-nld').parent().addClass('lang-active');
}
$('#lang-eng').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('eng');
});
$('#lang-deu').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('deu');
});
$('#lang-rus').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('rus');
});
$('#lang-ita').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('ita');
});
$('#lang-twn').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('twn');
});
$('#lang-ara').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('ara');
});
$('#lang-nld').click(function(e) {//FIX: E.HANDLER
    e.preventDefault();
    changeLanguage('nld');
});

$('#footer-language').hover(function() {//FIX: E.HANDLER
    var h = $('#lang-popup li').size() * 22;
    $('#lang-popup').stop().animate({'height':h},250);
}, function() {
    $('#lang-popup').stop().animate({'height':'0px'},250);
});
//
$('#footer-language a').click(function(event) {
    if($(this).attr('id') != 'lang-china'){
        event.preventDefault();
        log("Prevent")
    }
});


$('#lang-popup li').hover(function(e) {//FIX: E.HANDLER
    $(this).not('.lang-active').css({'background':"#999"});
}, function(e) {
    $(this).not('.lang-active').css({'background':"none"});
});
