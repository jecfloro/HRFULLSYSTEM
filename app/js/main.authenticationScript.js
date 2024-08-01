"use strict"

import { defaultFormat, PasswordFormat, emailFormat, phoneFormat } from "./main.formatScript.js";
import { sweetAlertSuccess, sweetAlertError } from "./main.SweetAlert.js";

$("#authBtnLogin_submit").click(function(e) {

    e.preventDefault();

    var user_employeeId = $("#user_employeeId").val().trim();
    var user_password = $("#user_password").val().trim();

    if (user_employeeId == "") {
        sweetAlertError("Employee ID is empty!");
        return;
    }

    if (user_password == "") {
        sweetAlertError("Password is empty!");
        return;
    }

    if (!user_employeeId.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Employee ID!");
        return;
    }

    if (!user_password.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Password!");
        return;
    }

    $.ajax({
        url: '../../app/functions/authentication/fn_authentication.php',
        type: 'POST',
        data: {
            user_employeeId: user_employeeId,
            user_password: user_password
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                location.reload(); 
            }
            if (status.status == 401) {
                sweetAlertError("Incorrect username or password!");
            }
            if (status.status == 404) {
                sweetAlertError("Incorrect username or password!");
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

});