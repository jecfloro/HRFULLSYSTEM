"use strict"

import { defaultFormat, PasswordFormat, emailFormat, phoneFormat } from "./main.formatScript.js";
import { sweetAlertSuccess, sweetAlertError } from "./main.SweetAlert.js";

$("[data-ii-position-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_positionname = $("#ii_positionname").val().trim();

    if (ii_positionname == "") {
        sweetAlertError("Position Name is empty!");
        return;
    }

    if (!ii_positionname.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Position Name!");
        return;
    }

    $.ajax({
        url: '../../app/functions/administrator/fn_addhrPositions.php',
        type: 'POST',
        data: {
            ii_positionname: ii_positionname
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                $("#ii_positionname").val("");
            }
            if (status.status == 403) {
                sweetAlertError(status.message);
            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

});

$(".datainput [data-ii-input-edit-action='edit']").click(function(e) {

    e.preventDefault();

    var PositionID = this.getAttribute("data-ii-val");

    $.ajax({
        url: '../../app/functions/administrator/fn_SearchhrPositions.php',
        type: 'POST',
        data: {
            PositionID: PositionID
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                $("#ii_positioncodeedit").val(status.position[0]["PK_appsysPositions"]);
                $("#ii_positionnameedit").val(status.position[0]["position_name"]);
            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

    $("#modal_hrPositionsEdit").modal("show");

});

$("[data-ii-positionedit-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_positioncodeedit = $("#ii_positioncodeedit").val();
    var ii_positionnameedit = $("#ii_positionnameedit").val().trim();
    var ii_passwordedit = $("#ii_passwordedit").val().trim();

    if (ii_positionnameedit == "") {
        sweetAlertError("Position Name is empty!");
        return;
    }
    
    if (!ii_positionnameedit.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Position Name!");
        return;
    }

    if (ii_passwordedit == "") {
        sweetAlertError("Password is empty!");
        return;
    }
    
    if (!ii_passwordedit.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Password!");
        return;
    }

    $.ajax({
        url: '../../app/functions/administrator/fn_edithrPosition.php',
        type: 'POST',
        data: {
            ii_positioncodeedit: ii_positioncodeedit,
            ii_positionnameedit: ii_positionnameedit,
            ii_passwordedit: ii_passwordedit
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                $("#modal_hrPositionsEdit").modal("hide");
                setTimeout(() => {
                    location.reload();
                  }, 1000);
            }
            if (status.status == 401) {
                sweetAlertError("Incorrect username or password!");
            }
            if (status.status == 404) {
                sweetAlertError("Incorrect username or password!");
            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

});

$(".datainput [data-ii-input-delete-action='delete']").click(function(e) {

    e.preventDefault();

    var PositionID = this.getAttribute("data-ii-val");

    $.ajax({
        url: '../../app/functions/administrator/fn_VerifyhrPositions.php',
        type: 'POST',
        data: {
            PositionID: PositionID
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                
                if (status.access == 0) {
                    sweetAlertError(status.message);
                }

                if (status.access == 1) {
                    $("#ii_positioncodedelete").val(status.position[0]["PK_appsysPositions"]);
                    $("#modal_hrPositionsDelete").modal("show");
                }

            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

});

$("[data-ii-positiondelete-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_positioncodedelete = $("#ii_positioncodedelete").val().trim();
    var ii_password = $("#ii_password").val().trim();

    if (ii_password == "") {
        sweetAlertError("Password is empty!");
        return;
    }
    
    if (!ii_password.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Password!");
        return;
    }

    $.ajax({
        url: '../../app/functions/administrator/fn_deletehrPosition.php',
        type: 'POST',
        data: {
            ii_positioncodedelete: ii_positioncodedelete,
            ii_password: ii_password
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                setTimeout(() => {
                    location.reload();
                  }, 1000);

            }
            if (status.status == 401) {
                sweetAlertError("Incorrect username or password!");
            }
            if (status.status == 404) {
                sweetAlertError("Incorrect username or password!");
            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

});