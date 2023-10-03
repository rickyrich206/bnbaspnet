<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmDashboard.aspx.cs" Inherits="PMS.Dashboard.frmDashboard" %>

<%@ Register Src="../UserControl/TopBanner.ascx" TagPrefix="uc1" TagName="TopBanner" %>
<%@ Register Src="../UserControl/BottomBanner.ascx" TagPrefix="uc2" TagName="TopBanner" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <title>Dashboard</title>
</head>
<body class="body">
    <form id="form1" runat="server">
        <script type="text/javascript">
            var CurrentUser = {
                <%--Id: '<%= Session["UserId"] %>',--%>
                WebPath: '<%=ConfigurationManager.AppSettings["WebPath"] %>',
                ExcelPath: '<%=ConfigurationManager.AppSettings["Site"] %>'
            };
        </script>
        <div class="row">
            <uc1:TopBanner ID="TopBanner1" runat="server" />
            <div class="col-lg-12">
                <h1>
                    <ol class="breadcrumb">
                        <li class="active">Dashboard</li>
                    </ol>
                </h1>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-7 no-padding no-margin ">
                    <div class="col-lg-12">
                        <canvas id="myChart" width="700" height="300"></canvas>
                        <br />
                        <div id="legendDiv" class="chart-legend"></div>
                    </div>
                </div>
                <div class="col-lg-5 no-padding no-margin ">
              <%--  <div class="col-lg-12">--%>
                    <table width="100%" border="0" align="center">
                        <tr class="GrdHeader" style="color: green">
                            <th style="text-align: center">Stock Position for
                                <asp:Label ID="lblDate" runat="server"></asp:Label></th>
                        </tr>
                    </table>
                    <asp:Repeater runat="server" ID="repStock">
                        <HeaderTemplate>
                            <div  >
                                <table cellpadding="5" cellspacing="2" width="100%" border="1" class="repStock" style="font-size: 13px !important;">
                                    <tr class="GrdHeader" style="color: maroon">
                                        <th style="text-align: center" rowspan="2">Scheme
                                        </th>
                                        <th style="text-align: center" rowspan="2">Breed
                                        </th>
                                        <th style="text-align: center" colspan="3">Adult
                                        </th>
                                        <th style="text-align: center" colspan="3">Grower
                                        </th>
                                        <th style="text-align: center" colspan="3">Suckler
                                        </th>
                                        <th style="text-align: center" rowspan="2">Total
                                        </th>
                                    </tr>
                                    <tr class="GrdHeader" style="color: maroon">
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Male
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Female
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Total
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Male
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Female
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Total
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Male
                                        </th>
                                        <th style="text-align: center; padding-left: 2px !important; padding-right: 2px !important;">Female
                                        </th>
                                        <th style="text-align: center; color: maroon; padding-left: 2px !important; padding-right: 3px !important;">Total
                                        </th>
                                    </tr>
                        </HeaderTemplate>
                        <ItemTemplate>
                            <tr class="ItemStyle">
                                <td align="left">
                                    <asp:Label ID="Label1" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.scheme") %>'></asp:Label>
                                </td>
                                <td align="left">
                                    <asp:Label ID="lblBreed" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.breed") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblAM" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.adult_male") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblAF" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.adult_female") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblAT" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.adult_total") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblGM" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.grower_male") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblGF" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.grower_female") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblGT" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.grower_total") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblSM" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.suckler_male") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblSF" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.suckler_female") %>'></asp:Label>
                                </td>
                                <td align="center">
                                    <asp:Label ID="lblST" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.suckler_total") %>'></asp:Label>
                                </td>
                                <th style="text-align: center !important;">
                                    <asp:Label ID="lblTotal" runat="server" Text='<%# DataBinder.Eval(Container, "DataItem.total") %>'></asp:Label>
                                </th>
                            </tr>
                        </ItemTemplate>
                        <FooterTemplate>
                            </table>
                            </div>
                        </FooterTemplate>
                    </asp:Repeater>
                </div>
            </div>
            <div class="col-lg-6">
            </div>
            <div class="col-lg-2">
                <br />
                <span style="color: green; text-align: center"><strong>Animal List</strong></span>
            </div>
            <div class="col-lg-4">
            </div>
            <div class="col-lg-12 text-nowrap">
                <%-- <div class="col-lg-3">
                    <button id="btnExportToExcel" style="display: none;" type="button" class="btn btn-success" onclick="ExportToExcel();"><strong>Export to Excel</strong></button>
                </div>
                <div class="col-lg-3">
                    <button id="btnGeneticsDBF" style="display: none;" type="button" class="btn btn-success" onclick="GeneticsDBF();"><strong>Genetics Export to DBF</strong></button>
                </div>
                <div class="col-lg-3">
                    <button id="btnGeneticsMDB" style="display: none;" type="button" class="btn btn-success" onclick="GeneticsMDB();"><strong>Genetics Export to Access</strong></button>
                </div>--%>
                <div class="col-lg-3">
                    <button id="btnGeneticsExcel" style="display: none;" type="button" class="btn btn-success" onclick="GeneticsExcel();"><strong>Genetics Export to Excel</strong></button>
                </div>
                <button id="btnExportToExcel" style="display: none;" type="button" class="btn btn-success pull-left" onclick="ExportToExcel();"><strong>Export to Excel</strong></button>&nbsp;
                <button id="btnGeneticsMDB" runat="server" visible="false" style="display: none;" type="button" class="btn btn-success pull-right" onclick="GeneticsMDB();"><strong>Genetics Software Export to MS Access</strong></button>
            </div>
            <div class="col-lg-12">
                <div class="col-lg-12">
                    <table id="tblPigList" style="word-break: break-all;">
                    </table>
                </div>
            </div>
            <div class="col-lg-12 linespcaer">
                <br />
                <uc2:TopBanner ID="BottomBanner1" runat="server" />
            </div>
        </div>
    </form>
    <style>
        table > tbody > tr > td {
            padding-left: 4px !important;
            padding-right: 2px !important;
        }
    </style>
    <div id="Login_dialog"></div>
</body>
<script src="../Libraries/tableExport.js"></script>
<script src="../Libraries/ExportExcel.js"></script>
<script type="text/javascript" src="../Scripts/Dashboard.js" defer="defer"></script>
</html>
