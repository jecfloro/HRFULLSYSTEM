const sweetAlertSuccess = function sweetAlertSuccess(message) {

    Swal.fire({
        text: message,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Okay",
        customClass: {
            confirmButton: "btn btn-darkgreen"
        },
        timer: 2000,
        timerProgressBar: true,
    });

}

const sweetAlertError = function sweetAlertError(message) {

    Swal.fire({
        text: message,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn btn-danger"
        },
        timer: 2000,
        timerProgressBar: true,
    });

}

export { sweetAlertSuccess, sweetAlertError }

