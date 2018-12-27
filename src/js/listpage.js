jQuery(function($){
    //排序div
    var $sort_box = $('.sort_box');
    //默认排序
    var $s_default = $sort_box.children().eq(0);
    //价格排序
    var $s_price = $sort_box.children().eq(1);
    //商品列表div
    var $goods_list = $('.goods_list');
    //商品列表
    var $item_list = $goods_list.children().eq(0);
    //分页
    var $page_list = $('.page_list');
    
    //登录判断
    isLogin(false);

    //头部购物车请求
    reCarData(false);
    headDel(false);
    
    //每页的数量
    var qty = 8;
    //当前页数
    var currentPage = 1;
    //获取总页数变量
    var allPage;
    //定义变量存排序方式
    var way = 's_default';
    //定义变量,存当前请求url内容
    getData(qty,currentPage,way);
    
    $s_default.on('click',function(){
        if($s_default.prop('className') == 'on'){
            return;
        }else{
            //执行默认排序
            $s_price.removeClass().addClass('price');
            $s_default.addClass('on');
            way = 's_default';
            getData(qty,currentPage,way);
        }
    });

    $s_price.on('click',function(){
        //原默认排序时点击，执行价格升序排序
        if($s_price.prop('className') == 'price'){
            $s_default.removeClass('on');
            $s_price.addClass('on');
            $s_price.addClass('price_up');
            way = 'price_up';
            getData(qty,currentPage,way);
            return;
        }
        //原价格升序排序点击，执行价格降序排序
        if($s_price.prop('className') == 'price on price_up'){
            $s_price.removeClass('price_up');
            $s_price.addClass('price_down');
            way = 'price_down';
            getData(qty,currentPage,way);
            return;
        }
        //原价格降序排序点击，执行价格升序排序
        if($s_price.prop('className') == 'price on price_down'){
            $s_price.removeClass('price_down');
            $s_price.addClass('price_up');
            way = 'price_up';
            getData(qty,currentPage,way);
            return;
        }
    });

    //分页点击
    $page_list.on('click',function(e){
        if(e.target.tagName == 'LI'){
            if(e.target.innerHTML == "上一页"){
                if(currentPage == 1){
                    return;
                }
                currentPage --;
                getData(qty,currentPage,way);
            }
            if(e.target.innerHTML == "下一页"){
                if(currentPage == allPage){
                    return;
                }
                currentPage++;
                getData(qty,currentPage,way);
            }
            //为数字的情况
            if(/^[0-9]+$/.test(e.target.innerHTML)){
                currentPage = e.target.innerHTML;
                getData(qty,currentPage,way);
            }
        }
    });

    //点击商品，传输商品guid
    $item_list.on('click',function(e){
        if(e.target.tagName == "IMG"){
            var currentLi = e.target.parentElement.parentElement.parentElement;
            var guid = currentLi.getAttribute('data-guid');
            location.href = `datails.html?guid=${guid}`;
        }
        if(e.target.tagName == "A"){
            var currentLi = e.target.parentElement.parentElement.parentElement;
            var guid = currentLi.getAttribute('data-guid');
            location.href = `datails.html?guid=${guid}`;
        }
    });
    
    //商品列表渲染
    function createList(data){
        var str = '';
        $item_list.html(data.map(function(item){
            return `<li data-guid=${item.guid}>
                        <div class="item_img">
                            <a href="javascript:;">
                                <img src="../${item.gimg}" width="290" height="290">
                            </a>
                        </div>
                        <div class="item_info">
                            <div class="item_msg">
                                <a href="javascript:;">
                                    ${item.gmsg}
                                </a>
                            </div>
                            <div class="item_price">
                                <span class="price">￥${item.gprice}</span>
                            </div>
                        </div>
                    </li>`
        }).join(''));
    }

    function getData(){
        if(arguments[2] == 's_default'){
            var urlcontent = `../api/goods_data.php?qty=${qty}&currentPage=${currentPage}&s_default=${true}`;
        }
        if(arguments[2] == 'price_down'){
            var urlcontent = `../api/goods_data.php?qty=${qty}&currentPage=${currentPage}&price_down=${true}`;
        }
        if(arguments[2] == 'price_up'){
            var urlcontent = `../api/goods_data.php?qty=${qty}&currentPage=${currentPage}&price_up=${true}`;
        }
        //发送请求获取页面数据
        $.ajax({
            type : "get",
            url : urlcontent,
            success : function(res){
                var res = JSON.parse(res);
                createList(res.data);
                //页码总数，向上取整保证够页数
                var totalPage = Math.ceil(res.len/res.qty);
                allPage = totalPage;
                //清除已加载页码
                $page_list.html('');
                //添加子元素到分页
                $(`<li class="prev_page">上一页</li>`).appendTo($page_list); 
                for(var i=1;i<=totalPage;i++){
                    if(res.currentPage == i){
                        $(`<li class="active">${i}</li>`).appendTo($page_list);
                    }else{
                        $(`<li>${i}</li>`).appendTo($page_list);
                    }
                }
                $(`<li class="next_page">下一页</li>`).appendTo($page_list);
            } 
        });
    }
})