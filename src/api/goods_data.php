<?php
    //判断是否进行排序
    //默认排序
    $s_default = isset($_GET["s_default"])? $_GET["s_default"] : false;
    //价格升序排序
    $price_up = isset($_GET["price_up"])? $_GET["price_up"] : false;
    //价格降序排序
    $price_down = isset($_GET["price_down"])? $_GET["price_down"] : false;

    //从前端传入每页商品数量和当前页数
    $qty = isset($_GET["qty"])? $_GET["qty"] : 8;
    $currentPage = isset($_GET["currentPage"])? $_GET["currentPage"] : 1;

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

    //默认排序，根据商品guid排序
    if($s_default){
        $res = $conn->query('select * from goods_data order by guid');
        if($res->num_rows > 0){
            $content = $res->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "没有满足条件的数据";
        }

        //获取数据的总长度
        $len = count($content);
        //根据传入数量页码切割数据
        $data = array_slice($content,($currentPage-1)*$qty,$qty);

        $finalRes = array(
            "data" => $data,
            "len" => $len,
            "qty" => $qty,
            "currentPage" => $currentPage
        );
        echo json_encode($finalRes,JSON_UNESCAPED_UNICODE);

        $res->close();
        $conn->close();
    }

    //价格升序排序，根据商品价格小到大
    if($price_up){
        $res = $conn->query('select * from goods_data order by gprice');
        if($res->num_rows > 0){
            $content = $res->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "没有满足条件的数据";
        }

        //获取数据的总长度
        $len = count($content);
        //根据传入数量页码切割数据
        $data = array_slice($content,($currentPage-1)*$qty,$qty);

        $finalRes = array(
            "data" => $data,
            "len" => $len,
            "qty" => $qty,
            "currentPage" => $currentPage
        );
        echo json_encode($finalRes,JSON_UNESCAPED_UNICODE);

        $res->close();
        $conn->close();
    }

    //价格升序排序，根据商品价格小到大
    if($price_down){
        $res = $conn->query('select * from goods_data order by gprice desc');
        if($res->num_rows > 0){
            $content = $res->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "没有满足条件的数据";
        }

        //获取数据的总长度
        $len = count($content);
        //根据传入数量页码切割数据
        $data = array_slice($content,($currentPage-1)*$qty,$qty);

        $finalRes = array(
            "data" => $data,
            "len" => $len,
            "qty" => $qty,
            "currentPage" => $currentPage
        );
        echo json_encode($finalRes,JSON_UNESCAPED_UNICODE);

        $res->close();
        $conn->close();
    }
    
?>