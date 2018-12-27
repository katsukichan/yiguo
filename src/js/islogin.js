function isLogin(isIndex){
    //顶部导航右侧ul
    var $top_nav_ul = $('.top_nav .fr');
    //获取cookie
    if(document.cookie){
        var currentUser = Cookie.get('username');
        $(`<li class="login"><span class="user">${currentUser}</span><a href="javascript:;" class="logout">[退出]</a></li>`).appendTo($top_nav_ul);
        $log_out = $('.logout');
        //点击登出，删除cookie,替换样式
        $log_out.on('click',function(){
            Cookie.remove('username');
            if(isIndex){
                $('.login').remove();
                $(`<li><a href="html/registe.html">[注册]</a></li><li class="login"><a href="login.html">[登录]</a></li>`).appendTo($top_nav_ul);
            }else{
                $('.login').remove();
                $(`<li><a href="registe.html">[注册]</a></li><li class="login"><a href="login.html">[登录]</a></li>`).appendTo($top_nav_ul);
            }
        });
	}else{
        if(isIndex){
            $(`<li><a href="html/registe.html">[注册]</a></li><li class="login"><a href="html/login.html">[登录]</a></li>`).appendTo($top_nav_ul);
        }else{
            $(`<li><a href="registe.html">[注册]</a></li><li class="login"><a href="login.html">[登录]</a></li>`).appendTo($top_nav_ul);
        }
    }
}