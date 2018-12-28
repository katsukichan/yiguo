jQuery(function($){
    //标题
    var $title = $('h1');
    //价格
    var $price = $('strong').eq(0);
    //图片切换列表ul
    var $pic_ul = $('.pic_list').children();
    //大图显示
    var $big_img = $('.big_pic').children();
    //大图移动框
    var $sp = $('.sp');
    //放大图显示框
    var $show_big = $('.show_big');
    //放大图img标签
    var $show_big_img = $('.show_big img');
    //传入的商品图片展示
    var $goodImg = $pic_ul.children().eq(0).children();
    //数量input
    var $good_num = $('.good_num');
    //数量减
    var $decrease = $('.decrease');
    //数量增
    var $increase = $('.increase');
    //添加到购物车按钮
    var $add_car_btn = $('.btn_box a');
    //获取列表页传参
    var params = location.search.substring(1);;
    var guid = params.split('=')[1];
    //定义变量存本地路径
    var imgPath;
    //购物车飞入img
    var $fly_img = $('#fly');

    //登录判断
    isLogin(false);
    //返回顶部
    bacakTop();
    //吸顶菜单
    fixTop();
    
    $.ajax({
        type : "get",
            url : `../api/goods_data.php?guid=${guid}`,
            success : function(res){
                var res = JSON.parse(res);
                $title.html(res[0].gmsg);
                $price.html(res[0].gprice);
                imgPath = res[0].gimg;
                $fly_img.prop('src',`../${imgPath}`);
                $goodImg.prop('src',`../${res[0].gimg}`);
                $big_img.prop('src',`../${res[0].gimg}`);
            } 
    })

    //头部购物车请求
    reCarData(false);
    headDel(false);

    //图片切换
    $pic_ul.on('mouseover',function(e){
        if(e.target.tagName = "IMG"){
            var currentImg = e.target;
            if(currentImg.tagName == "IMG"){
                //获取图片路径值
                var imgPath = currentImg.src;
                //清空所有li on类名
                var $allLi = $pic_ul.children();
                for(var i=0;i<$allLi.length;i++){
                    $allLi.eq(i).removeClass('on');
                }
                //当前指向的图片li添加 on类名
                var $currentLi = $(currentImg).parent();
                $currentLi.addClass('on');
                //将路径值赋值到大图片img
                $big_img.prop('src',imgPath); 
            }
        }
    });

    //放大镜效果
    $big_img.on('mouseover',function(){
        //鼠标移入
        $sp.css('display','block');
        $show_big.css('display','block');
    }).on('mouseout',function(){
        //鼠标移出
        $sp.css('display','none');
        $show_big.css('display','none');
    }).on('mousemove',function(e){
        //鼠标内部移动
        //设置放大倍数
        var scale = 3;
        //设置放大框的宽高
        $sp.css({width:$big_img.outerWidth()/scale,height:$big_img.outerHeight()/scale});
        //放大图，先获取框内图片src，再设置放大值
        $show_big_img.attr('src',$big_img[0].src).css({width:$big_img.outerWidth()*scale});
        //计算放大框的定位值 top left
        var $ox = e.pageX - $big_img.offset().left - $sp.outerWidth()/2;
        var $oy = e.pageY - $big_img.offset().top - $sp.outerHeight()/2;
        if($ox<=0){
            $ox=0;
        }else if($ox>=$big_img.outerWidth()-$sp.outerWidth()){
            $ox=$big_img.outerWidth()-$sp.outerWidth();
        }
        if($oy<=0){
            $oy=0;
        }else if($oy>=$big_img.outerHeight()-$sp.outerHeight()){
            $oy=$big_img.outerHeight()-$sp.outerHeight();
        }
        $sp.css({left:$ox,top:$oy});
        $show_big_img.css({marginTop:-$oy*scale,marginLeft:-$ox*scale});
    });

    //判断商品数量值
    $good_num.on('blur',function(){
        if(!/(^[0-9]{1,2}$)/.test($good_num.val())){
            alert('请输入2位及以内整数');
            $good_num.val('1');
        }
    });
    //数量减
    $decrease.on('click',function(){
        if($good_num.val() == 1){
            return;
        }
        $good_num.val($good_num.val()-1);
    });
    //数量增
    $increase.on('click',function(){
        if($good_num.val() == 99){
            return;
        }
        $good_num.val($good_num.val()*1+1);
    });
    //加入购物车，添加数据
    $add_car_btn.on('click',function(){
        $fly_img.css('display','block').animate({left:600,top:-395},1000,function(){
            $fly_img.css('display','none');
            $fly_img.css({left:0,top:0});
            //获取题头，价格，数量，商品id存入数据库
            $.ajax({
                type : "get",
                url : `../api/car_data.php?add_data=${true}&guid=${guid}
                    &msg=${$title.html()}&img=${imgPath}
                    &price=${$price.html()}&num=${$good_num.val()}`,
                success : function(res){
                    console.log(res);
                    reCarData(false);
                } 
            });
        });
    });
})