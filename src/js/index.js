jQuery(function($){
    //判断登录状态
    isLogin(true);

    //一级导航
    var $catalogs_title = $('.catalogs_title');
    //二级导航
    var $catalogs_list = $('.catalogs_list');
    //一级导航点击
    $catalogs_title.on('click',function(){
        if($catalogs_list.css('display') == 'block'){
            $catalogs_list.css('display','none');
        }else{
            $catalogs_list.css('display','block');
        }
    });

    //头部购物车请求
    reCarData(true);
    headDel(true);

    //轮播图
    $('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false
    });

    //商品楼层div
    var $floor = $('#floor');
    //商品1楼层图片数组
    var floorArr1 = [];
    //商品2楼层图片数组
    var floorArr2 = [];
    //发送请求
    $.ajax({
        type : "get",
        url: `api/index_data.php`,
        success : function(res){
            var indexData = JSON.parse(res);
            for(var i=0;i<indexData.length;i++){
                if(indexData[i].type == 1){
                    floorArr1.push(indexData[i].index_img);
                }
                if(indexData[i].type == 2){
                    floorArr2.push(indexData[i].index_img);
                }
            }
            createFloor(floorArr1,floorArr2);
        }
    });

    //商品楼层渲染
    function createFloor(){
        var str = '';
        for(var i=1;i<=arguments.length;i++){
            if('floorArr1'.slice(-1) == i){
                str += `<div class="floor con floor1">
                        <div class="floor_title clearfix">
                            <h2>
                                <a href="html/listpage.html">
                                    <i>F1</i>
                                    进口水果
                                </a>
                            </h2>
                            <span class="keyword">
                                <a href="html/listpage.html">进口苹果</a>
                                <a href="html/listpage.html">佳沛专区</a>
                                <a href="html/listpage.html" class="last">泰国鲜果</a>
                            </span>    
                        </div>
                        <div class="floor_content clearfix">
                            <div class="floor_side">
                                <a href="html/listpage.html">
                                    <img src="${arguments[0][0]}">
                                </a>
                            </div>
                            <div class="floor_main">
                                <ul class="clearfix">
                                    <li>
                                        <a href="html/listpage.html">
                                            <img src="${arguments[0][1]}">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="html/listpage.html">
                                            <img src="${arguments[0][2]}">
                                        </a>
                                    </li>
                                    <li class="wide">
                                        <a href="html/listpage.html">
                                            <img src="${arguments[0][3]}">
                                        </a>
                                    </li>
                                    <li class="wide">
                                        <a href="html/listpage.html">
                                            <img src="${arguments[0][4]}">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="html/listpage.html">
                                            <img src="${arguments[0][5]}">
                                        </a>
                                    </li>
                                    <li>
                                        <a href="html/listpage.html">
                                            <img src="${arguments[0][6]}">
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>`
                }
                if('floorArr2'.slice(-1) == i){
                    str += `<div class="floor con floor2">
                            <div class="floor_title clearfix">
                                <h2>
                                    <a href="html/listpage.html">
                                        <i>F2</i>
                                        海鲜水产
                                    </a>
                                </h2>
                                <span class="keyword">
                                    <a href="html/listpage.html">大湖有机鱼</a>
                                    <a href="html/listpage.html">东海水产</a>
                                    <a href="html/listpage.html" class="last">北极甜虾</a>
                                </span>    
                            </div>
                            <div class="floor_content clearfix">
                                <div class="floor_side">
                                    <a href="html/listpage.html">
                                        <img src="${arguments[1][0]}">
                                    </a>
                                </div>
                                <div class="floor_main">
                                    <ul class="clearfix">
                                        <li>
                                            <a href="html/listpage.html">
                                                <img src="${arguments[1][1]}">
                                            </a>
                                        </li>
                                        <li>
                                            <a href="html/listpage.html">
                                                <img src="${arguments[1][2]}">
                                            </a>
                                        </li>
                                        <li class="wide">
                                            <a href="html/listpage.html">
                                                <img src="${arguments[1][3]}">
                                            </a>
                                        </li>
                                        <li class="wide">
                                            <a href="html/listpage.html">
                                                <img src="${arguments[1][4]}">
                                            </a>
                                        </li>
                                        <li>
                                            <a href="html/listpage.html">
                                                <img src="${arguments[1][5]}">
                                            </a>
                                        </li>
                                        <li>
                                            <a href="html/listpage.html">
                                                <img src="${arguments[1][6]}">
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`
                    }
        }
        $floor.html(str);
    }
})