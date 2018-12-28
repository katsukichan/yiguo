jQuery(function(){
    //购物车无物品结构
    var $cart_none = $('.cart_none');
    //购物车有物品结构
    var $cart_in = $('.cart_in');
    //商品列表结构
    var $cart_table = $('#cart_table');
    //商品总价
    var $total_price = $('.total_price');
    //全选框
    var $check_all = $('.check_all');
    //删除选中
    var $delete_choose_btn = $('.delete_choose_btn');
    //清空
    var $clear_btn = $('.clear_btn');
    //总价存储变量
    var allPrice = 0;
    //为调用toFix定义0变量
    var zeroPrice = 0;
    //登录判断
    isLogin(false);
    
    createShopCar();
    
    //顶部全选按键
    $check_all[0].onclick = function(){
        $otherChecked = $(':checkbox').not('.check_all');
        if($check_all[0].checked){
            $check_all[1].checked = 'checked';
            $otherChecked.prop('checked',this.checked);
            $total_price.html('￥'+allPrice);
        }else{
            $check_all[1].checked = '';
            $otherChecked.prop('checked',this.checked);
            $total_price.html('￥'+zeroPrice.toFixed(2));
        }
    }
    //底部全选按键
    $check_all[1].onclick = function(){
        $otherChecked = $(':checkbox').not('.check_all');
        if($check_all[1].checked){
            $check_all[0].checked = 'checked';
            $otherChecked.prop('checked',this.checked);
            $total_price.html('￥'+allPrice);
        }else{
            $check_all[0].checked = '';
            $otherChecked.prop('checked',this.checked);
            $total_price.html('￥'+zeroPrice.toFixed(2));
        }
    }

    //删除选中商品
    $delete_choose_btn.on('click',function(){
        //获取当前tr选中checkbox
        var $checkbox = $(':checked').not('.check_all');
        var delNum = $checkbox.length;
        if(delNum == 0){
            return;
        }
        //根据删除次数发送请求，异步
    })

    //清空购物车
    $clear_btn.on('click',function(){
        $.ajax({
            type : 'get',
            url : `../api/car_data.php?delete_data=${true}`,
            success : function(res){
                if(res == '全部删除'){
                    createShopCar();
                }
            }
        });
    });

    //table中点击事件
    $cart_table.on('click',function(e){
        //数量减按键
        if(e.target.className == 'decrease'){
            //获取当前行的数值和guid
            var currentTr = e.target.parentElement.parentElement.parentElement;
            var currentGuid = currentTr.getAttribute('data-guid');
            var currentIpt = e.target.nextElementSibling;
            if(currentIpt.value == 1){
                return;
            }
            currentIpt.value -= 1;
            //发送请求更新数据
            itemNumUpdate(currentIpt.value,currentGuid);
        }
        //数量增按键
        if(e.target.className == 'increase'){
            //获取当前行的数值和guid
            var currentTr = e.target.parentElement.parentElement.parentElement;
            var currentGuid = currentTr.getAttribute('data-guid');
            var currentIpt = e.target.previousElementSibling;
            if(currentIpt.value == 99){
                return;
            }
            currentIpt.value = currentIpt.value*1 + 1;
            //发送请求更新数据
            itemNumUpdate(currentIpt.value,currentGuid);
        }
        //数量input
        if(e.target.className == 'itxt'){
            //获取当前行的数值和guid
            var currentTr = e.target.parentElement.parentElement.parentElement;
            var currentGuid = currentTr.getAttribute('data-guid');
            e.target.onblur = function(){
                if(!/(^[0-9]{1,2}$)/.test(e.target.value)){
                    alert('请输入2位及以内整数');
                    e.target.value = 1;
                    itemNumUpdate(e.target.value,currentGuid);
                    return;
                }
                //发送请求更新数据
                itemNumUpdate(e.target.value,currentGuid);
            }
        }
        //删除按键
        if(e.target.className == 'delete_btn'){
            //获取当前行的guid
            var currentTr = e.target.parentElement.parentElement;
            var currentGuid = currentTr.getAttribute('data-guid');
            $.ajax({
                type : 'get',
                url : `../api/car_data.php?delete_data=${true}&guid=${currentGuid}`,
                success : function(res){
                    if(res == '删除成功'){
                        createShopCar();
                    }
                }
            });
        }
        //checkbox按键
        if(e.target.className == 'tr_check'){
            //获取当前商品行数
            var $trs = $cart_table.find('tr');
            var trlen = $trs.length;
            var currentTr = e.target.parentElement.parentElement;
            var $currentTotal = $(currentTr).find('.t_total')[0].innerHTML.slice(1);
            if(e.target.checked){
                //选中，加上相应价格
                $total_price.html('￥'+(($total_price[0].innerHTML.slice(1))*1+$currentTotal*1).toFixed(2));
                //获取选中的checkbox长度，等于行数tr勾选全选
                var checkNum = $(':checked').length;
                if(trlen == checkNum){
                    $check_all.prop('checked','checked');
                }
            }else{
                //未选中，减去相应价格
                $total_price.html('￥'+(($total_price[0].innerHTML.slice(1))*1-$currentTotal*1).toFixed(2));
                //获取选中的checkbox长度，不等于行数tr取消全选
                var checkNum = $(':checked').length;
                if(trlen != checkNum){
                    $check_all[0].checked = '';
                    $check_all[1].checked = '';
                }
            }
        }
    });

    //更新商品数量函数
    function itemNumUpdate(num,guid){
        $.ajax({
            type : 'get',
            url : `../api/car_data.php?update_data=${true}&num=${num}&guid=${guid}`,
            success : function(res){
                if(res == '更新成功'){
                    createShopCar();
                }
            }
        });
    }

    //生成购物车函数
    function createShopCar(){
        $.ajax({
            type : 'get',
            url : `../api/car_data.php`,
            success : function(res){
                if(res == "没有满足条件的数据"){
                    $cart_none.css('display','block');
                    $cart_in.css('display','none');
                }else{
                    $cart_none.css('display','none');
                    var res = JSON.parse(res);
                    console.log(res);
                    //存储生成结构变量
                    var str = `<table class="cart_table">
                                    <tbody>`;
                    //总价存储变量
                    var _totalPrice = 0;
                    str += res.map(function(item){
                        _totalPrice += (item.cnum*1)*(item.cprice*1);
                        return `<tr data-guid="${item.guid}">
                                    <td class="t_check">
                                        <input type="checkbox" checked="checked" class="tr_check">
                                    </td>
                                    <td class="t_img">
                                        <img src="../${item.cimg}">
                                    </td>
                                    <td class="t_info">${item.cmsg}</td>
                                    <td class="t_price">￥${item.cprice}</td>
                                    <td class="t_num">
                                        <div class="num_box">
                                            <a href="javascript:;" class="decrease"></a>
                                            <input type="text" maxlength="2" class="itxt" value="${item.cnum}">
                                            <a href="javascript:;" class="increase"></a>
                                        </div>
                                    </td>
                                    <td class="t_total">￥${((item.cnum*1)*(item.cprice*1)).toFixed(2)}</td>
                                    <td class="t_spec">暂无</td>
                                    <td class="t_opera"><a href="javascript:;" class="delete_btn">删除</a></td>
                                </tr>`;
                    }).join('');
                    str += `    </tbody>
                            </table>`;
                    //存总价变量
                    allPrice = _totalPrice.toFixed(2);
                    $total_price.html('￥'+_totalPrice.toFixed(2));
                    $cart_table.html(str);
                    $cart_in.css('display','block');
                }
            }
        });
    }
})