<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmReminder.aspx.cs" Inherits="PMS.Html.frmReminder" %>

<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Reminder</title>
    <link href="favicon.ico" rel="shortcut icon">
    <link rel="stylesheet" href="../Libraries/bootstrap.min.css" />
    <script type="text/javascript" src="../Libraries/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Libraries/jquery-ui.min.js"></script>

    <link rel="stylesheet" href="../Libraries/jquery-ui.min.css" />
    <link href="../Libraries/bootstrap.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../Libraries/bootstrap-table.min.css" />
    <script src="../Libraries/moment.min.js"></script>
    <script src="../Libraries/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../Libraries/bootstrap-datetimepicker.min.css" />
    <script type="text/javascript" src="../Libraries/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="../Libraries/bootstrap-datetimepicker.min.js"></script>
    <script src="../Libraries/bootstrap-multiselect.js"></script>
    <link href="../Libraries/bootstrap-multiselect.css" rel="stylesheet" />

    <script type="text/javascript" src="../Scripts/Reminder.js" defer="defer"></script>
    <script type="text/javascript" src="../Scripts/Common.js" defer="defer"></script>
</head>
<body class="body">
    <form id="form1" runat="server">
        <script type="text/javascript">
            var CurrentUser = {
                <%--Id: '<%= Session["UserId"] %>',
                RoleId: '<%= Session["RoleId"] %>',--%>
                WebPath: '<%=ConfigurationManager.AppSettings["WebPath"] %>',
                ExcelPath: '<%=ConfigurationManager.AppSettings["Site"] %>'
            };
        </script>
        <%
            string strDay = "";
            string strMonth = "";
            string strYear = "";
            string strDate = "";
            if (System.DateTime.Now.Day.ToString().Length == 1)
            {
                strDay = "0" + System.DateTime.Now.Day.ToString();
            }
            else
            {
                strDay = System.DateTime.Now.Day.ToString();
            }

            if (System.DateTime.Now.Month.ToString().Length == 1)
            {
                strMonth = "0" + System.DateTime.Now.Month.ToString();
            }
            else
            {
                strMonth = System.DateTime.Now.Month.ToString();
            }
            strYear = System.DateTime.Now.Year.ToString();
            strDate = strDay + "/" + strMonth + "/" + strYear;
        %>
        <div class="row">
            <div class="col-lg-12">
                <h3>
                    <ol class="breadcrumb">
                        <li class="active">Reminder Popup for <%=strDate %></li>
                    </ol>
                    <h3></h3>
                </h3>
            </div>
            <div id="Login_dialog" class="Fields" style="display: none;"></div>
            <div id="dialog_new" class="Fields" style="display: none;">
            </div>
            <div class="col-lg-12">
                <div class="col-lg-12" id="divVaccination" style="display: none" runat="server">
                    <span style="color: green"><strong>Vaccination Reminder</strong></span>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-10">
                    <button id="btnExportVaccication" style="display: none;" type="button" class="btn btn-success pull-right" onclick="ExportVaccination();"><strong>Export to Excel</strong></button>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-10">
                    <table id="tblVaccination" style="word-break: break-all;"></table>
                </div>
            </div>
            <div class="col-lg-12">
                <br />
                <div class="col-lg-12" id="divWeight" style="display: none" runat="server">
                    <span style="color: green"><strong>Body Weight Reminder</strong></span>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <button id="btnExportWeight" style="display: none;" type="button" class="btn btn-success pull-right" onclick="ExportWeight();"><strong>Export to Excel</strong></button>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <table id="tblWeight" style="word-break: break-all;"></table>
                </div>
            </div>
            <div class="col-lg-12">
                <br />
                <div class="col-lg-12" id="divWeaning" style="display: none" runat="server">
                    <span style="color: green"><strong>Weaning Reminder</strong></span>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-8">
                    <button id="btnExportWeaning" style="display: none;" type="button" class="btn btn-success pull-right" onclick="ExportWeaning();"><strong>Export to Excel</strong></button>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-8">
                    <table id="tblWeaning" style="word-break: break-all;"></table>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
