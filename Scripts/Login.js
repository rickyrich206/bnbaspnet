var ipaddress = "";
var strEncrypt = "";
var CurrentLogin = {
};
$(document).ready(function () {
    ClearSession(CurrentUser.WebPath);
    var bootstrapButton = $.fn.button.noConflict();
    $.fn.bootstrapBtn = bootstrapButton;
    $.getJSON("http://jsonip.com?callback=?", function (data) {
        ipaddress = data.ip;
        //if (data.ip == "122.165.76.83") {            
        //    $("#txtUserName").val("support");
        //    $("#txtPassword").val("supportmay@17");
        //}
    });
});

function LoginValidate() {
    CurrentLogin.UserId = "0";
    CurrentLogin.UserName = $("#txtUserName").val();
    CurrentLogin.Password = $("#txtPassword").val();
    CurrentLogin.RoleId = "0";
    CurrentLogin.IPAddress = ipaddress;
    CurrentLogin.Result = "0";

    $("#txtUserName").css("background-color", "#ffffff");
    $("#txtxPassword").css("background-color", "#ffffff");

    if (CurrentLogin.UserName == "") {
        $("#txtUserName").css("background-color", "#f6d6d58f").focus();
        Calldialog("Enter the username.");
        return false;
    }
    if (CurrentLogin.Password == "") {
        $("#txtPassword").css("background-color", "#f6d6d58f").focus();
        Calldialog("Enter the password.");
        return false;
    }

    if (CurrentLogin.UserName != "" && CurrentLogin.Password != "") {
        ShowLoader();
        $.ajax({
            type: 'POST',
            url: CurrentUser.WebPath + 'PMS_Master.asmx/LoginRetrieve',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ log: CurrentLogin }),
            async: true,
            success: function (msg) {
                if (msg.d.Result == 1) {
                    //SetSession(msg.d.UserId,msg.d.UserName, msg.d.Password,msg.d.RoleId);                    
                    setTimeout('Dashboard()', 2000);
                    //window.location.href = 'Dashboard/frmDashboard.aspx';
                }
                else if (msg.d.Result == 2) {
                    $("#txtUserName").css("background-color", "#f6d6d58f").focus();
                    Calldialog("Enter a valid username.");
                    HideLoader();
                }
                else if (msg.d.Result == 3) {
                    $("#txtPassword").css("background-color", "#f6d6d58f").focus();
                    Calldialog("Enter the correct password.");
                    HideLoader();
                }
                else if (msg.d.Result == 4) {
                    Calldialog("The username is inactive, contact the administrator.");
                    HideLoader();
                }
            },
            error: function (msg) {
                Calldialog("Error in Login!");
                HideLoader();
            }
        });
    }
}

function Dashboard() {
    window.location.href = 'Dashboard/frmDashboard.aspx';
    HideLoader();
}

function SetSession(strUserId, strUserName, strPassword, strRoleId) {
    $.ajax({
        type: 'POST',
        url: 'frmLogin.aspx/SetSession',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ UserId: strUserId, UserName: strUserName, Password: strPassword, RoleId: strRoleId }),
        success: function () {
        },
        error: function (msg) {
            alert('failure.');
        }
    });
}

//function ClearSession() {
//    $.ajax({
//        type: 'POST',
//        url: 'frmLogin.aspx/ClearSession',
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json',
//        success: function () {
//        },
//        error: function (msg) {
//        }
//    });
//}