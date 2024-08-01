<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $user_employeeId = $_POST['user_employeeId'];
    $user_password = $_POST['user_password'];

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $select_user = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysUsers] WHERE [usercode] = '$user_employeeId'");
        $rselect_user = $select_user->fetchall(PDO::FETCH_ASSOC);

        if (count($rselect_user)) {
            
            $usercode = $rselect_user[0]["PK_appsysUsers"];
            $userpass = $rselect_user[0]["userpass"];
            $lockaccount = $rselect_user[0]["lockaccount"];
            $fullname = $rselect_user[0]["pi_fullname"];
            $admin = $rselect_user[0]["usertype"];

            $decpt_userpass = secureToken::tokendecrypt($userpass);

            if ($decpt_userpass === $user_password) {
                
                $_SESSION['session_usercode'] = $usercode;
                $_SESSION['session_fullname'] = $fullname;

                $_SESSION['isLoggedIn'] = 1;
                $_SESSION['isDisabled'] = $lockaccount;
                $_SESSION['isAdmin'] = $admin;

                $response = array('status' => 200, 'message' => "Authentication Success");
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