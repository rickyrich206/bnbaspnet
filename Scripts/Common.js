var noOfLoadersRunning = 0;
var strTemp = "";
var CurrentLoggedUser = {};

function CheckSesion(path) {
    $.ajax({
        type: "POST",
        dataType: 'Json',
        contentType: "application/json; charset=utf-8",
        url: path + 'PMS_Common.asmx/GetCookieVal',
        async: false,
        beforSend: function () {
            ShowLoader();
        },
        complete: function () {
            HideLoader();
        },
        success: function (data) {
            if (data.d == undefined || data.d == null || data.d == "") {
                LoginCalldialog("Your session has expired");
            }
            else {
                CurrentLoggedUser.UserId = data.d.UserId;
                CurrentLoggedUser.UserName = data.d.UserName;
                CurrentLoggedUser.Password = data.d.Password;
                CurrentLoggedUser.RoleId = data.d.RoleId;
            }
        },
        error: function (response) {
            LoginCalldialog("Your session has expired");
        }
    });
}

function ClearSession(path) {
    $.ajax({
        type: "POST",
        dataType: 'Json',
        contentType: "application/json; charset=utf-8",
        url: path + 'PMS_Common.asmx/ClearCookiVal',
        async: false,
        beforSend: function () {
            ShowLoader();
        },
        complete: function () {
            HideLoader();
        },
        success: function (data) {
            if (data.d == "1") {
                CurrentLoggedUser = {};
                //window.location.href = "../frmLogin.aspx"
            }
        },
        error: function (response) {
        }
    });
}

function ShowLoader(immediate, div) {
    if (div == undefined || div == null)
        div = $("#divLoading");

    noOfLoadersRunning++;
    if (noOfLoadersRunning == 1) {
        if (immediate)
            div.show();
        else
            div.slideDown(200);
    }
}

function HideLoader(immediate, div) {
    if (div == undefined || div == null)
        div = $("#divLoading");

    noOfLoadersRunning--;
    if (noOfLoadersRunning < 0)
        noOfLoadersRunning = 0;

    if (noOfLoadersRunning == 0) {
        if (immediate)
            div.hide();
        else
            div.slideUp(200);
    }
}

function Calldialog(val) {
    $.fx.speeds._default = 700;
    $("#Login_dialog").dialog(
    {
        autoOpen: false,
        show: "blind",
        width: 350,
        hide: "explode",
        modal: true,
        closeOnEscape: true,
        dialogClass: 'no-close',
        title: "Message..!!",
        buttons: {
            "Ok": function () {
                $("#Login_dialog").dialog("close");
                return false;
            }
        }
    });
    $("#Login_dialog").text(val).dialog("open");
    return true;
}

function LoginCalldialog(val) {
    $.fx.speeds._default = 700;
    $("#Login_dialog").dialog(
    {
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        },
        autoOpen: false,
        show: "blind",
        width: 350,
        hide: "explode",
        modal: true,
        closeOnEscape: false,
        dialogClass: 'no-close',
        title: "Message..!!",
        buttons: {
            "Ok": function () {
                $("#Login_dialog").dialog("close");
                window.location.href = '../frmLogin.aspx';
                return true;
            }
        }
    });
    $("#Login_dialog").text(val).dialog("open");
    return true;
}

function CalldialogLogin(val) {
    $.fx.speeds._default = 700;
    $("#Login_dialog").dialog(
    {
        autoOpen: false,
        show: "blind",
        width: 350,
        hide: "explode",
        modal: true,
        closeOnEscape: true,
        dialogClass: 'no-close',
        title: "Message..!!",
        buttons: {
            "Ok": function () {
                $("#Login_dialog").dialog("close");
                window.location.href = 'frmLogin.aspx';
                return true;
            }
        }
    });
    $("#Login_dialog").text(val).dialog("open");
    return true;
}

function ValidateEmail() {
    var EmailIdvalue = $("#txtEmailId").val();
    //\w+[a-zA-Z 0-9!@#$%^&*(.")}{]|
    if (EmailIdvalue == "") {
        return true;
    }
    if (EmailIdvalue.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    }
    else {
        $("#txtEmailId").css("background-color", "#f6d6d5").focus();
        Calldialog("Enter a valid email id.");
        return false;
    }
}

function ValidateMobile() {
    var mobile = $("#txtMobileNo").val();

    if (mobile.search(/^\+[0-9]+$/) != -1) {
        return true;
    }
    else {
        $("#txtMobileNo").css("background-color", "#f6d6d5").focus();
        Calldialog("Enter a valid mobile no");
        return false;
    }

}

function ValidateAlaphabetSpace(e) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || e.keyCode == 9 || regex.test(str)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

function ValidateAlaphabetSpace1(id) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid characters");
            $('#' + id).val("");
            return false;
        }
    }
}

function ValidateAlaphabetSpecial(e) {
    var regex = new RegExp('^[a-zA-Z 0-9!@#$%^&*(.")}{]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || e.keyCode == 9 || regex.test(str)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

function ValidateAlaphabetSpecial1(id) {
    var regex = new RegExp('^[a-zA-Z 0-9!@#$%^&*(.")}{]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid characters");
            $('#' + id).val("");
            return false;
        }
    }
}

function ValidateNumbersSpaceSpecial(e) {
    var regex = new RegExp('^[a-zA-Z]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || e.keyCode == 9 || regex.test(str)) {
        e.preventDefault();
        return false;
    }
    else {
        return true;
    }
}

function ValidateNumbersSpaceSpecial1(id) {
    var regex = new RegExp('^[a-zA-Z]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid characters");
            $('#' + id).val("");
            return false;
        }
        else {
            return true;
        }
    }
}

function ValidateAlphabetNumbers(e) {
    var regex = new RegExp('^[a-zA-Z0-9]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || e.keyCode == 9 || regex.test(str)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

function ValidateAlphabetNumbers1(id) {
    var regex = new RegExp('^[a-zA-Z0-9]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid characters");
            $('#' + id).val("");
            return false;
        }
    }
}

function ValidatePassword(e) {

    var regex = new RegExp('^[a-zA-Z 0-9!@#$%()_]+$');

    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else {
        if (str == "[" || str == "]") {
            return true;
        }
        else {
            e.preventDefault();
            return false;
        }
    }
}

function ValidateNumbers(e) {
    var regex = new RegExp('^[0-9]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || (e.keyCode == 46 && e.key == 'Delete') || e.keyCode == 9 || regex.test(str)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

function ValidateNumbers1(id) {
    var regex = new RegExp('^[0-9]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid numbers");
            $('#' + id).val("");
            return false;
        }
    }
}

//function ValidateNumeric(e) {
//    var regex = new RegExp('^[0-9.]+$');
//    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
//    if (regex.test(str)) {
//        return true;
//    }
//    else {
//        e.preventDefault();
//        return false;
//    }
//}

function ValidateNumeric1(id) {
    txttext = $('#' + id).val();

    var regex = new RegExp('^[0-9.]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            if (txttext.split('.').length > 2) {
                //$('#' + id).focus();
                $("#" + id).css("background-color", "#f6d6d5").focus();
                $("#" + id).val("");
                Calldialog("Please provide valid information...!");
                //setTimeout("$('#' + id).focus()", 50);
                return false;
            }
            if (txttext.split('.')[1] == '') {
                //$('#' + id).focus();
                $("#" + id).css("background-color", "#f6d6d5").focus();
                $("#" + id).val("");
                Calldialog("Please provide valid information...!");
                //setTimeout("$('#' + id).focus()", 50);
                return false;
            }
            else {
                if (txttext.length > 1 && txttext.split('.').length > 1) {
                    if (txttext.split('.')[1].length > 2) {
                        $("#" + id).css("background-color", "#f6d6d5").focus();
                        $("#" + id).val("");
                        Calldialog("Accepts values only till two decimal places");
                        return false;
                    }
                }
            }
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5").focus();
            Calldialog("Enter the valid numbers");
            $('#' + id).val("");
            return false;
        }
    }
}

function ValidateAlphabetNumbersSpace(e) {
    var regex = new RegExp('^[a-zA-Z0-9 ]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || e.keyCode == 9 || regex.test(str)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

function ValidateAlphabetNumbersSpace1(id) {
    var regex = new RegExp('^[a-zA-Z0-9 ]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid characters");
            $('#' + id).val("");
            return false;
        }
    }
}

function ValidateNumeric(elementRef) {
    var keyCodeEntered = (event.which) ? event.which : (window.event.keyCode) ? window.event.keyCode : -1;
    if ((keyCodeEntered >= 48) && (keyCodeEntered <= 57)) {
        if (elementRef.value.indexOf(".") != "-1") {
            var x = doGetCaretPosition(elementRef);
            if (x <= elementRef.value.indexOf(".")) {
                return true;
            }
            else {
                if (elementRef.value.length - (elementRef.value.indexOf(".")) > 2) {
                    return false;
                }
            }
        }
        return true;
    }
    else if (keyCodeEntered == 46) {
        if ((elementRef.value) && (elementRef.value.indexOf('.') >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    return false;
}

function doGetCaretPosition(ctrl) {
    var CaretPos = 0;
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        CaretPos = ctrl.selectionStart;
    }
    return (CaretPos);
}

function ValidateMobileNo(id) {
    var mobile = $("#" + id).val().trim();
    if (mobile != '') {
        mobile = mobile.replace('+', '');
        if (mobile.trim() == "") {
            $("#" + id).val('').css("background-color", "#f6d6d5").focus();
            Calldialog("Enter the Mobile No.");
            return false;
        }
    }
    //var phoneno = /^\+?([0-9])\)?$/;
    //var val = $('#' + id).val();
    //if (val.trim() != "") {
    //    if (phoneno.test(val)) {
    //        return true;
    //    }
    //    else {
    //        val = val.replace('+', '');
    //        val = val.trim();
    //       // if (val.length < 10 || val.length > 10) {
    //            $("#" + id).css("background-color", "#f6d6d5");
    //            Calldialog("Enter a valid mobile no.");
    //            $('#' + id).val("");
    //            return false;
    //      //  }
    //    }
    //}
    //else {
    //    return true;
    //}
}


function ValidateNumbersSpace(e) {
    var regex = new RegExp('^[0-9+ ]+$');
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (e.keyCode == 8 || e.keyCode == 9 || regex.test(str)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

function ValidateNumbersSpace1(id) {
    var regex = new RegExp('^[0-9+ ]+$');
    if ($('#' + id).val() != "") {
        var str = $('#' + id).val();
        if (regex.test(str)) {
            return true;
        }
        else {
            $("#" + id).css("background-color", "#f6d6d5");
            Calldialog("Enter the valid numbers");
            $('#' + id).val("");
            return false;
        }
    }
}

function SerialNo(value, row, index) {
    return index + 1;
}

function ValidateRatio1(id) {
    var value = $('#' + id).val();
    if (value == "") {
        return true;
    }
    if (value.search(/[0-9]+((\.|-)[0-9]+)*\:[0-9]+$/) != -1) {
        return true;
    }
    else {
        $('#' + id).val('').css("background-color", "#f6d6d5").focus();
        Calldialog("Enter a valid ratio.");
        return false;
    }
}

function ValidateRatio(elementRef) {
    var keyCodeEntered = (event.which) ? event.which : (window.event.keyCode) ? window.event.keyCode : -1;
    if ((keyCodeEntered >= 48) && (keyCodeEntered <= 57)) {
        if (elementRef.value.indexOf(":") != "-1") {
            var x = doGetCaretPosition(elementRef);
            if (x <= elementRef.value.indexOf(":")) {
                return true;
            }
        }
        return true;
    }
    else if (keyCodeEntered == 58) {
        if ((elementRef.value) && (elementRef.value.indexOf(':') >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    return false;
}

function RedirectCalldialog(val, url) {
    $.fx.speeds._default = 700;
    $("#Login_dialog").dialog(
    {
        autoOpen: false,
        show: "blind",
        width: 350,
        hide: "explode",
        modal: true,
        closeOnEscape: true,
        dialogClass: 'no-close',
        title: "Message..!!",
        buttons: {
            "Ok": function () {
                $("#Login_dialog").dialog("close");
                window.location.href = url;
                return true;
            }
        }
    });
    $("#Login_dialog").text(val).dialog("open");
    return true;
}

function getFileNameWithDate(strInput) {
    var strFileName = "";
    var strFileExtension = "";
    strFileName = strInput.substr(0, strInput.lastIndexOf('.'));
    strFileExtension = strInput.split(".").pop();
    return strFileName + getDate() + "." + strFileExtension;
}

function getDate() {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return day + "" + month + "" + year + "" + hour + "" + minute + "" + second;
}