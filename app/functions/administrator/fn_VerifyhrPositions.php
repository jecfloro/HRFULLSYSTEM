<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $PositionID = $_POST['PositionID'];

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $verify_position = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysUsers] WHERE [FK_appsysPositions] = '$PositionID'");
        $rverify_position = $verify_position->fetchall(PDO::FETCH_ASSOC);
        
        $select_position = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysPositions] WHERE [PK_appsysPositions] = '$PositionID'");
        $rselect_position = $select_position->fetchall(PDO::FETCH_ASSOC);

        if (count($rverify_position) == 0) {
            $response = array('status' => 200, 'message' => "Position not used!", 'access' => 1, 'position' => $rselect_position);
            echo json_encode($response);
        } else if (count($rverify_position) > 0) {
            $response = array('status' => 200, 'message' => "Position is already assigned in user!", 'access' => 0);
            echo json_encode($response);
        } else {
            $response = array('status' => 500, 'message' => "Server Error, Please contact administrator!");
            echo json_encode($response);
        }

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    
    $conn = null;

?>