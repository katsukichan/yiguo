<?php
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

    $res = $conn->query('select * from index_data');
    if($res->num_rows > 0){
		$content = $res->fetch_all(MYSQLI_ASSOC);
		echo json_encode($content,JSON_UNESCAPED_UNICODE);
	}else{
	    echo "没有满足条件的数据";
    }
	
	$res->close();
    $conn->close();
?>