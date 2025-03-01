<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $usercode = $_SESSION['session_usercode'];
    $ii_departmentcodedelete = $_POST['ii_departmentcodedelete'];
    $ii_password = $_POST['ii_password'];

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $select_user = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysUsers] WHERE [PK_appsysUsers] = '$usercode'");
        $rselect_user = $select_user->fetchall(PDO::FETCH_ASSOC);

        if (count($rselect_user)) {
            
            $userpass = $rselect_user[0]["userpass"];

            $decpt_userpass = secureToken::tokendecrypt($userpass);

            if ($decpt_userpass === $ii_password) {

                $delete_department = $conn->query("DELETE FROM [RMCI.SYS].[dbo].[appsysDepartments] WHERE [PK_appsysDepartments] = '$ii_departmentcodedelete'");
                $delete_department->execute();
                $cdelete_department = $delete_department->rowCount();

                $response = array('status' => 200, 'message' => "Department Deleted!");
                echo json_encode($response);

            } else {
                $response = array('status' => 401, 'message' => "Authentication Failed");
                echo json_encode($response);
            }
            
        } else {
            $response = array('status' => 404, 'message' => "User not Found");
            echo json_encode($response);
        }

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    
    $conn = null;

?>