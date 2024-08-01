<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $DepartmentID = $_POST['DepartmentID'];

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $verify_department = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysUsers] WHERE [FK_appsysDepartments] = '$DepartmentID'");
        $rverify_department = $verify_department->fetchall(PDO::FETCH_ASSOC);

        $select_department = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysDepartments] WHERE [PK_appsysDepartments] = '$DepartmentID'");
        $rselect_department = $select_department->fetchall(PDO::FETCH_ASSOC);

        if (count($rverify_department) == 0) {
            $response = array('status' => 200, 'message' => "Deparment not used!", 'access' => 1, 'dept' => $rselect_department);
            echo json_encode($response);
        } else if (count($rverify_department) > 0) {
            $response = array('status' => 200, 'message' => "Deparment is already use in user!", 'access' => 0);
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