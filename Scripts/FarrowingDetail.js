var CurrentAccess = {
};
var CurrentFarrowingDetail = {
};
var DisableTagno = "";
var Male = 0;
var Female = 0;
$(document).ready(function () {
    CheckSesion(CurrentUser.WebPath);
    if (CurrentLoggedUser.UserId == null || CurrentLoggedUser.UserId == undefined || CurrentLoggedUser.UserId == "") {
        LoginCalldialog("Your session expired. Sorry for inconvenience.");
        return;
    }
    else {
        SetRights();
        MinMaxLSWLoad();
    }
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();

    $('#dateTimePickerDOD').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(1990, 01, 01),
        maxDate: new Date(currentYear, currentMonth, currentDate)
    });

    $('#dateTimePickerDOF').datetimepicker({
        format: 'DD/MM/YYYY',
        minDate: new Date(1990, 01, 01),
        maxDate: new Date(currentYear, currentMonth, currentDate)
    });

    $("#dateTimePickerDOF").on("dp.change", function (e) {
        CheckFarrowingDate();
    });

    $("#btnAddNew").click(function () {
        var tblnew = document.getElementById("tblPigletDetail");
        var intTblLen = tblnew.rows.length;
        if (MinMaxLSWCheckAddNew() == true) {
            if (intTblLen == 0) {
                PigletsEmptyRow();
            }
            else {
                $("#tblPigletDetail tbody").append("<tr>" +
                            "<td>" + intTblLen + "</td>"
                            + "<td><input type='text' class='form-control text-uppercase' maxlength='50'  onkeypress='ValidateAlphabetNumbers(event)' onblur='ValidateAlphabetNumbers1(this.id);TagnoChk(" + intTblLen + "); DamnoBasedTagnoCheck(this.id," + intTblLen + ")' id='txtTagno" + intTblLen + "'/></td>"
                            + "<td><select id='drpSex" + intTblLen + "' onchange='CheckSex(this.id)'><option value='2'>Female</option><option value='1'>Male</option></select></td>"
                            + "<td><input type='text' class='form-control' maxlength='6' onkeypress='return ValidateNumeric(this)' onblur='ValidateNumeric1(this.id); CalculateWeight();' id='txtBirthWeight" + intTblLen + "'/></td>"
                            + "<td><input type='text' class='form-control' maxlength='50' onkeypress='ValidateAlaphabetSpace(event)' onblur='ValidateAlaphabetSpace1(this.id)' id='txtColor" + intTblLen + "'/></td>"
                            + "<td><input type='text' class='form-control' maxlength='2' onkeypress='ValidateNumbers(event)' onblur='ValidateNumbers1(this.id)' id='txtNoofTeats" + intTblLen + "'/></td>"
                            + "<td><select id='drpTeatsType" + intTblLen + "'><option value='0'>--Select--</option><option value='1'>Symmetrical</option><option value='2'>Asymmetrical</option></select></td>"

                           + "<td style='min-width: 90px;'><div class='btn-group pull-right'>"
                        + "<button id='btnDelete" + intTblLen + "' class='btn btn-danger btn-sm' onclick='ConfirmDeletePigDetail(this.id," + intTblLen.toString() + "); return false;'>"
                            + "<span class='glyphicon glyphicon-remove'></span>"
                        + "</button>"
                        + "</div></td>"
                    + "</tr>");
            }
        }
    });
});

function CheckDewormingDate() {
    if ($('#txtTagno').val() == "") {
        $("#txtDOD").val("");
        $("#txtTagno").focus();
        Calldialog("Please select tag no.");
        return false;
    }
    if ($('#hdnSchemeId').val() == "") {
        $("#txtDOD").val("");
        $("#btnLoad").focus();
        Calldialog("Please click on load button.");
        return false;
    }
    if ($("#txtDOD").val() != "") {
        var strDOD = $("#txtDOD").val();
        var DOD = strDOD.split('/');
        strDOD = DOD[1] + "/" + DOD[0] + "/" + DOD[2];
        strDOD = new Date(strDOD);

        if ($('#hdnMinFarrowingDate').val() != "") {
            var strMFD = $("#hdnMinFarrowingDate").val();
            var MFD = strMFD.split('/');
            strMFD = MFD[1] + "/" + MFD[0] + "/" + MFD[2];
            var FarrowingDate = MFD[0] + "/" + MFD[1] + "/" + MFD[2];
            strMFD = new Date(strMFD);

            if (strDOD < strMFD) {
                $("#txtDOD").val("");
                $("#txtDOD").focus();
                Calldialog("Please select date of deworming greater than or equal to " + FarrowingDate);
            }
        }
    }
}

function CheckFarrowingDate() {
    if ($("#txtDOF").val() != "") {
        var strDOF = $("#txtDOF").val();
        var DOF = strDOF.split('/');
        strDOF = DOF[1] + "/" + DOF[0] + "/" + DOF[2];
        strDOF = new Date(strDOF);

        if ($('#hdnMinFarrowingDate').val() != "") {
            var strMFD = $("#hdnMinFarrowingDate").val();
            var MFD = strMFD.split('/');
            strMFD = MFD[1] + "/" + MFD[0] + "/" + MFD[2];
            var FarrowingDate = MFD[0] + "/" + MFD[1] + "/" + MFD[2];
            strMFD = new Date(strMFD);

            if (strDOF < strMFD) {
                $("#txtDOF").val("");
                $("#txtDOF").focus();
                Calldialog("Please select date of farrowing greater than or equal to " + FarrowingDate);
            }
        }
    }
}

function CheckSex(val) {
    strNoofTeats = val;
    strTeatsType = val;

    strNoofTeats = strNoofTeats.replace("drpSex", "txtNoofTeats");

    strTeatsType = strTeatsType.replace("drpSex", "drpTeatsType");

    if ($('#' + val).val() == 1) {
        $("#" + strNoofTeats).prop("disabled", true);
        $("#" + strNoofTeats).val("");
        $("#" + strTeatsType).prop("disabled", true);
        $("#" + strTeatsType).val(0);
    }
    else {
        $("#" + strNoofTeats).prop("disabled", false);
        $("#" + strTeatsType).prop("disabled", false);
    }
}

function SetRights() {
    CurrentAccess.RoleId = CurrentLoggedUser.RoleId;
    CurrentAccess.MenuId = 14;

    ShowLoader();
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Master.asmx/RoleAccess',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ ra: CurrentAccess }),
        async: true,
        success: function (msg) {
            if (msg.d.ViewVisible == true) {
                if (msg.d.SaveVisible == true) {
                    $("#btnSaveContinue").css("visibility", "visible");
                    $("#btnSave").css("visibility", "visible");
                }
                else {
                    $("#btnSaveContinue").css("visibility", "hidden");
                    $("#btnSave").css("visibility", "hidden");
                }
            }
            else {
                LoginCalldialog("You don't have access for this page.");
            }
            HideLoader();
        },
        error: function (msg) {
            Calldialog("Error in set rights!");
            HideLoader();
        }
    });
}

// Tag no.
$("#txtTagno").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: CurrentUser.WebPath + 'PMS_Common.asmx/TagnoAuto',
            data: "{'strStatusId' : '1', 'intSex': 2,'intId':2,'strCondition': '','strValue': '" + request.term + "', 'intUserId': " + CurrentLoggedUser.UserId + "}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                response($.map(data.d, function (item) {
                    return {
                        label: item.split('|')[0],
                        val: item.split('|')[1]
                    }
                }))
            },
            error: function (response) {
                Calldialog(response.responseText);
            },
            failure: function (response) {
                Calldialog(response.responseText);
            }
        });
    },
    select: function (e, i) {
        document.getElementById('txtTagno').value = i.item.label;
        return false;;
    },
    minLength: 0
}).focus(function (e, i) {
    $(this).autocomplete("search", "");
});

// Breed name
$("#txtBreed").autocomplete({
    source: function (request, response) {
        if ($("#hdnSchemeId").val() != "") {
            $.ajax({
                url: CurrentUser.WebPath + 'PMS_Common.asmx/BreedAuto',
                data: "{ 'strValue': '" + request.term + "','intUserId':'" + CurrentLoggedUser.UserId + "','intSchemeId':'" + $("#hdnSchemeId").val() + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('|')[1],
                            val: item.split('|')[0]
                        }
                    }))
                },
                error: function (response) {
                    Calldialog(response.responseText);
                },
                failure: function (response) {
                    Calldialog(response.responseText);
                }
            }
            );
        }
    },
    select: function (e, i) {
        document.getElementById('txtBreed').value = i.item.label;
        document.getElementById('hdnBreedId').value = i.item.val;
        return false;;
    },
    minLength: 0
}).focus(function (e, i) {
    $(this).autocomplete("search", "");
});

function LoadPigDetail() {
    InitializeFarrowingDetail();
    $("#txtTagno").css("background-color", "#ffffff");
    if ($("#txtTagno").val() == "") {
        $("#txtTagno").css("background-color", "#f6d6d5").focus();
        Calldialog("Please enter tag no.");
        return false;
    }
    ShowLoader();
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Entries.asmx/PigDetailRetrieve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ strTagno: $("#txtTagno").val().toUpperCase(), intUserId: CurrentLoggedUser.UserId }),
        async: true,
        success: function (msg) {
            if (msg.d) {
                if (msg.d.Sex == 2) {
                    $("#lblStatus").html(msg.d.Status);
                    $("#PigDetail_lblScheme").html(msg.d.SchemeName);
                    $("#hdnSchemeId").val(msg.d.SchemeId);
                    $("#PigDetail_lblBreed").html(msg.d.BreedName);
                    $("#PigDetail_lblStage").html(msg.d.Stage);
                    $("#PigDetail_lblSex").html("Female");
                    $("#PigDetail_lblSireno").html(msg.d.Sireno);
                    $("#PigDetail_lblDamno").html(msg.d.Damno);
                    $("#PigDetail_lblDOB").html(msg.d.DOB);
                    $("#PigDetail_lblBirthWeight").html(msg.d.BirthWeight);
                    $("#PigDetail_lblShedno").html(msg.d.ShedName);
                    $("#PigDetail_lblPenno").html(msg.d.Penno);
                    $("#PigDetail_lblColor").html(msg.d.Color);

                    if (parseInt(msg.d.StatusId) > 2) {
                        $("#btnSave").css("visibility", "hidden");
                    }
                    else {
                        $("#btnSave").css("visibility", "visible");
                    }

                    //Farrowing retrieve
                    FarrowingRetrieve($("#txtTagno").val().toUpperCase());
                    FarrowingDetailLoad($("#txtTagno").val().toUpperCase());
                    HideLoader();
                }
                else if (msg.d.Sex == 1) {
                    $("#txtTagno").focus();
                    Calldialog("Only sow or dam no. should be entered.");
                }
                else {
                    $("#txtTagno").focus();
                    Calldialog("Please enter valid tag no.");
                }
            }
            else {
                HideLoader();
            }
        },
        error: function (msg) {
            Calldialog("Error loading Pig detail!");
            HideLoader();
        }
    });
}

function FarrowingRetrieve(strTagno) {
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Entries.asmx/MatingRetrieve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ strTagno: strTagno, intUserId: CurrentLoggedUser.UserId }),
        async: true,
        success: function (msg) {
            if (msg) {
                $("#divSaveContinue").css("display", "none");
                if (msg.d.Result == 1) {
                    $("#hdnMatingId").val(msg.d.MatingId);
                    $("#lblDOM").html(msg.d.MatingDate);
                    $("#lblBoarno").html(msg.d.Boarno);

                    $("#hdnMinFarrowingDate").val(msg.d.MinFarrowingDate);

                    $("#hdnBreedId").val(msg.d.BreedId);
                    $("#txtBreed").val(msg.d.Breed);
                    $("#txtGeneration").val(msg.d.Generation);
                    $("#txtDOD").val("");
                    $("#txtDewormingName").val("");
                    $("#txtDoseRoute").val("");
                    $("#divSaveContinue").css("display", "block");
                }
                else if (msg.d.Result == -2) {
                    Calldialog("For the selected tag no., mating status is not updated as ''Pregnant''!");
                }
                else if (msg.d.Result == -1) {
                    Calldialog("Mating details are not entered for the selected tag no.!");
                }
            }
            else {
                Calldialog("There are no latest mating details associated with this tag no.");
            }
        },
        error: function (msg) {
            Calldialog("Error loading Farrowing retrieve!");
        }
    });

}

function SBT() {
    var SBT = 0;
    if ($("#txtSBM").val() != "") {
        SBT = parseInt(SBT) + parseInt($("#txtSBM").val());
    }
    if ($("#txtSBF").val() != "") {
        SBT = parseInt(SBT) + parseInt($("#txtSBF").val());
    }
    $("#lblSBT").html(SBT);
}
function LSBT() {
    var LSBT = 0;
    if ($("#txtLSBM").val() != "") {
        LSBT = parseInt(LSBT) + parseInt($("#txtLSBM").val());
    }
    if ($("#txtLSBF").val() != "") {
        LSBT = parseInt(LSBT) + parseInt($("#txtLSBF").val());
    }
    $("#lblLSBT").html(LSBT);
}

function SaveandContinue() {
    var Total = 0;
    $("#txtTagno").css("background-color", "#ffffff");
    $("#txtDOD").css("background-color", "#ffffff");
    $("#txtDewormingName").css("background-color", "#ffffff");
    $("#txtDoseRoute").css("background-color", "#ffffff");
    $("#txtDOF").css("background-color", "#ffffff");
    if ($("#txtTagno").val() == "") {
        $("#txtTagno").css("background-color", "#f6d6d5").focus();
        Calldialog("Please enter Tag no.");
        return false;
    }

    if ($("#txtDOD").val() == "") {
        $("#txtDOD").css("background-color", "#f6d6d5").focus();
        Calldialog("Select the date from datepicker.");
        return false;
    }
    if ($("#txtDewormingName").val() == "") {
        $("#txtDewormingName").css("background-color", "#f6d6d5").focus();
        Calldialog("Enter the Deworming Name.");
        return false;
    }
    if ($("#txtDoseRoute").val() == "") {
        $("#txtDoseRoute").css("background-color", "#f6d6d5").focus();
        Calldialog("Enter the Dose and Route for deworming.");
        return false;
    }

    if ($("#txtDOF").val() == "") {
        $("#txtDOF").css("background-color", "#f6d6d5").focus();
        Calldialog("Please enter date of farrowing.");
        return false;
    }

    if ($("#lblLSBT").html() != "") {
        Total = $("#lblLSBT").html();
    }

    if (Total > 0) {
        Male = $("#txtLSBM").val();
        Female = $("#txtLSBF").val();
        var json = '[';
        for (var i = 0; i < Total ; i++) {

            if (i == 0) {
                json = json + "{Tagno: '', Sex: '', BirthWeight: '', Color: '', NoofTeats: '', TeatsType: '', BreedId: '', Breed: '', Generation: ''}";
            }
            else {
                json = json + "," + "{Tagno: '', Sex: '', BirthWeight: '', Color: '', NoofTeats: '', TeatsType: '', BreedId: '', Breed: '', Generation: ''}";
            }
        }
        json = json + "]";
        PigletsDetails = eval('(' + json + ')');
        LoadPigletDetail(PigletsDetails);
    }
    else {
        SaveFarrowingDetail();
    }
}

function LoadPigletDetail(PigletsDetails) {
    $("#divPigletDetail").css("display", "block");
    $("#btnClear").css("visibility", "hidden");
    $("#btnAddNew").css("visibility", "visible");
    $("#tblPigletDetail").bootstrapTable("destroy");
    $(PigletsDetails).each(function (index, obj) {

        if (index == PigletsDetails.length - 1) {
            var advancedColumnsVisibility = ($(document).width() > 992);

            var _columns = [
                {
                    field: "",
                    title: "Sl.No.",
                    titleTooltip: "#",
                    formatter: runningFormatter,
                    width: "50px"
                }
            ];

            $("#tblPigletDetail").bootstrapTable({
                data: PigletsDetails,
                striped: true,
                showColumns: false,
                showRefresh: false,
                showToggle: false,
                columns: _columns,
                detailView: false,
                onPostBody: AfterBindPiglets
            });
        }
    });
}

function runningFormatter(value, row, index) {
    return index + 1;
}

function AfterBindPiglets() {
    $("#tblPigletDetail").bootstrapTable("destroy");
    $("#tblPigletDetail").find("tr").each(function (index, element) {
        if (index == 0) {
            if ($("#thTagno").length == 0)
                $(element).append("<th id='thTagno'style= 'text-align:center; minWidth='90px''>Tag no.<span class='Mandatory'>*</span></th>");
            if ($("#thSex").length == 0)
                $(element).append("<th id='thSex'style= 'text-align:center; minWidth='90px''>Sex<span class='Mandatory'>*</span></th>");
            if ($("#thBirthWeight").length == 0)
                $(element).append("<th id='thBirthWeight' style= 'text-align:center; minWidth='90px''>Birth Weigth(Kg)<span class='Mandatory'>*</span></th>");
            if ($("#thColor").length == 0)
                $(element).append("<th id='thColor' style= 'text-align:center; minWidth='90px''>Colour of Pig<span class='Mandatory'>*</span></th>");
            if ($("#thNoofTeats").length == 0)
                $(element).append("<th id='thNoofTeats' style= 'text-align:center; minWidth='90px''>No. of Teats</th>");
            if ($("#thTeatsType").length == 0)
                $(element).append("<th id='thTeatsType'style= 'text-align:center; minWidth='10px''>Type of Teats</th>");
        }
        else if (PigletsDetails.length > 0) {
            if ($("#hdnFarrowingId").val() != "0") {

                if (PigletsDetails[(index - 1)].BreedId != "") {
                    $("#hdnBreedId").val(PigletsDetails[(index - 1)].BreedId);
                }
                if (PigletsDetails[(index - 1)].Breed != "") {
                    $("#txtBreed").val(PigletsDetails[(index - 1)].Breed);
                }
                if (PigletsDetails[(index - 1)].Generation != "") {
                    $("#txtGeneration").val(PigletsDetails[(index - 1)].Generation);
                }
            }

            if (PigletsDetails[(index - 1)].Tagno == "") {
                strTagno = "";
                DisableTagno = "";
            }
            else {
                strTagno = PigletsDetails[(index - 1)].Tagno;
                DisableTagno = "disabled";
            }

            if (PigletsDetails[(index - 1)].Sex == 1) {
                DisableTeats = "disabled";
            }
            else {
                DisableTeats = "";
            }

            if (PigletsDetails[(index - 1)].NoofTeats == null) {
                NoofTeats = "";
            }
            else {
                NoofTeats = PigletsDetails[(index - 1)].NoofTeats;
            }

            if ($(element).find("td:nth-of-type(1)").html() != "No matching records found") {
                $(element).append(
                    "<td style='min-width: 90px;'><input type='text' class='form-control text-uppercase' " + DisableTagno + " value = '" + PigletsDetails[(index - 1)].Tagno + "' maxlength='50'  onkeypress='ValidateAlphabetNumbers(event)' onblur='ValidateAlphabetNumbers1(this.id);TagnoChk(" + index + "); DamnoBasedTagnoCheck(this.id," + index + ")' id='txtTagno" + index + "'/></td>"
                    + "<td style='min-width: 90px;'><select onchange='CheckSex(this.id)' id='drpSex" + index + "'><option value='2'>Female</option><option value='1'>Male</option></select></td>"
                    + "<td style='min-width: 90px;'><input type='text' class='form-control' value = '" + PigletsDetails[(index - 1)].BirthWeight + "' maxlength='6' onkeypress='return ValidateNumeric(this)' onblur='ValidateNumeric1(this.id); CalculateWeight();' id='txtBirthWeight" + index + "'/></td>"
                    + "<td style='min-width: 90px;'><input type='text' class='form-control' value = '" + PigletsDetails[(index - 1)].Color + "' maxlength='50' onkeypress='ValidateAlaphabetSpace(event)' onblur='ValidateAlaphabetSpace1(this.id)' id='txtColor" + index + "'/></td>"
                    + "<td style='min-width: 90px;'><input " + DisableTeats + " type='text' class='form-control' value = '" + NoofTeats + "' maxlength='2' onkeypress='ValidateNumbers(event)' onblur='ValidateNumbers1(this.id)' id='txtNoofTeats" + index + "'/></td>"
                    + "<td style='min-width: 90px;'><select " + DisableTeats + " id='drpTeatsType" + index + "'><option value='0'>--Select--</option><option value='1'>Symmetrical</option><option value='2'>Asymmetrical</option></select></td>"

                   + "<td style='min-width: 90px;'><div class='btn-group pull-right'>"
                + "<button id='btnDelete" + index + "' class='btn btn-danger btn-sm' onclick='ConfirmDeletePigDetail(this.id," + index + "); return false;'>"
                    + "<span class='glyphicon glyphicon-remove'></span>"
                + "</button>"
                + "</div></td>"
                );
            }

            if (Male > 0) {
                $('#drpSex' + index).val(1);
                Male = Male - 1;
                $("#txtNoofTeats" + index).prop("disabled", true);
                $("#drpTeatsType" + index).prop("disabled", true);
            }
            else if (Male == 0 && Female > 0) {
                $('#drpSex' + index).val(2);
                Female = Female - 1;
            }
            else {
                $('#drpSex' + index).val(PigletsDetails[(index - 1)].Sex);
            }

            $('#drpTeatsType' + index).val(PigletsDetails[(index - 1)].TeatsType);
        }
    });
}

function ConfirmDeletePigDetail(id, row) {
    $("#dialog_new").dialog(
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
                SetDeletetPigDetail(id, row);
                $("#dialog_new").dialog("close");
                return true;
            },
            "No": function () {
                $("#dialog_new").dialog("close");
                return false;
            }
        }
    });

    $("#dialog_new").text("Are you sure want to delete?").dialog("open");
    return false;
}

function SetDeletetPigDetail(id, row) {
    strTagno = id.replace("btnDelete", "txtTagno");
    id = $('#' + strTagno).val();

    ShowLoader();
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Entries.asmx/PigDetailDelete',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ strTagno: id }),
        async: true,
        success: function (msg) {
            if (msg.d == "1") {
                document.getElementById("tblPigletDetail").deleteRow(row);
                CalculateWeight();
                HideLoader();
            }
            else {
                Calldialog("Weaning details are already entered for this tag no., you cannot delete the forrowing details.");
                HideLoader();
            }
        },
        error: function (msg) {
            Calldialog("Error deleting Piglet!");
            HideLoader();
        }
    });

}

//function TagnoCheck(val) {
//    $.ajax({
//        type: 'POST',
//        url: CurrentUser.WebPath + 'PMS_Common.asmx/TagnoCheck',
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json',
//        data: JSON.stringify({ strTagno: $('#' + val).val() }),
//        async: true,
//        success: function (msg) {
//            if (msg.d == "1") {
//                //$('#' + val).css("background-color", "#f6d6d5").focus();
//                $('#' + val).val("");
//                Calldialog("Tag no. already exists!");
//            }
//        },
//        error: function (msg) {
//            Calldialog("Error in check tag no.!");
//            HideLoader();
//        }
//    });
//}

function SaveFarrowingDetail() {
    Male = 0;
    Female = 0;
    PigletsData = "";
    $("#txtTagno").css("background-color", "#ffffff");
    $("#txtDOF").css("background-color", "#ffffff");
    $("#txtBreed").css("background-color", "#ffffff");

    if ($("#txtTagno").val() == "") {
        $("#txtTagno").css("background-color", "#f6d6d5").focus();
        Calldialog("Please enter Tag no.");
        return false;
    }

    if ($("#txtDOD").val() == "") {
        $("#txtDOD").css("background-color", "#f6d6d5").focus();
        Calldialog("Select the date from datepicker.");
        return false;
    }
    if ($("#txtDewormingName").val() == "") {
        $("#txtDewormingName").css("background-color", "#f6d6d5").focus();
        Calldialog("Enter the Deworming Name.");
        return false;
    }
    if ($("#txtDoseRoute").val() == "") {
        $("#txtDoseRoute").css("background-color", "#f6d6d5").focus();
        Calldialog("Enter the Dose and Route for deworming.");
        return false;
    }

    if ($("#hdnMatingId").val() == "") {
        Calldialog("There are no latest mating details associated with this tag no.");
        return false;
    }

    if ($("#txtDOF").val() == "") {
        $("#txtDOF").css("background-color", "#f6d6d5").focus();
        Calldialog("Please enter date of farrowing.");
        return false;
    }

    if ($("#lblLSBT").html() > 0) {
        if ($("#hdnBreedId").val() == "") {
            $("#txtBreed").css("background-color", "#f6d6d5").focus();
            Calldialog("Please select breed from smart text.");
            return false;
        }
        CurrentFarrowingDetail.BreedId = $("#hdnBreedId").val();
    }
    else {
        CurrentFarrowingDetail.BreedId = 0;
    }

    CurrentFarrowingDetail.FarrowingId = $("#hdnFarrowingId").val();
    CurrentFarrowingDetail.Sowno = $("#txtTagno").val();
    var strDOD = $("#txtDOD").val();
    var DOD = strDOD.split('/');
    strDOD = DOD[1] + "/" + DOD[0] + "/" + DOD[2];
    CurrentFarrowingDetail.DewormingDate = strDOD;
    CurrentFarrowingDetail.DewormingName = $("#txtDewormingName").val();
    CurrentFarrowingDetail.DoseRoute = $("#txtDoseRoute").val();
    CurrentFarrowingDetail.MatingId = $("#hdnMatingId").val();

    var strDOF = $("#txtDOF").val();
    var DOF = strDOF.split('/');
    strDOF = DOF[1] + "/" + DOF[0] + "/" + DOF[2];
    CurrentFarrowingDetail.FarrowingDate = strDOF;

    if ($("#txtSBM").val() != "") {
        CurrentFarrowingDetail.SBM = $("#txtSBM").val();
    }
    else {
        CurrentFarrowingDetail.SBM = null;
    }
    if ($("#txtSBF").val() != "") {
        CurrentFarrowingDetail.SBF = $("#txtSBF").val();
    }
    else {
        CurrentFarrowingDetail.SBF = null;
    }

    if ($("#txtLSBM").val() != "") {
        CurrentFarrowingDetail.LSBM = $("#txtLSBM").val();
    }
    else {
        CurrentFarrowingDetail.LSBM = null;
    }
    if ($("#txtLSBF").val() != "") {
        CurrentFarrowingDetail.LSBF = $("#txtLSBF").val();
    }
    else {
        CurrentFarrowingDetail.LSBF = null;
    }

    if ($("#lblLWBM").html() != "") {
        CurrentFarrowingDetail.LWBM = $("#lblLWBM").html();
    }
    else {
        CurrentFarrowingDetail.LWBM = null;
    }
    if ($("#lblLWBF").html() != "") {
        CurrentFarrowingDetail.LWBF = $("#lblLWBF").html();
    }
    else {
        CurrentFarrowingDetail.LWBF = null;
    }

    if (($("#lblSBT").html() == 0 || $("#lblSBT").html() == "") && ($("#lblLSBT").html() == 0 || $("#lblLSBT").html() == "")) {
        Calldialog("Please enter either still birth or litter size at birth.");
        return false;
    }

    if ($("#txtGeneration").val() != "") {
        CurrentFarrowingDetail.Generation = $("#txtGeneration").val();
    }
    else {
        CurrentFarrowingDetail.Generation = null;
    }

    for (var i = 0; i < ($('#tblPigletDetail').find("tr").length - 1) ; i++) {

        if ($("#txtTagno" + (i + 1)).val().trim() == "") {
            $("#txtTagno" + (i + 1)).css("background-color", "#f6d6d5").focus();
            Calldialog("Please enter tag no.");
            return false;
        }
        if ($("#txtBirthWeight" + (i + 1)).val().trim() == "") {
            $("#txtBirthWeight" + (i + 1)).css("background-color", "#f6d6d5").focus();
            Calldialog("Please enter birth weight.");
            return false;
        }
        if ($("#txtColor" + (i + 1)).val().trim() == "") {
            $("#txtColor" + (i + 1)).css("background-color", "#f6d6d5").focus();
            Calldialog("Please enter colour.");
            return false;
        }

        if ($("#txtNoofTeats" + (i + 1)).val().trim() != "") {
            NoofTeats = $("#txtNoofTeats" + (i + 1)).val().trim()
        }
        else {
            NoofTeats = '';
        }

        PigletsData += $("#txtTagno" + (i + 1)).val() + "^" + $("#drpSex" + (i + 1)).val() + "^" + $("#txtBirthWeight" + (i + 1)).val() + "^" + $("#txtColor" + (i + 1)).val() + "^" + NoofTeats + "^" + $("#drpTeatsType" + (i + 1)).val() + "^~";

        if ($("#drpSex" + (i + 1)).val() == 1) {
            Male = Male + 1;
        }
        else {
            Female = Female + 1;
        }
    }

    if (Male != $("#txtLSBM").val()) {
        Calldialog("Litter size at male mismatch with male piglets.");
        return false;
    }
    if (Female != $("#txtLSBF").val()) {
        Calldialog("Litter size at female mismatch with female piglets.");
        return false;
    }

    for (var i = 0; i < ($('#tblPigletDetail').find("tr").length - 1) ; i++) {
        Tagno = $("#txtTagno" + (i + 1)).val();
        for (var j = 0; j < ($('#tblPigletDetail').find("tr").length - 1) ; j++) {
            if (i != j) {
                if (Tagno == $("#txtTagno" + (j + 1)).val()) {
                    $("#txtTagno" + (j + 1)).focus().css("background-color", "#f6d6d5");
                    Calldialog("Tag no. already exist. Enter a new tag no.");
                    return false;
                }
            }
        }
    }

    CurrentFarrowingDetail.PigletsData = PigletsData.trim();
    CurrentFarrowingDetail.UserId = CurrentLoggedUser.UserId;

    ShowLoader();
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Entries.asmx/FarrowingDetailSave',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ fd: CurrentFarrowingDetail }),
        async: true,
        success: function (msg) {
            if (msg.d == 1) {
                FarrowingDetailLoad($("#txtTagno").val().toUpperCase());
                ClearFarrowing();
                HideLoader();
                Calldialog("Farrowing detail saved successfully.");
            }
            else {
                Calldialog("Farrowing detail already exists.");
                HideLoader();
            }
        },
        error: function (msg) {
            Calldialog("Error saving Pig detail!");
            HideLoader();
        }
    });

    $("#txtTagno").css("background-color", "#ffffff");
    $("#txtDOF").css("background-color", "#ffffff");
    $("#txtBreed").css("background-color", "#ffffff");
}

function InitializeFarrowingDetail() {
    ClearFarrowing();
    $("#lblStatus").html("");
    $("#PigDetail_lblScheme").html("");
    $("#hdnSchemeId").val("");
    $("#PigDetail_lblBreed").html("");
    $("#PigDetail_lblStage").html("");
    $("#PigDetail_lblSex").html("");
    $("#PigDetail_lblSireno").html("");
    $("#PigDetail_lblDamno").html("");
    $("#PigDetail_lblDOB").html("");
    $("#PigDetail_lblBirthWeight").html("");
    $("#PigDetail_lblShedno").html("");
    $("#PigDetail_lblPenno").html("");
    $("#PigDetail_lblColor").html("");

    SetRights();

    $("#divSaveContinue").css("display", "none");
    $("#lblParity").html("");
    $("#tblFarrowing").bootstrapTable("destroy");
}

function ClearFarrowing() {
    $("#txtTagno").css("background-color", "#ffffff");
    $("#hdnFarrowingId").val(0);
    $("#txtDOD").val("");
    $("#txtDewormingName").val("");
    $("#txtDoseRoute").val("");
    $("#hdnMatingId").val("");
    $("#lblDOM").html("");
    $("#lblBoarno").html("");
    $("#txtDOF").val("");
    $('#hdnMinFarrowingDate').val("");
    $("#txtDOF").css("background-color", "#ffffff");
    $("#txtSBM").val("");
    $("#txtSBF").val("");
    $("#lblSBT").html("");
    $("#txtLSBM").val("");
    $("#txtLSBF").val("");
    $("#lblLSBT").html("");
    $("#lblLWBM").html("");
    $("#lblLWBF").html("");
    $("#lblLWBT").html("");

    $("#txtBreed").val("");
    $("#txtGeneration").val("");
    $("#tblPigletDetail").bootstrapTable("destroy");
    $("#divPigletDetail").css("display", "none");
    $("#btnClear").css("visibility", "visible");
}

function ClearFarrowingDetail() {
    $("#txtTagno").val("");
    InitializeFarrowingDetail();
}

function FarrowingDetailLoad(Tagno) {
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Entries.asmx/FarrowingDetailRetrieve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ strTagno: Tagno, intUserId: CurrentLoggedUser.UserId }),
        async: true,
        success: function (msg) {
            Farrowing = $.extend(true, [], msg.d);
            if (Farrowing.length >= 0) {
                $("#lblParity").html(Farrowing.length);
                FarrowingDetailRetrieve(Farrowing);
            }
            else {
                $("#lblParity").html("");
            }
        },
        error: function (msg) {
            Calldialog(msg.d);
            Calldialog("Failed loading Farrowing.");
        }
    });
}

function FarrowingDetailRetrieve(Farrowing) {
    $("#tblFarrowing").bootstrapTable("destroy");
    $(Farrowing).each(function (index, obj) {

        if (index == Farrowing.length - 1) {
            var advancedColumnsVisibility = ($(document).width() > 992);

            $("#tblFarrowing").bootstrapTable({
                data: Farrowing,
                striped: true,
                showColumns: false,
                showRefresh: false,
                showToggle: false,
                pageSize: 10,
                pageList: [5, 10, 25, 50, 100, 200, 500],
                pagination: true,
                detailView: false,
                onPostBody: AfterBindFarrowing
            });
        }
    });
}

function runningFormatter(value, row, index) {
    return index + 1;
}

function AfterBindFarrowing() {
    $("#tblFarrowing").find("tr").each(function (index, element) {
        if (index == 0) {

            $("#tblFarrowing thead").append("<tr><th style='text-align:center;' rowspan='3' nowrap='nowrap' >Sl.No.</th>"
                + "<th  style='text-align:center;' rowspan='2' nowrap='nowrap' >Date of Farrowing</th>"
                 + "<th  style='min-width: 50px;text-align:center;' rowspan='2' nowrap='nowrap' >Boar No.</th>"
                 + "<th  style='text-align:center;' rowspan='2' nowrap='nowrap' >Date of Mating</th>"
                 + "<th  style='min-width: 50px;text-align:center;' colspan='3' >Still Birth</th>"
                 + "<th  style='min-width: 50px;text-align:center;' colspan='3' >LSB</th>"
                 + "<th  style='min-width: 50px;text-align:center;' colspan='3' >LWB</th>"
                 + "</tr>"
                 + "<tr>"
                 + "<th style='text-align:center;'>M</th>"
                    + "<th style='text-align:center;'>F</th>"
                    + "<th style='text-align:center;'>T</th>"
                      + "<th style='text-align:center;'>M</th>"
                    + "<th style='text-align:center;'>F</th>"
                    + "<th style='text-align:center;'>T</th>"
                      + "<th style='text-align:center;'>M</th>"
                    + "<th style='text-align:center;'>F</th>"
                    + "<th style='text-align:center;'>T</th>"
                    );
        }
        else if (Farrowing.length > 0) {
            //Still birth
            if (Farrowing[(index - 1)].SBM == null) {
                strSBM = "";
            }
            else {
                strSBM = Farrowing[(index - 1)].SBM;
            }

            if (Farrowing[(index - 1)].SBF == null) {
                strSBF = "";
            }
            else {
                strSBF = Farrowing[(index - 1)].SBF;
            }

            if (Farrowing[(index - 1)].SBT == null) {
                strSBT = "";
            }
            else {
                strSBT = Farrowing[(index - 1)].SBT;
            }

            //Litter size at birth
            if (Farrowing[(index - 1)].LSBM == null) {
                strLSBM = "";
            }
            else {
                strLSBM = Farrowing[(index - 1)].LSBM;
            }

            if (Farrowing[(index - 1)].LSBF == null) {
                strLSBF = "";
            }
            else {
                strLSBF = Farrowing[(index - 1)].LSBF;
            }

            if (Farrowing[(index - 1)].LSBT == null) {
                strLSBT = "";
            }
            else {
                strLSBT = Farrowing[(index - 1)].LSBT;
            }

            //Litter weight at birth
            if (Farrowing[(index - 1)].LWBM == null) {
                strLWBM = "";
            }
            else {
                strLWBM = Farrowing[(index - 1)].LWBM;
            }

            if (Farrowing[(index - 1)].LWBF == null) {
                strLWBF = "";
            }
            else {
                strLWBF = Farrowing[(index - 1)].LWBF;
            }

            if (Farrowing[(index - 1)].LWBT == null) {
                strLWBT = "";
            }
            else {
                strLWBT = Farrowing[(index - 1)].LWBT;
            }

            $(element).append(
                "<td><label>" + index + "</label></td>"
                + "<td><label>" + Farrowing[(index - 1)].FarrowingDate + "</label></td>"
                + "<td><label>" + Farrowing[(index - 1)].Boarno + "</label></td>"
                + "<td><label>" + Farrowing[(index - 1)].MatingDate + "</label></td>"
                + "<td><label>" + strSBM + "</label></td>"
                + "<td><label>" + strSBF + "</label></td>"
                + "<td><label>" + strSBT + "</label></td>"
                + "<td><label>" + strLSBM + "</label></td>"
                + "<td><label>" + strLSBF + "</label></td>"
                + "<td><label>" + strLSBT + "</label></td>"
                + "<td><label>" + strLWBM + "</label></td>"
                + "<td><label>" + strLWBF + "</label></td>"
                + "<td><label>" + strLWBT + "</label></td>"
                + "<td><div class='btn-group pull-right'>"
                + "<button class='btn btn-warning btn-sm' onclick='SetEditFarrowing(" + index + "); return false;'>"
                    + "<span class='glyphicon glyphicon-pencil'></span>"
                + "</button>"
                + "</div></td>"
            );
        }
    });
}

function SetEditFarrowing(val) {
    PigletsDetails = Farrowing[(val - 1)].Piglets;
    $("#hdnFarrowingId").val(Farrowing[(val - 1)].FarrowingId);
    $("#hdnMatingId").val(Farrowing[(val - 1)].MatingId);

    $("#txtDOD").val(Farrowing[(val - 1)].DewormingDate);
    $("#txtDewormingName").val(Farrowing[(val - 1)].DewormingName);
    $("#txtDoseRoute").val(Farrowing[(val - 1)].DoseRoute);

    $("#lblDOM").html(Farrowing[(val - 1)].MatingDate);
    $("#lblBoarno").html(Farrowing[(val - 1)].Boarno);
    $("#txtDOF").val(Farrowing[(val - 1)].FarrowingDate);
    $("#txtSBM").val(Farrowing[(val - 1)].SBM);
    $("#txtSBF").val(Farrowing[(val - 1)].SBF);
    $("#lblSBT").html(Farrowing[(val - 1)].SBT);
    $("#txtLSBM").val(Farrowing[(val - 1)].LSBM);
    $("#txtLSBF").val(Farrowing[(val - 1)].LSBF);
    $("#lblLSBT").html(Farrowing[(val - 1)].LSBT);
    $("#lblLWBM").html(Farrowing[(val - 1)].LWBM);
    $("#lblLWBF").html(Farrowing[(val - 1)].LWBF);
    $("#lblLWBT").html(Farrowing[(val - 1)].LWBT);

    if ($("#lblLSBT").html() != 0) {
        if (PigletsDetails.length == 0) {
            PigletsEmptyRow();
        }
        else {
            LoadPigletDetail(PigletsDetails);
        }
        $('#divSaveContinue').css("display", "none");
    }
    else {
        $('#divSaveContinue').css("display", "block");
        $("#hdnBreedId").val(Farrowing[(val - 1)].BreedId);
        $("#txtBreed").val(Farrowing[(val - 1)].Breed);
        $("#txtGeneration").val(Farrowing[(val - 1)].Generation);
    }
}

function PigletsEmptyRow() {
    var json = '[';
    for (var i = 0; i < 1 ; i++) {

        if (i == 0) {
            json = json + "{Tagno: '', Sex: '', BirthWeight: '', Color: '', NoofTeats: '', TeatsType: ''}";
        }
        else {
            json = json + "," + "{Tagno: '', Sex: '', BirthWeight: '', Color: '', NoofTeats: '', TeatsType: ''}";
        }
    }
    json = json + "]";
    PigletsDetails = eval('(' + json + ')');
    LoadPigletDetail(PigletsDetails);
}
function ClearBreedValue(e) {
    $('#hdnBreedId').val("");
}

function CalculateWeight() {
    var LWBM = 0;
    var LWBF = 0;
    var LWBT = 0;
    for (var i = 0; i < ($('#tblPigletDetail').find("tr").length - 1) ; i++) {
        if ($("#txtBirthWeight" + (i + 1)).val() != "") {
            if ($("#drpSex" + (i + 1)).val() == 1) {
                LWBM = parseFloat(parseFloat(LWBM) + parseFloat($("#txtBirthWeight" + (i + 1)).val())).toFixed(2);
            }
            else {
                LWBF = parseFloat(parseFloat(LWBF) + parseFloat($("#txtBirthWeight" + (i + 1)).val())).toFixed(2);
            }
        }
    }
    LWBT = parseFloat(parseFloat(LWBM) + parseFloat(LWBF)).toFixed(2);
    $("#lblLWBM").html(LWBM);
    $("#lblLWBF").html(LWBF);
    $("#lblLWBT").html(LWBT);
}

function MinMaxLSWLoad() {
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Common.asmx/ConditionRetrieve',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (msg) {
            LSW = $.extend(true, [], msg.d);
            if (LSW.length > 0) {
                $('#hdnMinLSW').val(LSW[0].MinLSW);
                $('#hdnMaxLSW').val(LSW[0].MaxLSW);
            }
            else {
                $('#hdnMinLSW').val(0);
                $('#hdnMaxLSW').val(0);
            }
        },
        error: function (msg) {
            Calldialog("Failed loading Minimum Maximum LSW Load");
        }
    });
}

function MinMaxLSWCheck(id) {
    var min = $('#hdnMinLSW').val();
    var max = $('#hdnMaxLSW').val();
    var lswT = 0;
    var lswM = 0;
    var lswF = 0;
    var val = 0;
    if ($('#txtLSBM').val() != '' || $('#txtLSBF').val() != '') {
        if ($('#txtLSBM').val() != '') {
            lswM = $('#txtLSBM').val();
        }
        else {
            lswM = 0;
        }
        if ($('#txtLSBF').val() != '') {
            lswF = $('#txtLSBF').val();
        }
        else {
            lswF = 0;
        }
        var lswT = parseInt(lswM) + parseInt(lswF);
        if (lswT !== '') {
            if (parseFloat(lswT) >= parseFloat(min) && parseFloat(lswT) <= parseFloat(max)) {
                return true;
            }
            else {
                $("#lblLSBT").html();
                $('#txtLSBF').val('');
                $('#txtLSBM').val('').focus();
                Calldialog('Litter size at birth should not exceed ' + max + '.');
                return false;
            }
            //if (lswT > max) {
            //    $('#txtLSBM').val('').focus();
            //    $('#txtLSBF').val('');
            //    Calldialog('Check the value of Litter Size at Birth.');
            //    //Calldialog('Maximum Litter size at birth should be ' + $('#hdnMaxLSW').val());
            //    return false;
            //}
            //else if (min > lswT) {
            //    $('#txtLSBM').val('').focus();
            //    $('#txtLSBF').val('');
            //    Calldialog('Check the value of Litter Size at Birth.');
            //    //Calldialog('Minimum Litter size at birth should be ' + $('#hdnMinLSW').val());
            //    return false;
            //}
        }
    }
}

function MinMaxLSWCheckAddNew(id) {

    var min = $('#hdnMinLSW').val();
    var max = $('#hdnMaxLSW').val();

    var lsw = 0;
    lsw = ($('#tblPigletDetail').find("tr").length);

    if (parseFloat(lsw) >= parseFloat(min) && parseFloat(lsw) <= parseFloat(max)) {
        return true;
    }
    else {
        $("#lblLSBT").html();
        $('#txtLSBF').val('');
        $('#txtLSBM').val('').focus();
        Calldialog('Litter size at birth should not exceed ' + max + '.');
        return false;
    }
    //var lswM = 0;
    //var lswF = 0;
    // var lswT = 0;
    //lswT = parseInt(lswM) + parseInt(lswF)
    //if (lswT > 0 && lsw > 0) {
    //    if (lsw > lswT) {
    //        Calldialog('Check the value of Litter Size at Birth.');
    //        return false;
    //    }
    //    return true;
    //}
    //lsw = lsw + 1;
    //if ($('#txtLSBM').val() != '') {
    //    lswM = $('#txtLSBM').val();
    //}
    //if ($('#txtLSBF').val() != '') {
    //    lswF = $('#txtLSBF').val();
    //}
    //lswT = parseInt(lswM) + parseInt(lswF)
    //if (lswT > 0 && lsw > 0) {
    //    if (lsw > lswT) {
    //        Calldialog('Check the value of Litter Size at Birth.');
    //        return false;
    //    }
    //    return true;
    //}
}

function DamnoBasedTagnoCheck(val, index) {
    $.ajax({
        type: 'POST',
        url: CurrentUser.WebPath + 'PMS_Common.asmx/DamnoBasedTagnoCheck',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ strTagno: $('#' + val).val(), strDamno: $('#txtTagno').val() }),
        async: true,
        success: function (msg) {
            if (msg.d != "") {
                $('#txtTagno' + index).css("background-color", "#ffffff");
                ConfirmDamnoBasedTagno(index, msg.d);
            }
            else if (msg.d == "2") {
                $('#txtTagno' + index).val("").focus().css("background-color", "#f6d6d5");
                $('#drpSex' + index).val("0").css("background-color", "#ffffff");
                $('#txtBirthWeight' + index).val("").css("background-color", "#ffffff");
                $('#txtColor' + index).val("").css("background-color", "#ffffff");
                $('#txtNoofTeats' + index).val("").css("background-color", "#ffffff");
                $('#drpTeatsType' + index).val("0").css("background-color", "#ffffff");
                Calldialog('Tag no. already exist. Enter a new tag no.');
            }
            else if (msg.d == "3") {
                $('#txtTagno' + index).css("background-color", "#ffffff");
            }
        },
        error: function (msg) {
            Calldialog("Error in checking dam no. based tag no.!");
            HideLoader();
        }
    });
}

function ConfirmDamnoBasedTagno(index, msg) {
    $("#dialog_new").dialog(
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
                $('#txtTagno' + index).css("background-color", "#ffffff");
                $("#dialog_new").dialog("close");
                return true;
            },
            "No": function () {
                $('#txtTagno' + index).val("").focus().css("background-color", "#ffffff");
                $('#drpSex' + index).val("0").css("background-color", "#ffffff");
                $('#txtBirthWeight' + index).val("").css("background-color", "#ffffff");
                $('#txtColor' + index).val("").css("background-color", "#ffffff");
                $('#txtNoofTeats' + index).val("").css("background-color", "#ffffff");
                $('#drpTeatsType' + index).val("0").css("background-color", "#ffffff");
                $("#dialog_new").dialog("close").css("background-color", "#ffffff");
                return false;
            }
        }
    });

    $("#dialog_new").text(msg).dialog("open");
    return false;
}

function TagnoChk(i) {
    Tagno = $("#txtTagno" + i).val();
    if (Tagno != '') {
        for (var j = 0; j < ($('#tblPigletDetail').find("tr").length - 2) ; j++) {
            if (i != (j + 1)) {
                if (Tagno == $("#txtTagno" + (j + 1)).val()) {
                    $("#txtTagno" + i).val('').focus().css("background-color", "#f6d6d5");
                    Calldialog("Tag no. already exist. Enter a new tag no.");
                    return false;
                }
            }
        }
    }
}