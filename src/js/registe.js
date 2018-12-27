jQuery(function($){
    //手机号输入
    var $phone_mobile = $('#phone_mobile');
    //验证码输入
    var $verify_code = $('#verify_code');
    //验证码显示
    var $showCode = $('.showCode');
    //密码输入
    var $password = $('#password');
    var $confim_password = $('#confim_password');
    //同意协议勾选框
    var $tabchk = $('#tabchk');
    //注册按钮
    var $registeBtn = $('#registeBtn');

    registeCheck();
    //获取验证码
    $showCode.html(randomStrCode(4));
    //点击切换验证码
    $showCode.on('click',function(){
        $showCode.html(randomStrCode(4));
    });

    //注册按钮点击
    $registeBtn.on('click',function(){
        //各条件判断
        if($phone_mobile.val().trim().length == 0){
            $phone_mobile.next().html('手机号不能为空');
            return;
        }
        if(!/^1[3-8]\d{9}$/.test($phone_mobile.val())){
            $phone_mobile.next().html('手机输入格式不正确');
            return;
        }
        if($verify_code.val() != $showCode.html()){
            $verify_code.next().next().html('验证码不正确');
            return;
        }
        if($password.val().trim().length == 0){
            $password.next().html('密码不能为空');
            $password.val('');
            return;
        }
        if(!/^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/.test($password.val())){
            $password.next().html('密码格式不符');
            return;
        }
        if($confim_password.val() != $password.val()){
            $confim_password.next().html('两次密码不相同');
            return;
        }
        if(!$tabchk.prop('checked')){
            $tabchk.next().next().next().html('请同勾选意协议');
            return;
        }
        //发送请求
        $.ajax({
            type : "get",
            url: `../api/user.php?registe=${true}&phone=${$phone_mobile.val()}&_password=${$password.val()}`,
            success : function(res){
                if(res == "该用户名已被注册"){
                    $phone_mobile.next().html(res);
                }else{
                    alert("注册成功");
                    location.href = "login.html";
                }
            }
        }); 
    });

    function registeCheck(){
        //手机号判断
        $phone_mobile.on('blur',function(){
            var _phone_mobile = $phone_mobile.val();
            if(_phone_mobile.trim().length == 0){
                $phone_mobile.next().html('手机号不能为空');
                $phone_mobile.val('');
            }
        });
        $phone_mobile.on('input',function(){
            var _phone_mobile = $phone_mobile.val();
            if(!/^1[3-8]\d{9}$/.test(_phone_mobile)){
                $phone_mobile.next().html('手机输入格式不正确');
            }else{
                $phone_mobile.next().html('');
            }
        });
        //验证码判断
        $verify_code.on('blur',function(){
            var _verify_code = $verify_code.val();
            if(_verify_code != $showCode.html()){
                $verify_code.next().next().html('验证码不正确');
            }else{
                $verify_code.next().next().html('');
            }
        });
        //密码输入判断
        $password.on('blur',function(){
            var _password = $password.val();
            if(_password.trim().length == 0){
                $password.next().html('密码不能为空');
                $password.val('');
            }else if(!/^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/.test(_password)){
                $password.next().html('密码格式不符');
            }else{
                $password.next().html('');
            }
        });
        //确认密码判断
        $confim_password.on('blur',function(){
            var _password = $password.val();
            var _confim_password = $confim_password.val();
            if(_confim_password != _password){
                $confim_password.next().html('两次密码不相同');
            }else{
                $confim_password.next().html('');
            }
        });
        //同意协议勾选判断
        $tabchk.on('click',function(){
            if(!$tabchk.prop('checked')){
                $tabchk.next().next().next().html('请同勾选意协议');
            }else{
                $tabchk.next().next().next().html('');
            }
        });
    }

})