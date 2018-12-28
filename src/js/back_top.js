function bacakTop(){
    //返回顶部按键
    var $back_top = $('.back_top');

    $(window).scroll(function(){
        if(window.scrollY >= 950){
            $back_top.css('display','block');
        }else{
            $back_top.css('display','none');
        }
    })
    
    //返回顶部点击
    $back_top.on('click',pageScroll);

    function pageScroll(){
        //设置定时器，不断执行
        var scrollDelay = setInterval(function(){
            //执行一次向上移动100
            window.scrollBy(0,-100);
            //当为0时，清除定时器
            if(document.documentElement.scrollTop == 0){
				clearInterval(scrollDelay);
			}
        },20);
    }
}