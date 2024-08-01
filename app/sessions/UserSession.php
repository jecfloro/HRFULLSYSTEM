<?php

    include '../connection/SQLSERVER.php';

    echo $_SESSION['isLoggedIn'];
    echo $_SESSION['isDisabled'];
    echo $_SESSION['isAdmin'];

    if ($_SESSION['isLoggedIn'] == 1 && $_SESSION['isDisabled'] == 0 && $_SESSION['isAdmin'] == 1) {
        header("Location: ../../user/administrator/dashboard-hr.php");
    } else {

        $_SESSION['isLoggedIn'] = 0;
        $_SESSION['isDisabled'] = 0;
        $_SESSION['isAdmin'] = 0;

        session_start(); //to ensure you are using same session
        session_destroy(); //destroy the session
    }
    
?>