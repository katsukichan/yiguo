jQuery(function($){
    //错误信息提示
    var $msg_wrap = $('.msg_wrap');
    //手机号输入
    var $input_phone = $('.input_phone');
    //密码输入
    var $input_key = $('.input_key');
    //登录按钮
    var $btnLogin = $('#btnLogin');
    console.log(666);
    //登录按钮点击
    $btnLogin.on('click',function(){
        if($input_phone.val().trim() == 0 || $input_key.val().trim() == 0){
            $msg_wrap.css('display', 'block');
            $msg_wrap.children().eq(0).html('请输入用户名密码');
        }else{
            $.ajax({
                type : "get",
                url: `../api/user.php?login=${true}&l_phone=${$input_phone.val()}&l_password=${$input_key.val()}`,
                success : function(res){
                    if(res == "用户名或密码错误"){
                        $msg_wrap.css('display', 'block');
                        $msg_wrap.children().eq(0).html('用户名或密码错误');
                    }else{
                        //将用户名存入cookie
                        var res = JSON.parse(res);
                        console.log(res);
                        // var d = new Date();
                        // d.setDate(d.getDate()+7);
                        // Cookie.set('username',_name,{expires:d}); 
                        // location.href = "../index.html";
                    }
                }
            })
        }
    }); 
})