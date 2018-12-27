//头部购物车数据获取函数,传参判断是否首页调用
function reCarData(isIndex){
    //无数据结构
    var $nogoods = $('.nogoods');
    //有数据结构
    var $goods = $('.goods');
    //定义变量存发送地址
    var urlcontent = '';
    if(isIndex){
        urlcontent = `api/car_data.php`;
    }else{
        urlcontent = `../api/car_data.php`;
    }
    //发送请求获取数据
    $.ajax({
        type : 'get',
        url : urlcontent,
        success : function(res){
            if(res == "没有满足条件的数据"){
                $nogoods.css('display','block');
                $goods.css('display','none');
            }else{
                $nogoods.css('display','none');
                var res = JSON.parse(res);
                var str = `<ul class="goodslist">`;
                //总数总价存储变量
                var _totleNum = 0;
                var _totalPrice = 0;
                if(isIndex){
                    str += res.map(function(item){
                        _totleNum += item.cnum*1;
                        _totalPrice += (item.cnum*1)*(item.cprice*1);
                        return `<li class="clearfix" data-guid="${item.guid}">
                                    <div class="l"><a href="javascript:;"><img src="${item.cimg}" width="42" height="42"></a></div>
                                    <div class="c"><a href="javascript:;">${item.cmsg}</a></div>
                                    <div class="r"><b>¥${item.cprice}</b> * ${item.cnum}<a href="javascript:;" class="head_del_btn">删除</a></div>
                                </li>`
                    }).join('');
                }else{
                    str += res.map(function(item){
                        _totleNum += item.cnum*1;
                        _totalPrice += (item.cnum*1)*(item.cprice*1);
                        return `<li class="clearfix" data-guid="${item.guid}">
                                    <div class="l"><a href="javascript:;"><img src="../${item.cimg}" width="42" height="42"></a></div>
                                    <div class="c"><a href="javascript:;">${item.cmsg}</a></div>
                                    <div class="r"><b>¥${item.cprice}</b> * ${item.cnum}<a href="javascript:;" class="head_del_btn">删除</a></div>
                                </li>`
                    }).join('');
                }
                _totalPrice = _totalPrice.toFixed(2);
                str += `</ul>
                        <div class="price_total">
                            <div><span class="totleNum">共<b>${_totleNum}</b>件商品</span><span>共计<b class="totlePrice">¥${_totalPrice}</b></span></div>
                            <div><a href="javascript:;" class="goCar">去结算</a></div>
                        </div>`;
                $goods.html(str);
                $goods.css('display','block');
                //获取总数总价显示到结构
                var $totleNum = $('.totleNum b');
                var $totlePrice = $('.totlePrice');
                //当数量大于99时
                if(_totleNum>99){
                    $totleNum.html('99+');
                }else{
                    $totleNum.html(_totleNum);
                }
                //当价格大于99999
                if(_totalPrice>99999){
                    $totlePrice.html('9999+');
                }else{
                    $totlePrice.html(_totalPrice);
                }
                //头部购物车跳转按钮
                var goCar = $('.goCar');
                if(isIndex){
                    //头部购物车跳转
                    goCar.on('click',function(){
                        location.href = 'html/shopcar.html';
                    });
                }else{
                    //头部购物车跳转
                    goCar.on('click',function(){
                        location.href = 'shopcar.html';
                    });
                }
            }
        }
    });
}
function headDel(isIndex){
    var $goods = $('.goods');
    //删除按键点击
    $goods.on('click',function(e){
        if(e.target.className == 'head_del_btn'){
            var currentLi = e.target.parentElement.parentElement;
            var guid = currentLi.getAttribute('data-guid');
            //定义变量存发送地址
            var urlcontent = '';
            if(isIndex){
                urlcontent = `api/car_data.php?delete_data=${true}&guid=${guid}`;
            }else{
                urlcontent = `../api/car_data.php?delete_data=${true}&guid=${guid}`;
            }
            //发送请求，删除相应数据
            $.ajax({
                type : 'get',
                url : urlcontent,
                success : function(){
                    var $totleNum = $('.totleNum b');
                    var $totlePrice = $('.totlePrice');
                    //无数据结构
                    var $nogoods = $('.nogoods');
                    //定义变量存发送地址
                    var urlcontent2 = '';
                    if(isIndex){
                        urlcontent2 = `api/car_data.php`;
                    }else{
                        urlcontent2 = `../api/car_data.php`;
                    }
                    $.ajax({
                        type : 'get',
                        url : urlcontent2,
                        success : function(res){
                            if(res == "没有满足条件的数据"){
                                $nogoods.css('display','block');
                                $goods.css('display','none');
                                $totleNum.html(0);
                                var noNum = 0;
                                $totlePrice.html(noNum.toFixed(1));
                            }else{
                                $nogoods.css('display','none');
                                var res = JSON.parse(res);
                                var str = `<ul class="goodslist">`;
                                //总数总价存储变量
                                var _totleNum = 0;
                                var _totalPrice = 0;
                                if(isIndex){
                                    str += res.map(function(item){
                                        _totleNum += item.cnum*1;
                                        _totalPrice += (item.cnum*1)*(item.cprice*1);
                                        return `<li class="clearfix" data-guid="${item.guid}">
                                                    <div class="l"><a href="javascript:;"><img src="${item.cimg}" width="42" height="42"></a></div>
                                                    <div class="c"><a href="javascript:;">${item.cmsg}</a></div>
                                                    <div class="r"><b>¥${item.cprice}</b> * ${item.cnum}<a href="javascript:;" class="head_del_btn">删除</a></div>
                                                </li>`
                                    }).join('');
                                }else{
                                    str += res.map(function(item){
                                        _totleNum += item.cnum*1;
                                        _totalPrice += (item.cnum*1)*(item.cprice*1);
                                        return `<li class="clearfix" data-guid="${item.guid}">
                                                    <div class="l"><a href="javascript:;"><img src="../${item.cimg}" width="42" height="42"></a></div>
                                                    <div class="c"><a href="javascript:;">${item.cmsg}</a></div>
                                                    <div class="r"><b>¥${item.cprice}</b> * ${item.cnum}<a href="javascript:;" class="head_del_btn">删除</a></div>
                                                </li>`
                                    }).join('');
                                }
                                _totalPrice = _totalPrice.toFixed(2);
                                str += `</ul>
                                        <div class="price_total">
                                            <div><span class="totleNum">共<b>${_totleNum}</b>件商品</span><span>共计<b class="totlePrice">¥${_totalPrice}</b></span></div>
                                            <div><a href="javascript:;" class="goCar">去结算</a></div>
                                        </div>`;
                                $goods.html(str);
                                $goods.css('display','block');
                                //获取总数总价显示到结构
                                $totleNum.html(_totleNum);
                                $totlePrice.html(_totalPrice);
                                //头部购物车跳转按钮
                                var goCar = $('.goCar');
                                if(isIndex){
                                    //头部购物车跳转
                                    goCar.on('click',function(){
                                        location.href = 'html/shopcar.html';
                                    });
                                }else{
                                    //头部购物车跳转
                                    goCar.on('click',function(){
                                        location.href = 'shopcar.html';
                                    });
                                }
                            }
                        }
                    });
                }
            })
        }
    });
}