<?php
    //注册判断值
    $registe = isset($_GET["registe"])?$_GET["registe"]:null;
    //注册变量
    $phone = isset($_GET["phone"])?$_GET["phone"]:null;
    $_password = isset($_GET["_password"])?$_GET["_password"]:null;
    //登录判断值
    $login = isset($_GET["login"])?$_GET["login"]:null;
    //登录变量
    $l_phone = isset($_GET["l_phone"])?$_GET["l_phone"]:null;
    $l_password = isset($_GET["l_password"])?$_GET["l_password"]:null;

    //创建连接，测试是否成功
	$servername = "localhost";
	$username = "root";
	$password = "123";
	$dbname = "db_yiguo";
	$conn = new mysqli($servername, $username, $password, $dbname);
	if($conn->connect_error){
		var_dump($conn->connect_error);
	}
	//查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');

    //注册查询语句
    if($phone !=null){
        $res = $conn->query('select * from user where phone="'.$phone.'"');
	    if($res->num_rows > 0){
	        echo "该用户名已被注册";
	    }else{
	        if($registe){
	            $res = $conn->query('insert into user (phone,password) values ("'.$phone.'","'.$_password.'")');
	            if($res){
	                echo "注册成功";
	            }else{
	                echo "注册失败";
	            }
	        }else{
	            echo "该用户名可用";
	        }
	    }
	    $res->close();
    	$conn->close();
    }
    //登录查询语句
    if($login){
    	$res = $conn->query('select * from user where phone="'.$l_phone.'" and password="'.$l_password.'"');
    	if($res->num_rows >0){
    		$content = $res->fetch_all(MYSQLI_ASSOC);
            echo json_encode($content,JSON_UNESCAPED_UNICODE);
    	}else{
    		echo "用户名或密码错误";
    	}
    	$res->close();
    	$conn->close();
    }
?>