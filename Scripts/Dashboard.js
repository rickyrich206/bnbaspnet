var CurrentPigList = {
};

var PigList = [];

$(document).ready(function () {
    CheckSesion(CurrentUser.WebPath);
    if (CurrentLoggedUser.UserId == null || CurrentLoggedUser.UserId == undefined || CurrentLoggedUser.UserId == "") {
        LoginCalldialog("Your session expired. Sorry for inconvenience.");
        return;
    }
    else {
        ChartLoad();
        PigListLoad();
    }

    var table = $('#tblPigList').bootstrapTable({
        lengthChange: false,
        buttons: ['excel']
    });

    window.open("../Html/frmReminder.aspx", 'msg', 'scrollbars=yes,resizable=yes, center=' + (screen.width) / 2 + ',width=' + screen.width / 2 + ',height=' + screen.height / 2 + '');

});

function ChartLoad() {
    //$.getScript('http://www.chartjs.org/assets/Chart.js', function () {
    $.ajax({
        type: 'POST',
        url: 'frmDashboard.aspx/StockRetrieve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ intId: 1, intUserId: CurrentLoggedUser.UserId }),
        success: function (response) {
            response = $.extend(true, [], response.d);
            var aData = response;
            var aLabels = aData[0];
            var aDatasets1 = aData[1];
            var aDatasets2 = aData[2];

            var color = Chart.helpers.color;
            var barChartData = {
                // labels: ["111111111111", "2", "3", "4", "5", "6", "7"],
                labels: aLabels,
                datasets: [{
                    label: 'Male',
                    backgroundColor: "#FC9775",
                    borderWidth: 1,
                    data: aDatasets1
                }, {
                    label: 'Female',
                    backgroundColor: "#5A69A6",
                    borderWidth: 1,
                    data: aDatasets2
                }]
            };

            var ctx = document.getElementById("myChart").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: false,
                    legend: {
                        position: 'bottom',
                    },
                }
            });

            //var color = Chart.helpers.color;
            //var barChartData = {
            //    labels: aLabels,
            //    datasets: [{
            //        label: 'Male',
            //        //backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            //        //borderColor: window.chartColors.red,
            //        backgroundColor: "#FC9775",
            //        borderWidth: 1,
            //        data: aDatasets1
            //    }, {
            //        label: 'Female',
            //        backgroundColor: "#5A69A6",
            //        //backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            //        //borderColor: window.chartColors.blue,
            //        borderWidth: 1,
            //        data: aDatasets2
            //    }]

            //};
            //var ctx = document.getElementById("myChart").getContext("2d");
            //window.myBar = new Chart(ctx, {
            //    type: 'bar',
            //    data: barChartData,
            //    options: {
            //        responsive: true,
            //        legend: {
            //            position: 'bottom',
            //        },
            //    }
            //});
            //var data = {
            //    labels: aLabels,
            //    datasets: [{
            //        label: "Male",
            //        fillColor: "#FC9775",
            //        //strokeColor: "rgba(220,220,220,1)",
            //        //pointColor: "rgba(220,220,220,1)",
            //        //pointStrokeColor: "#fff",
            //        //pointHighlightFill: "#fff",
            //        //pointHighlightStroke: "rgba(220,220,220,1)",
            //        data: aDatasets1
            //    },
            //    {
            //        label: "Female",
            //        fillColor: "#5A69A6",
            //        //strokeColor: "rgba(151,187,205,1)",
            //        //pointColor: "rgba(151,187,205,1)",
            //        //pointStrokeColor: "#fff",
            //        //pointHighlightFill: "#fff",
            //        //pointHighlightStroke: "rgba(151,187,205,1)",
            //        data: aDatasets2
            //    }]
            //};

            //var options = {
            //    Animation: true,
            //    responsive: true
            //};

            ////Get the context of the canvas element we want to select
            //var c = $('#myChart');
            //var ct = c.get(0).getContext('2d');
            //var ctx = document.getElementById("myChart").getContext("2d");

            ///*********************/
            //var myChart = new Chart(ctx).Bar(data, options);

            //$('#legendDiv').html(myChart.generateLegend());
        },
        error: function (msg) {
            alert("Failed loading chart.");
        }
    });
    //})
}

function PigListLoad() {
    CurrentPigList.UserId = CurrentLoggedUser.UserId;
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Common.asmx/PigListRetrieve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ pl: CurrentPigList }),
        async: true,
        success: function (msg) {
            PigList = $.extend(true, [], msg.d);
            if (PigList.length >= 0) {
                PigListRetrieve(PigList);
                //$('#btnExportToExcel').css("display", "block");
                //$('#btnGeneticsDBF').css("display", "block");
                $('#btnGeneticsMDB').css("display", "block");
                $('#btnGeneticsExcel').css("display", "block");
            }
            else {
                //$('#btnExportToExcel').css("display", "none");
                //$('#btnGeneticsDBF').css("display", "none");
                $('#btnGeneticsMDB').css("display", "none");
                $('#btnGeneticsExcel').css("display", "none");
            }
        },
        error: function (msg) {
            alert("Failed loading PigList.");
        }
    });
}

function PigListRetrieve(PigList) {

    $("#tblPigList").bootstrapTable("destroy");
    $(PigList).each(function (index, obj) {

        if (index == PigList.length - 1) {
            var advancedColumnsVisibility = ($(document).width() > 992);

            var _columns = [
                {
                    field: "",
                    title: "Sl.No.",
                    titleTooltip: "Sl.No. ",
                    formatter: runningFormatter,
                    width: '50px',
                    searchable: false,
                    class: "hidden-xs hidden-sm",
                    align: 'center',
                },
                {
                    field: "Id",
                    title: "Id",
                    titleTooltip: "Id",
                    searchable: false
                },
                {
                    field: "Tagno",
                    title: "Tag no.",
                    titleTooltip: "Tag no. ",
                    sortable: true,
                },
                {
                    field: "Scheme",
                    title: "Scheme",
                    titleTooltip: "Scheme ",
                    sortable: true,
                },
                {
                    field: "Breed",
                    title: "Breed",
                    titleTooltip: "Breed ",
                    sortable: true,
                }
                ,
                {
                    field: "Sex",
                    title: "Sex",
                    titleTooltip: "Sex ",
                    sortable: true,
                }
                ,
                {
                    field: "BirthDate",
                    title: "Date of Birth",
                    titleTooltip: "Date of Birth ",
                    sortable: true,
                    class: "hidden-xs hidden-sm",
                    sortName: 'DOB'
                },
                {
                    field: "Age",
                    title: "Age",
                    titleTooltip: "Age ",
                    align: 'center',
                    sortable: true,
                }
                ,
                {
                    field: "Sireno",
                    title: "Sire no.",
                    titleTooltip: "Sire no. ",
                    sortable: true,
                    visible: false,
                }
                ,
                {
                    field: "Damno",
                    title: "Dam no.",
                    titleTooltip: "Dam no. ",
                    sortable: true,
                    class: "export-visible",
                    visible: false
                }
                ,
                {
                    field: "NoofFarrowing",
                    title: "No. of<br>Farrowing<br>(Sow)",
                    titleTooltip: "No of Farrowing ",
                    sortable: true,
                    align: 'center',
                    class: "hidden-xs hidden-sm"
                }
                ,
                {
                    field: "NoofPiglets",
                    title: "No. of<br>Piglets<br>(Total)",
                    titleTooltip: "No of Piglets ",
                    sortable: true,
                    align: 'center',
                    class: "hidden-xs hidden-sm "
                }
                ,
                {
                    field: "Status",
                    title: "Status",
                    titleTooltip: "Status ",
                    sortable: true,
                    class: "hidden-xs hidden-sm "
                },
                {
                    field: "Stage",
                    title: "Stage",
                    titleTooltip: "Stage ",
                    sortable: true,
                    class: "hidden-xs hidden-sm"

                }
                ,
                {
                    field: "Shedno",
                    title: "Shed no.",
                    titleTooltip: "Shed no. ",
                    sortable: true,
                    visible: false
                }
                ,
                {
                    field: "Penno",
                    title: "Pen no.",
                    titleTooltip: "Pen no. ",
                    sortable: true,
                    visible: false
                }
            ];

            $("#tblPigList").bootstrapTable({
                data: PigList,
                striped: true,
                showColumns: true,
                showRefresh: false,
                showToggle: false,
                pageSize: 10,
                pageList: [5, 10, 25, 50, 100, 200, 500],
                pagination: true,
                search: true,
                columns: _columns,
                detailView: false,
                showExport: true,
                exportTypes: ['excel'],
                exportDataType: 'all',
                onPostBody: AfterBindPigList
            });
        }
        $('input[placeholder^="Search"]').prop("placeholder", "Search by any column");
        $('input[placeholder^="Search"]').prop("title", "Search by any column");
        $(".btn btn-default dropdown-toggle").val('Save');
        $(".btn btn-default dropdown-toggle").html('Save');
        $(".btn btn-default dropdown-toggle").text('Save');
    });
}

function runningFormatter(value, row, index) {
    return index + 1;
}

function AfterBindPigList() {
    var tempId = '0';
    $("#tblPigList").find("tr").each(function (index, element) {
        if (index == 0) {
            if ($("#thPigListEmptyHeader").length == 0)
                $(element).append("<th id='thPigListEmptyHeader'  class='export-hidden'><span style='display:none'>View</span></th>");
            tempId = '1';
        }
        else if (PigList.length > 0) {
            var tempOrdinalNo = $(element).find("td:nth-of-type(2)").html();

            if ($(element).find("td:nth-of-type(1)").html() != "No matching records found") {
                tempId = '1';
                $(element).append(
                    "<td class='export-hidden'>"
                    + "<div><a id='aView" + index + "' runat='server' class='glyphicon glyphicon-eye-open' target='_blank'  href='../Entries/frmPigDetails.aspx?Id=" + tempOrdinalNo.toString() + "'>"
                    + "<span style='display:none'>View</span></a>"
                    + "</div></td>"
                );
            }
            else {
                tempId = '0';
            }
        }
        if (tempId == '1') {
            document.getElementById("tblPigList").rows[index].cells[1].style.display = "none";
        }
    });
}

function ExportToExcel() {
    ShowLoader();
    $.ajax({
        type: 'POST',
        url: 'frmDashboard.aspx/ExportToExcel',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ list: PigList }),
        success: function (response) {
            window.open(CurrentUser.ExcelPath + "/Export/" + response.d);
            HideLoader();
        },
        error: function (msg) {
            alert("Error in export to excel.");
            HideLoader();
        }
    });
}

function GeneticsExcel() {


    window.open(CurrentUser.ExcelPath + "/Export/Genetics Report.xlsx");
    //ShowLoader();
    //$.ajax({
    //    type: 'POST',
    //    url: 'frmDashboard.aspx/GeneticsExcel',
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: 'json',
    //    success: function (response) {
    //        debugger;
    //        window.open(CurrentUser.ExcelPath + "/Export/" + response.d);
    //        HideLoader();
    //    },
    //    error: function (msg) {
    //        alert("Error in export to excel.");
    //        HideLoader();
    //    }
    //});
}

function GeneticsDBF() {
    ShowLoader();
    $.ajax({
        type: 'POST',
        url: 'frmDashboard.aspx/GeneticsDBF',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            //window.open(CurrentUser.ExcelPath + "/Export/" + response.d);
            HideLoader();
        },
        error: function (msg) {
            alert("Error in export to DBF.");
            HideLoader();
        }
    });
}

function GeneticsMDB() {
    ShowLoader();
    $.ajax({
        type: 'POST',
        url: 'frmDashboard.aspx/GeneticsMDB',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            window.open(CurrentUser.ExcelPath + "/Export/" + response.d);
            HideLoader();
        },
        error: function (msg) {
            alert("Error in export to MDB.");
            HideLoader();
        }
    });
}