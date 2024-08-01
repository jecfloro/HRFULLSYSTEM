"use strict"

import { defaultFormat, PasswordFormat, emailFormat, phoneFormat } from "./main.formatScript.js";
import { sweetAlertSuccess, sweetAlertError } from "./main.SweetAlert.js";

$("[data-ii-dept-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_group = $("#ii_group").val();
    var ii_departmentname = $("#ii_departmentname").val().trim();

    if (ii_group == "") {
        sweetAlertError("Select Department Group!");
        return;
    }

    if (ii_departmentname == "") {
        sweetAlertError("Department Name is empty!");
        return;
    }

    if (!ii_departmentname.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Department Name!");
        return;
    }

    $.ajax({
        url: '../../app/functions/administrator/fn_addhrDepartments.php',
        type: 'POST',
        data: {
            ii_group: ii_group,
            ii_departmentname: ii_departmentname
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                $("#ii_departmentname").val("");
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

    var DepartmentID = this.getAttribute("data-ii-val");

    $.ajax({
        url: '../../app/functions/administrator/fn_SearchhrDepartments.php',
        type: 'POST',
        data: {
            DepartmentID: DepartmentID
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                $("#ii_departmentedit").val(status.dept[0]["FK_appsysGroups"])
                $("#ii_departmentcodeedit").val(status.dept[0]["PK_appsysDepartments"]);
                $("#ii_departmentnameedit").val(status.dept[0]["department_name"]);
            }
            if (status.status == 500) {
                sweetAlertError(status.message);
            }
        },
        error: function(response) {
            sweetAlertError("Server Error, Please contact administrator!");
        }
    })

    $("#modal_hrDepartmentsEdit").modal("show");

});

$("[data-ii-deptedit-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_departmentcodeedit = $("#ii_departmentcodeedit").val();
    var ii_departmentedit = $("#ii_departmentedit").val().trim();
    var ii_departmentnameedit = $("#ii_departmentnameedit").val().trim();
    var ii_passwordedit = $("#ii_passwordedit").val().trim();

    if (ii_departmentedit == "") {
        sweetAlertError("Select Department Group!");
        return;
    }

    if (ii_departmentnameedit == "") {
        sweetAlertError("Department Name is empty!");
        return;
    }
    
    if (!ii_departmentnameedit.match(defaultFormat)) {
        sweetAlertError("Invalid Characters on Department Name!");
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
        url: '../../app/functions/administrator/fn_edithrDepartments.php',
        type: 'POST',
        data: {
            ii_departmentcodeedit: ii_departmentcodeedit,
            ii_departmentedit: ii_departmentedit,
            ii_departmentnameedit: ii_departmentnameedit,
            ii_passwordedit: ii_passwordedit
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                sweetAlertSuccess(status.message);
                $("#modal_hrDepartments").modal("hide");
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

    var DepartmentID = this.getAttribute("data-ii-val");

    $.ajax({
        url: '../../app/functions/administrator/fn_VerifyhrDepartments.php',
        type: 'POST',
        data: {
            DepartmentID: DepartmentID
        },
        cache: false,
        success: function(response) {
            var status = JSON.parse(response);
            if (status.status == 200) {
                
                if (status.access == 0) {
                    sweetAlertError(status.message);
                }

                if (status.access == 1) {
                    $("#ii_departmentcodedelete").val(status.dept[0]["PK_appsysDepartments"]);
                    $("#modal_hrDeparmentsDelete").modal("show");
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

$("[data-ii-deptdelete-modal-action='submit']").click(function(e) {

    e.preventDefault();

    var ii_departmentcodedelete = $("#ii_departmentcodedelete").val().trim();
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
        url: '../../app/functions/administrator/fn_deletehrDepartments.php',
        type: 'POST',
        data: {
            ii_departmentcodedelete: ii_departmentcodedelete,
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