<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $GroupID = $_POST['GroupID'];

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $select_group = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysGroups] WHERE [PK_appsysGroups] = '$GroupID'");
        $rselect_group = $select_group->fetchall(PDO::FETCH_ASSOC);

        if (count($rselect_group) > 0) {
            $response = array('status' => 200, 'group' => $rselect_group);
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