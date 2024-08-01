<?php

    include '../../connection/SQLSERVER.php';
    require '../../setting/AESCLASS.php';

    
    date_default_timezone_set("Asia/Manila");
    $year_start = date("Y");
    $year_end = date("Y")+1;
    $date = date("Y-m-d");
    $todaysDate = date("Y-m-d H:i:s");

    $usercode = $_SESSION['session_usercode'];
    $ii_groupcodeedit = $_POST['ii_groupcodeedit'];
    $ii_groupnameedit = strtoupper($_POST['ii_groupnameedit']);
    $ii_passwordedit = $_POST['ii_passwordedit'];

    try {
        $conn = new PDO("sqlsrv:server=$TS8_dbserver;database=$TS8_dbname", $TS8_dbuser, $TS8_dbpassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $select_user = $conn->query("SELECT * FROM [RMCI.SYS].[dbo].[appsysUsers] WHERE [PK_appsysUsers] = '$usercode'");
        $rselect_user = $select_user->fetchall(PDO::FETCH_ASSOC);

        if (count($rselect_user)) {
            
            $userpass = $rselect_user[0]["userpass"];

            $decpt_userpass = secureToken::tokendecrypt($userpass);

            if ($decpt_userpass === $ii_passwordedit) {

                $edit_group = $conn->query("UPDATE [RMCI.SYS].[dbo].[appsysGroups] SET [group_name] = '$ii_groupnameedit' WHERE [PK_appsysGroups] = '$ii_groupcodeedit'");
                $edit_group->execute();
                $cedit_group = $edit_group->rowCount();

                if ($cedit_group > 0) {
                    $response = array('status' => 200, 'message' => "Group Updated!");
                    echo json_encode($response);
                } else {
                    $response = array('status' => 500, 'message' => "Server Error, Please contact administrator!");
                    echo json_encode($response);
                }

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