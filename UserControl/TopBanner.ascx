<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TopBanner.ascx.cs" Inherits="PMS.UserControl.TopBanner" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <title>Breed Master</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <!-- Favicon -->
    <link href="favicon.ico" rel="shortcut icon">
    <link rel="stylesheet" href="../Libraries/bootstrap.min.css" />
    <script type="text/javascript" src="../Libraries/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Libraries/jquery-ui.min.js"></script>
    <%--<script language="javascript" type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>--%>
    <link rel="stylesheet" href="../Libraries/jquery-ui.min.css" />
    <link href="../Libraries/bootstrap.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../Libraries/bootstrap-table.min.css" />
    <script src="../Libraries/moment.min.js"></script>
    <script src="../Libraries/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../Libraries/bootstrap-datetimepicker.min.css" />
    <script type="text/javascript" src="../Libraries/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="../Libraries/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/Common.js" defer="defer"></script>
    <script type="text/javascript" src="../Scripts/RoleMenu.js" defer="defer"></script>
    <script src="../Libraries/bootstrap-multiselect.js"></script>
    <link href="../Libraries/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="../Libraries/Chart.bundle.js"></script>
    <script src="../Libraries/utils.js"></script>
 <script async="async" type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=UA-138711792-1"></script>
    <script type="text/javascript">
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-138711792-1');
    </script>
    <style>
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: white;
        }

        ::-webkit-scrollbar {
            width: 7px;
            height: 6px;
            background-color: white;
        }

        ::-webkit-scrollbar-thumb {
            background-color: maroon;
        }
        
.no-margin {
    margin: 0px !important;
}

.no-padding {
    padding: 0px !important;
}

        .dropdown-submenu {
            position: relative;
        }

            .dropdown-submenu > .dropdown-menu {
                top: 0;
                left: 100%;
                margin-top: -6px;
                margin-left: -1px;
                -webkit-border-radius: 0 6px 6px 6px;
                -moz-border-radius: 0 6px 6px;
                border-radius: 0 6px 6px 6px;
            }

            .dropdown-submenu:hover > .dropdown-menu {
                display: block;
            }

            .dropdown-submenu:hover > a:after {
                border-left-color: #fff;
                display: block;
            }

            .dropdown-submenu.pull-left {
                float: none;
            }

                .dropdown-submenu.pull-left > .dropdown-menu {
                    left: -100%;
                    margin-left: 10px;
                    -webkit-border-radius: 6px 0 6px 6px;
                    -moz-border-radius: 6px 0 6px 6px;
                    border-radius: 6px 0 6px 6px;
                }
    </style>
    <script type="text/javascript">
        var CurrentBannerRole = {
        <%--Id: '<%= Session["RoleId"] %>',
            UserName: '<%= Session["UserName"] %>',--%>
            WebPath: '<%=ConfigurationManager.AppSettings["WebPath"] %>'
        };
        function ConfirmLogout(val) {
            $("#dialog_Logout").dialog(
            {
                autoOpen: false,
                show: "blind",
                width: 350,
                hide: "explode",
                modal: true,
                closeOnEscape: false,
                dialogClass: 'no-close',
                title: "Message..!!",
                buttons: {
                    "Yes": function () {
                        setTimeout("CallLogout()", 500);
                        $("#dialog_Logout").dialog("close");
                        return true;
                    },
                    "No": function () {
                        $("#dialog_Logout").dialog("close");
                        return false;
                    }
                }
            });
            $("#dialog_Logout").text("Are you sure want to Logout?").dialog("open");
            return false;
        }

        function CallLogout() {
            ClearSession(CurrentBannerRole.WebPath);
            window.location = '../frmLogin.aspx';
            return true;
        }
    </script>
    <style>
        .navbar {
            min-height: 10px;
        }

        .navbar-brand {
            padding: 0 10px;
            height: 10px;
            line-height: 10px;
        }

        .navbar-template {
            padding: 40px 15px;
        }
    </style>
</head>
<body>
    <table id="tblTopBanner" runat="server" align="center" width="100%" cellspacing="0"
        cellpadding="0" border="0" class="bantable-color">
        <tr>
            <td colspan="3" style="padding-left: 10px;">

                <table width="98%" align="center">
                    <tr>
                        <td align="left" width="20%">
                            <img src="../Images/logo.png" alt="university logo" width="40%" /><br />
                            <span class="Banner_subhead">TANUVAS</span>
                        </td>
                        <td align="center" width="60%">
                            <span class="Banner_head">Directorate Centre for Animal Production Studies</span><br />
                            <span class="Banner_subhead">POST GRADUATE RESEARCH INSTITUTE IN ANIMAL SCIENCES, KATTUPAKKAM</span><br />
                            <span class="Banner_smallhead">Kanchipuram District-603203, Tamil Nadu, India.</span><br />
                            <span class="Banner_subhead">Pig Breeding Unit</span>
                        </td>
                        <td align="right" width="20%" style="padding-right: 5px">
                            <img src="../Images/icar.png" width="74" height="74" alt="icar logo">
                        </td>
                    </tr>
                </table>

                <div class="navbar navbar-default " role="navigation" style="padding-left: 10px;">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#divMenu">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="divMenu">
                        <ul class="nav navbar-nav">
                            <li>
                                <ul class="nav navbar-nav" id="menuD">
                                    <li><a tabindex="-1" id="0" href="../Dashboard/frmDashboard.aspx">Dashboard</a></li>
                                </ul>
                            </li>
                            <li>
                                <ul id="menuA" class="nav navbar-nav">
                                </ul>
                            </li>
                            <li>
                                <ul id="menuB" class="nav navbar-nav">
                                </ul>
                            </li>
                            <li>
                                <ul id="menuC" class="nav navbar-nav">
                                </ul>
                            </li>
                        </ul>
                        <%--  <ul class="nav navbar-nav">
                        <li>
                            <ul class="nav navbar-nav collapse navbar-collapse">
                                <li>
                                    <a>
                                        <label id="lblUserName" runat="server" style="vertical-align: text-bottom; text-transform: uppercase;">Welcome : </label>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>--%>

                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <ul class="nav navbar-nav collapse navbar-collapse">
                                    <li>
                                        <a>
                                            <label id="lblUserName" for="UserName" runat="server" style="vertical-align: text-bottom; text-transform: uppercase;">Welcome : </label>
                                            <input type="text" id="UserName" style="display: none;" />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul class="nav navbar-nav">
                                    <li>
                                        <a href="../Master/frmChangePassword.aspx">
                                            <img src="../Images/change_password.png" alt="change password logo"></a>
                                    </li>
                                </ul>
                                <ul class="nav navbar-nav">
                                    <li><a href="#">
                                        <img src="../Images/logout.png" alt="logout logo" onclick="ConfirmLogout(); return false;"></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <!--/.nav-collapse -->
                    <%--</div>--%>
                </div>
                <div id="dialog_Logout" class="Fields" style="display: none;">
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
