<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $ii_groupname = strtoupper($_POST['ii_groupname']);

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $select_group = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysGroups] WHERE [group_name] = '$ii_groupname'");
        $rselect_group = $select_group->fetchall(PDO::FETCH_ASSOC);

        if (count($rselect_group) <= 0) {

            $insert = $conn->query("IF NOT EXISTS (SELECT * FROM [RMCI.SYS].[dbo].[appsysGroups] WHERE [group_name] = '$ii_groupname') BEGIN INSERT INTO [RMCI.SYS].[dbo].[appsysGroups] ([group_name], [group_created]) VALUES ('$ii_groupname','$todaysDate') END");
            $insert->execute();

            $response = array('status' => 200, 'message' => "Group Added!");
            echo json_encode($response);

        } else if (count($rselect_group) > 0) {
            $response = array('status' => 403, 'message' => "Group already exists!");
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