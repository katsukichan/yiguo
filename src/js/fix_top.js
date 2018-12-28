function fixTop(){
    var $header = $('#header');
    var $top_nav = $('.top_nav');
    $(window).scroll(function(){
        if(window.scrollY >= 110){
            $header.addClass('fix_top');
            $top_nav.css('margin-bottom','149px');
        }else{
            $header.removeClass('fix_top');
            $top_nav.css('margin-bottom','0');
        }
    })
}