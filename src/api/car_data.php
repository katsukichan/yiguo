<?php
    //添加数据判断值
    $add_data = isset($_GET["add_data"])? $_GET["add_data"] : false;
    //商品值，用于各种判断
    $msg = isset($_GET["msg"])? $_GET["msg"] : null;
    $guid = isset($_GET["guid"])? $_GET["guid"] : null;
    $img = isset($_GET["img"])? $_GET["img"] : null;
    $price = isset($_GET["price"])? $_GET["price"] : null;
    $num = isset($_GET["num"])? $_GET["num"] : null;
    //更新数据判断值
    $update_data = isset($_GET["update_data"])? $_GET["update_data"] : false;
    //删除数据判断值
    $delete_data = isset($_GET["delete_data"])? $_GET["delete_data"] : false;

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
    
    //获取表中所有数据
    if($add_data == false && $update_data == false && $delete_data == false){
        $res = $conn->query('select * from car_data');
        if($res->num_rows > 0){
            $content = $res->fetch_all(MYSQLI_ASSOC);
            echo json_encode($content,JSON_UNESCAPED_UNICODE);
        }else{
            echo "没有满足条件的数据";
        }
        $res->close();
    }
    if($add_data){
        //先判断表中有无对应id的数据，无则插入，有则更新
        $res = $conn->query('select * from car_data where guid='.$guid.'');
        if($res->num_rows > 0){
            //数据值增加
            $res->close();
            //先获取数据库中原有的商品数量值，进行相加
            $res1 = $conn->query('select cnum from car_data where guid='.$guid.'');
            $origin_num = $res1->fetch_assoc();
            $origin_num = reset($origin_num);
            $origin_num = intval($origin_num);
            $res1->close();
            //更新数据
            $num = $num + $origin_num;
            $res2 = $conn->query('update car_data set cnum='.$num.' where guid='.$guid.'');
            echo "更新成功";
        }else{
            //插入数据
            $res->close();
            $res = $conn->query('insert into car_data (cmsg,cimg,cprice,cnum,guid) values("'.$msg.'","'.$img.'",'.$price.','.$num.','.$guid.')');
            echo "添加成功";
        }
    }
    //购物车内更改数值，更新数据
    if($update_data){
        $res = $conn->query('update car_data set cnum='.$num.' where guid='.$guid.'');
        echo "更新成功";
    }
    //删除数据
    if($delete_data){
        if($guid == null){
            $res = $conn->query('delete from car_data');
            echo "全部删除";
        }else{
            $res = $conn->query('delete from car_data where guid='.$guid.'');
            echo "删除成功";
        }
    }
    $conn->close();
?>