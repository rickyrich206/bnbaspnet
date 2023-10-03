<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmLogin.aspx.cs" Inherits="PMS.frmLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="thumbnail" content="" />
    <title>Login</title>
    <link rel="stylesheet" href="Libraries/bootstrap.css" />
    <link rel="stylesheet" href="Libraries/bootstrap.min.css" />
    <link rel="stylesheet" href="Libraries/jquery-ui.min.css" />
    <link rel="stylesheet" href="Libraries/Style.css" />
    <script type="text/javascript" src="Libraries/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="Libraries/jquery-ui.min.js"></script>
    <script type="text/javascript" src="Libraries/moment.min.js"></script>
    <script type="text/javascript" src="Libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="Scripts/Common.js" defer="defer"></script>
    <script type="text/javascript" src="Scripts/Login.js" defer="defer"></script>
	<script async="async" type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=UA-138711792-1"></script>
    <script type="text/javascript">
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-138711792-1');
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <script type="text/javascript">
            var CurrentUser = {
                WebPath: '<%=ConfigurationManager.AppSettings["WebPath"] %>'
            };
            function ForgotPassword() {
                window.location.href = "frmForgotPassword.aspx";
            }
        </script>
        <div>
            <div id="wrapper">
                <div id="page-wrapper-bdesign">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="col-lg-3">
                            </div>
                            <div class="col-lg-6 rcorners2">
                                <div class="col-lg-12" align="center">

                                    <ol class="breadcrumb">
                                        <li class="active">
                                            <h1>Piggery Management Login </h1>
                                        </li>
                                    </ol>

                                </div>
                                <div class="col-lg-4">
                                    <label for="txtUserName">Username</label><span class="Mandatory">*</span>
                                </div>
                                <div class="col-lg-8">
                                    <div class="form-group">
                                        <input id="txtUserName" runat="server" class="form-control" maxlength="50" onkeypress="ValidateAlphabetNumbers(event);" title="UserName" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <label for="txtPassword">Password</label><span class="Mandatory">*</span>
                                </div>
                                <div class="col-lg-8">
                                    <div class="form-group">
                                        <input id="txtPassword" runat="server" class="form-control" maxlength="50" type="password" title="Password" />
                                    </div>
                                </div>
                                <div id="Login_dialog" class="Fields" style="display: none;"></div>
                                <div class="col-lg-12">
                                    <div id="divLoading" style="display: none; margin-bottom: 2px;" class="loading-bar">
                                        <button class="btn btn-warning btn-block disabled">
                                            <span class="glyphicon glyphicon-refresh spinning"></span>&nbsp;Please wait...
                                        </button>
                                        <a target="_blank" onclick=""></a>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="col-lg-3">
                                    </div>
                                    <div class="col-lg-6" align="center">
                                        <button id="btnLogin" type="submit" class="btn btn-primary" onclick="LoginValidate(); return false;">Login</button>
                                        <button id="btnForgotPassword" type="button" class="btn btn-link" onclick="ForgotPassword()">Forgot password</button>
                                    </div>
                                    <div class="col-lg-3">
                                    </div>
                                </div>
                                <div class="col-lg-12" align="center">
                                    &nbsp;
                                </div>
                            </div>
                            <div class="col-lg-3">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
