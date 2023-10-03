<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmFarrowingDetails.aspx.cs" Inherits="PMS.Entries.frmFarrowingDetails" %>

<%@ Register Src="~/UserControl/TopBanner.ascx" TagPrefix="uc1" TagName="TopBanner" %>
<%@ Register Src="~/UserControl/BottomBanner.ascx" TagPrefix="uc2" TagName="TopBanner" %>
<%@ Register Src="~/UserControl/PigDetail.ascx" TagPrefix="uc3" TagName="PigDetail" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Farrowing Details</title>
</head>
<body class="body">
    <form id="form1" runat="server">
        <script type="text/javascript">
            var CurrentUser = {
              <%--  Id: '<%= Session["UserId"] %>',
                RoleId: '<%= Session["RoleId"] %>',--%>
                WebPath: '<%=ConfigurationManager.AppSettings["WebPath"] %>'
            };
        </script>
        <div class="row">
            <uc1:TopBanner ID="TopBanner1" runat="server" />
            <div class="col-lg-12">
                <h3>
                    <ol class="breadcrumb">
                        <li class="active">Farrowing details</li>
                    </ol>
                    <h3></h3>
                </h3>
            </div>
            <div class="col-lg-12 line">
            </div>
            <div class="col-lg-12">
                <br />
                <div class="col-lg-2">
                </div>
                <div class="col-lg-1">
                    Tag no.<span class="Mandatory">*</span>
                </div>
                <div class="col-lg-2">
                    <div class="form-group">
                        <input id="txtTagno" class="form-control text-uppercase" maxlength="50" onkeypress="ValidateAlphabetNumbers(event);" onblur="ValidateAlphabetNumbers1(this.id);" />
                    </div>
                </div>
                <div class="col-lg-2">
                    <button id="btnLoad" type="button" class="btn btn-primary" onclick="LoadPigDetail(); return false;">Load</button>
                </div>
                <div class="col-lg-2">
                </div>
                <div class="col-lg-1">
                    Status<span class="Mandatory">*</span>
                </div>
                <div class="col-lg-2">
                    <label id="lblStatus" class="form-control"></label>
                </div>
            </div>
            <div class="col-lg-12">
                <uc3:PigDetail ID="PigDetail" runat="server" />
            </div>
            <div class="col-lg-12">
                <div class="col-lg-12" id="div1" runat="server">
                    <span style="color: green"><strong>Deworming Details</strong></span>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-1">
                    Date of Deworming<span class="Mandatory">*</span>
                </div>
                <div class="col-lg-2">
                    <div class="input-group date" id="dateTimePickerDOD">
                        <input type="text" class="form-control" id="txtDOD" placeholder="DD/MM/YYYY" onblur="CheckDewormingDate()" />
                        <span class="input-group-addon btn">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="col-lg-1">
                </div>
                <div class="col-lg-1">
                    Deworming Name<span class="Mandatory">*</span>
                </div>
                <div class="col-lg-2">
                    <input id="txtDewormingName" class="form-control" maxlength="150" />
                </div>
                <div class="col-lg-1">
                </div>
                <div class="col-lg-1">
                    Dose and Route<span class="Mandatory">*</span>
                </div>
                <div class="col-lg-2">
                    <input id="txtDoseRoute" class="form-control" maxlength="150" />
                </div>
                <div class="col-lg-1">
                </div>
            </div>
            <div class="col-lg-12">
                <br />
                <div class="col-lg-12" id="divFarrowing" runat="server">
                    <span style="color: green"><strong>Current Farrowing Details</strong></span>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-1 text-nowrap">
                    Date of mating
                </div>
                <div class="col-lg-2">
                    <label id="lblDOM" class="form-control"></label>
                </div>
                <div class="col-lg-1">
                </div>
                <div class="col-lg-1">
                    Boar no.
                </div>
                <div class="col-lg-2">
                    <label id="lblBoarno" class="form-control"></label>
                </div>
                <div class="col-lg-1">
                </div>
                <div class="col-lg-1">
                    Date of farrowing<span class="Mandatory">*</span>
                </div>
                <div class="col-lg-2">
                    <div class="input-group date" id="dateTimePickerDOF">
                        <input type="text" class="form-control" id="txtDOF" placeholder="DD/MM/YYYY" onblur="CheckFarrowingDate()" />
                        <span class="input-group-addon btn">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="col-lg-1">
                </div>
            </div>
            <div class="col-lg-12">

                <div class="col-lg-1 text-nowrap">
                    Still birth
                </div>
                <div class="col-lg-1">
                    <input id="txtSBM" class="form-control" placeholder="Male" maxlength="2" onkeypress="ValidateNumbers(event);" onblur="ValidateNumbers1(this.id); SBT();" />
                </div>
                <div class="col-lg-1">
                    <input id="txtSBF" class="form-control" placeholder="Female" maxlength="2" onkeypress="ValidateNumbers(event);" onblur="ValidateNumbers1(this.id); SBT();" />
                </div>
                <div class="col-lg-1">
                    <label id="lblSBT" class="form-control">Total</label>
                </div>

                <div class="col-lg-1 text-nowrap">
                    Litter size at birth
                </div>
                <div class="col-lg-1">
                    <input id="txtLSBM" class="form-control" placeholder="Male" maxlength="2" onkeypress="ValidateNumbers(event);" onblur="ValidateNumbers1(this.id);MinMaxLSWCheck(this.id); LSBT();" />
                </div>
                <div class="col-lg-1">
                    <input id="txtLSBF" class="form-control" placeholder="Female" maxlength="2" onkeypress="ValidateNumbers(event);" onblur="ValidateNumbers1(this.id);MinMaxLSWCheck(this.id); LSBT();" />
                </div>
                <div class="col-lg-1">
                    <label id="lblLSBT" class="form-control">Total</label>
                </div>

                <div class="col-lg-1">
                    Litter weight at birth(Kg)
                </div>
                <div class="col-lg-1">
                    <label id="lblLWBM" class="form-control">Male</label>
                </div>
                <div class="col-lg-1">
                    <label id="lblLWBF" class="form-control">Female</label>
                </div>
                <div class="col-lg-1">
                    <label id="lblLWBT" class="form-control">Total</label>
                </div>
            </div>
            <div class="col-lg-12" id="divSaveContinue" style="display: none">
                <div class="col-lg-4">
                </div>
                <div class="col-lg-4">
                    <button id="btnSaveContinue" type="button" class="btn btn-primary" style="visibility: hidden" onclick="SaveandContinue(); return false;">Continue</button>
                    <button id="btnClear" type="button" class="btn btn-warning" onclick="ClearFarrowingDetail(); return false;">Clear All</button>
                </div>
                <div class="col-lg-4">
                </div>
            </div>
            <div class="col-lg-12">
                <div id="divLoading" style="display: none; margin-bottom: 2px;" class="loading-bar">
                    <button class="btn btn-warning btn-block disabled">
                        <span class="glyphicon glyphicon-refresh spinning"></span>&nbsp;Please wait...
                    </button>
                </div>
            </div>
            <div class="col-lg-12" id="divPigletDetail" runat="server" style="display: none">
                <div class="col-lg-12">
                    <div class="col-lg-12">
                        <span style="color: green"><strong>Piglets Details</strong></span>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="col-lg-1">
                        Breed<span class="Mandatory">*</span>
                    </div>
                    <div class="col-lg-2">
                        <input id="txtBreed" class="form-control" maxlength="50" onkeydown="ClearBreedValue(event)" />
                    </div>
                    <div class="col-lg-1">
                        Generation
                    </div>
                    <div class="col-lg-2">
                        <input id="txtGeneration" class="form-control" maxlength="50" onkeypress="ValidateNumbers(event);" onblur="ValidateNumbers1(this.id);" />
                    </div>
                    <div class="col-lg-6">
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="col-lg-8">
                        <table id="tblPigletDetail" style="word-break: break-all;"></table>
                    </div>
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-2">
                    </div>
                </div>
                <div class="col-lg-12">
                    <br />
                    <div class="col-lg-8">
                    </div>
                    <div class="col-lg-4">
                        <button id="btnAddNew" type="button" class="class='btn btn-warning btn-sm'" style="visibility: hidden"><span class='glyphicon glyphicon-plus'></span></button>
                    </div>
                </div>
                <div class="col-lg-12">
                    <br />
                    <div class="col-lg-4">
                        <input id="hdnMaxLSW" type="hidden" runat="server" value="0" />
                        <input id="hdnMinLSW" type="hidden" runat="server" value="0" />
                        <input id="hdnFarrowingId" type="hidden" runat="server" value="0" />
                        <input id="hdnMatingId" type="hidden" runat="server" value="0" />
                        <input id="hdnSchemeId" type="hidden" runat="server" value="" />
                        <input id="hdnBreedId" type="hidden" runat="server" />
                        <input id="hdnMinFarrowingDate" type="hidden" runat="server" />
                    </div>
                    <div class="col-lg-4" align="center">
                        <button id="btnSave" type="button" class="btn btn-primary" style="visibility: hidden" onclick="SaveFarrowingDetail(); return false;">Save</button>
                        <button id="btnClearAll" type="button" class="btn btn-warning" onclick="ClearFarrowingDetail(); return false;">Clear All</button>
                    </div>
                </div>
            </div>
            <div id="Login_dialog" class="Fields" style="display: none;"></div>
            <div id="dialog_new" class="Fields" style="display: none;">
            </div>
            <div class="col-lg-12">
                <div class="col-lg-12 leftspacing" id="divFarrowingDetail" runat="server">
                    <span style="color: gray"><strong>Previous farrowing details</strong></span>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-2">
                    No. of Parity/Crop :
                    <label id="lblParity" runat="server"></label>
                </div>
                <div class="col-lg-10">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-10">
                    <table id="tblFarrowing" style="word-break: break-all;"></table>
                </div>
                <div class="col-lg-2">
                </div>
            </div>
            <div class="col-lg-12 linespcaer">
                <br />
                <uc2:TopBanner ID="BottomBanner1" runat="server" />
            </div>
        </div>
    </form>
    <script type="text/javascript" src="../Scripts/FarrowingDetail.js" defer="defer"></script>
</body>
</html>
