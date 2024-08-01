"use strict"

import { defaultFormat, PasswordFormat, emailFormat, phoneFormat } from "./main.formatScript.js";
import { sweetAlertSuccess, sweetAlertError } from "./main.SweetAlert.js";

$("[data-ii-deptgroup-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_groupname = $("#ii_groupname").val().trim();

    if (ii_groupname == "") {
        sweetAlertError("Group Name is empty!");
        return;
    }

    if (!ii_groupname.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Group Name!");
        return;
    }

    $.ajax({
        url: '../../app/functions/administrator/fn_addhrGroupDepartments.php',
        type: 'POST',
        data: {
            ii_groupname: ii_groupname
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                $("#ii_groupname").val("");
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

    var GroupID = this.getAttribute("data-ii-val");

    $.ajax({
        url: '../../app/functions/administrator/fn_SearchhrGroupDepartments.php',
        type: 'POST',
        data: {
            GroupID: GroupID
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                $("#ii_groupcodeedit").val(status.group[0]["PK_appsysGroups"]);
                $("#ii_groupnameedit").val(status.group[0]["group_name"]);
            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

    $("#modal_hrGroupDeparmentsEdit").modal("show");

});

$("[data-ii-deptgroupedit-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_groupcodeedit = $("#ii_groupcodeedit").val().trim();
    var ii_groupnameedit = $("#ii_groupnameedit").val().trim();
    var ii_passwordedit = $("#ii_passwordedit").val().trim();

    if (ii_groupnameedit == "") {
        sweetAlertError("Group Name is empty!");
        return;
    }
    
    if (!ii_groupnameedit.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Group Name!");
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
        url: '../../app/functions/administrator/fn_edithrGroupDepartments.php',
        type: 'POST',
        data: {
            ii_groupcodeedit: ii_groupcodeedit,
            ii_groupnameedit: ii_groupnameedit,
            ii_passwordedit: ii_passwordedit
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                $("#ii_groupnameedit").val("");
                $("#modal_hrGroupDeparmentsEdit").modal("hide");
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

    var GroupID = this.getAttribute("data-ii-val");

    $.ajax({
        url: '../../app/functions/administrator/fn_VerifyhrGroupDepartments.php',
        type: 'POST',
        data: {
            GroupID: GroupID
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                
                if (status.access == 0) {
                    sweetAlertError(status.message);
                }

                if (status.access == 1) {
                    $("#ii_groupcodedelete").val(status.group[0]["PK_appsysGroups"]);
                    $("#modal_hrGroupDeparmentsDelete").modal("show");
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

$("[data-ii-deptgroupdelete-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_groupcodedelete = $("#ii_groupcodedelete").val().trim();
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
        url: '../../app/functions/administrator/fn_deletehrGroupDepartments.php',
        type: 'POST',
        data: {
            ii_groupcodedelete: ii_groupcodedelete,
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
