function CloseWindow() {
    window.opener = self;
    window.close();
}

function LogOutSession() {
    var parent = window.opener;
    if (parent) {
        if (parent.closed) {
            var btn = document.getElementById('<wbr />btnLogOut');
            btn.click();
        }
        else {
            CloseWindow();
        }
    }
    else {
        CloseWindow();
    }
}
function noBack() {
    window.history.forward()
}
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack() }
window.onunload = function () { void (0) }
/**
* DHTML date validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/datevalidation.asp)
*/
// Declaring valid date character, minimum year and maximum year
var dtCh = "/";
var minYear = 1900;
var maxYear = 2200;

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
        if (i == 2) { this[i] = 29 }
    }
    return this
}

function isDateNew(dtStr) {
    var daysInMonth = DaysArray(12)
    var pos1 = dtStr.indexOf(dtCh)
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
    var strMonth = dtStr.substring(0, pos1)
    var strDay = dtStr.substring(pos1 + 1, pos2)
    var strYear = dtStr.substring(pos2 + 1)
    strYr = strYear
    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
    if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
    }
    month = parseInt(strMonth)
    day = parseInt(strDay)
    year = parseInt(strYr)
    if (pos1 == -1 || pos2 == -1) {
        alert("The date format should be : mm/dd/yyyy")
        return false
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {
        alert("Please enter a valid month")
        return false
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
        alert("Please enter a valid day")
        return false
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
        alert("Please enter a valid 4 digit year")
        return false
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
        alert("Please enter a valid date")
        return false
    }
    return true
}



function ValidDatePickernew(id) {
    if (document.getElementById(id).value != "") {
        var strDate = document.getElementById(id).value;
        var strLength = strDate.split('/').length;
        var arrDate = strDate.split('/');
        var strDateUpend;
        if (strLength == 2 || strLength == 3) {
            if (strLength == 2) {
                if (arrDate[1].length == 4) {
                    strDateUpend = arrDate[0] + "/01/" + arrDate[1];
                    if (!isValidDate(strDateUpend)) {
                        alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                        document.getElementById(id).style.backgroundColor = "#ffff99";
                        document.getElementById(id).focus();
                        return false;
                    }
                }
                else {
                    alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                    document.getElementById(id).style.backgroundColor = "#ffff99";
                    document.getElementById(id).focus();
                    return false;
                }
            }
            else {
                if (arrDate[2].length == 4) {
                    strDateUpend = strDate;
                    if (!isValidDate(strDateUpend)) {
                        alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                        document.getElementById(id).style.backgroundColor = "#ffff99";
                        document.getElementById(id).focus();
                        return false;
                    }
                }
                else {
                    alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                    document.getElementById(id).style.backgroundColor = "#ffff99";
                    document.getElementById(id).focus();
                    return false;
                }
            }
        }
    }
    document.getElementById(id).style.backgroundColor = "#ffffff";
    return true;
}

//// constants to define the title of the alert and button text.
//var ALERT_TITLE = "Oops!";
//var ALERT_BUTTON_TEXT = "Ok";

//// over-ride the alert method only if this a newer browser.
//// Older browser will see standard alerts
//if (document.getElementById) {
//    window.alert = function(txt) {
//        createCustomAlert(txt);
//    }
//}

//function createCustomAlert(txt) {
//    // shortcut reference to the document object
//    d = document;

//    // if the modalContainer object already exists in the DOM, bail out.
//    if (d.getElementById("modalContainer")) return;

//    // create the modalContainer div as a child of the BODY element
//    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
//    mObj.id = "modalContainer";
//    // make sure its as tall as it needs to be to overlay all the content on the page
//    mObj.style.height = document.documentElement.scrollHeight + "px";

//    // create the DIV that will be the alert 
//    alertObj = mObj.appendChild(d.createElement("div"));
//    alertObj.id = "alertBox";
//    // MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
//    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
//    // center the alert box
//    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";

//    // create an H1 element as the title bar
//    h1 = alertObj.appendChild(d.createElement("h1"));
//    h1.appendChild(d.createTextNode(ALERT_TITLE));

//    // create a paragraph element to contain the txt argument
//    msg = alertObj.appendChild(d.createElement("p"));
//    msg.innerHTML = txt;

//    // create an anchor element to use as the confirmation button.
//    btn = alertObj.appendChild(d.createElement("a"));
//    btn.id = "closeBtn";
//    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
//    btn.href = "#";
//    // set up the onclick event to remove the alert when the anchor is clicked
//    btn.onclick = function() { removeCustomAlert(); return false; }


//}

//// removes the custom alert from the DOM
//function removeCustomAlert() {
//    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
//}

function popupNew(url, ID) {
    var newwin = window.open(url, ID, 'width=' + 800 + ', height=' + 800 + ',top=0, left=0, location=yes,menubar=no,resizable=yes,status=no,titlebar=no,scrollbars=yes');
    if (window.focus) {
        newwin.focus();
    }
    return false;
}

var pbQueue = new Array();
var argsQueue = new Array();
window.onload = pageLoad;

function pageLoad() {

    //$addHandler(document, "keydown", onKeyDown);
    //$addHandler(document, "onkeypress", keypress);

}
function onKeyDown(e) {
    if (e && e.keyCode == Sys.UI.Key.esc) {
        Sys.WebForms.PageRequestManager.getInstance().abortPostBack();
        args.set_cancel(true);
        return disableCtrlKeyCombination(event);
        //alert("A request is currently being processed. Please wait before refreshing again.");
    }
}
function endPostBack(sender, args) {

    //alert('One postback end');
    if (pbQueue.length > 0) {
        __doPostBack(pbQueue.shift(), argsQueue.shift());
    }
    true;
}
function cancelPostBack(sender, args) {
    if (Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack()) {
        alert('Your last request in process Please wait!!!');
        args.set_cancel(true);
        pbQueue.push(args.get_postBackElement().id);
        argsQueue.push(document.forms[0].__EVENTARGUMENT.value);
        true;
    }
}
function BeginRequestHandler(sender, args) {

}
function keypress() {
    return disableCtrlKeyCombination(event);
}
//window.onkeydown = function() {
//    return disableCtrlKeyCombination(event);
//}
function disableCtrlKeyCombination(e) {
    //list all CTRL + key combinations you want to disable
    //var forbiddenKeys = new Array('a', 'n', 'c', 'k', 'x', 'v', 'j', 'w');
    var forbiddenKeys = new Array('a', 'n', 'k', 'x', 'j', 'w');
    var key;
    var isCtrl;

    if (window.event) {
        key = window.event.keyCode;     //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {

        key = e.which;     //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }

    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl) {
        for (i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
                //alert('Key combination CTRL + ' + String.fromCharCode(key) + ' has been disabled.');
                return false;
            }
        }
    }
    return true;
}
//window.onunload = function() {
//    if (window.location.href.toLowerCase().indexOf('popup') > -1 || window.location.href.toLowerCase().indexOf('frmremainder.aspx') > -1 || window.location.href.toLowerCase().indexOf('frmphonecallsattoeney.aspx') > -1) {
//        return true;
//    }
//    else {
//        alert('Please log of and close');
//        return false;
//    }

function myOnSubmit() {

    var elist = document.getElementsByTagName("INPUT");
    for (var i in elist) {
        if (elist[i].value.toUpperCase()) {
            elist[i].value = elist[i].value.toUpperCase();
        }
    }
    return true;

}

function CLOSE() {
    self.close();
    return true;

}
function getPrint(print_area) {
    //Creating new page
    var pp = window.open();
    //Adding HTML opening tag with <HEAD> … </HEAD> portion 
    pp.document.writeln('<HTML><HEAD><title>Print Preview</title><LINK href=Styles.css  type="text/css" rel="stylesheet">')
    pp.document.writeln('<LINK href=PrintStyle.css  type="text/css" rel="stylesheet" media="print"><base target="_self"></HEAD>')
    //Adding Body Tag
    pp.document.writeln('<body MS_POSITIONING="GridLayout" bottomMargin="0" leftMargin="0" topMargin="0" rightMargin="0">');
    //Adding form Tag
    pp.document.writeln('<form  method="post">');
    //Creating two buttons Print and Close within a table
    pp.document.writeln('<TABLE width=100%><TR><TD></TD></TR><TR><TD align=right><INPUT ID="PRINT" type="button" value="Print" onclick="javascript:location.reload(true);window.print();"><INPUT ID="CLOSE" type="button" value="Close" onclick="window.close();"></TD></TR><TR><TD></TD></TR></TABLE>');
    //Writing print area of the calling page
    pp.document.writeln(document.getElementById(print_area).innerHTML);
    //Ending Tag of </form>, </body> and </HTML>
    pp.document.writeln('</form></body></HTML>');

}


function DisplayCalender(id, imgControl, txtControl) {
    var imgid = id;
    var textid = id.replace(imgControl, txtControl);
    showCal(textid, document.getElementById(imgid));
    return false;
}

function DisplayCalender1(id, imgControl, txtControl) {
    var imgid = id;
    var textid = id.replace(imgControl, txtControl);
    showCal1(textid, document.getElementById(imgid));
    return false;
}
function Round2Decimal(n) {
    ans = n * 1000
    ans = Math.round(ans / 10) + ""
    while (ans.length < 3) {
        ans = "0" + ans
    }
    len = ans.length
    ans = ans.substring(0, len - 2) + "." + ans.substring(len - 2, len)
    return ans
}
var worktabctrl;
var worktabpanel;
var Formtabctrl;
var redireceUrl = '';
var ctrl;
var tabpanel;
var fromTab = false;
var fromAddaddress = false;
var fromAddnew = false;
var fromSetOrder = false;
var saved = true;
var fromGridedit = false;
var WorkTabIndex = false;
var workFlagCancel = false;
var fromReferal = false;
var workActiveindex;
window.onerror = function (msg, url, linenumber) {
    //alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber)
    return true
}

//window.document.onclick = handle;

function setworktab() {
    if (worktabctrl) {
        Formtabctrl = true;
        worktabctrl.set_activeTab(worktabpanel);
        document.getElementById('hdnDirty').value = "1";
    }
}

function checkWorkTabSave(sender, e) {
    //    if (workFlagCancel == true) {
    //        workFlagCancel = false;
    //        return;
    //    }
    worktabctrl = $find("TabContainer2");
    worktabpanel = worktabctrl.get_tabs()[0];
    if (worktabctrl)
        workActiveindex = worktabctrl._activeTabIndex;
    if (!window.ActiveXObject) {
        var elem = (event.target) ? event.target : event.srcElement;
        Control = elem.id.toLowerCase();
    }
    else {
        if (window.event) {
            var elem = (window.event.target) ? window.event.target : window.event.srcElement;
            Control = elem.id.toLowerCase();
        }
    }
    if (Control.indexOf('TabContainer2') > -1 && Control == '__tab_TabContainer2_TabPanel12') {
        WorkTabIndex = 0;
    }

    else if (Control.toLowerCase().indexOf('tabcontainer2') > -1 && Control.toLowerCase() == '__tab_tabcontainer2_tabpanel5') {
        WorkTabIndex = 1;
    }
    else if ((Control.toLowerCase().indexOf('tabcontainer2') > -1) && Control.toLowerCase() == '__tab_tabcontainer2_tabpanel6') {
        WorkTabIndex = 2;
    }
    else if ((Control.toLowerCase().indexOf('tabcontainer2') > -1) && Control.toLowerCase() == '__tab_tabcontainer2_tabpanel7') {
        WorkTabIndex = 3;
    }
    else if ((Control.toLowerCase().indexOf('tabcontainer2') > -1) && Control.toLowerCase() == '__tab_tabcontainer2_tabpanel8') {
        WorkTabIndex = 4;
    }
    else if ((Control.toLowerCase().indexOf('tabcontainer2') > -1) && Control.toLowerCase() == '__tab_tabcontainer2_tabpanel9') {
        WorkTabIndex = 5;
    }
    else if ((Control.toLowerCase().indexOf('tabcontainer2') > -1) && Control.toLowerCase() == '__tab_tabcontainer2_tabpanel10') {
        WorkTabIndex = 6;
    }
    if (document.getElementById('hdnDirty') && document.getElementById('hdnDirty').value == '1') {
        callAlert()
        if (isChoice == 6) {
            worktabctrl._loaded = false;
            setTimeout("setworktab()", 100);
            if (document.getElementById('btnAppSave') && workActiveindex == 0) {
                document.getElementById('btnAppSave').click();
            }
            if (document.getElementById('TabContainer2_TabPanel5_btnCourtDatesAdd') && workActiveindex == 1) {
                document.getElementById('TabContainer2_TabPanel5_btnCourtDatesAdd').click();
            }
            if (document.getElementById('TabContainer2_TabPanel6_btnCriticalDeadlineSave') && workActiveindex == 2) {
                varresult = document.getElementById('TabContainer2_TabPanel6_btnCriticalDeadlineSave').click();
            }
            if (document.getElementById('TabContainer2_TabPanel7_btnPhoneCallsSave') && workActiveindex == 3) {
                varresult = document.getElementById('TabContainer2_TabPanel7_btnPhoneCallsSave').click();
            }
            if (document.getElementById('TabContainer2_TabPanel8_btnTaskSave') && workActiveindex == 4) {
                document.getElementById('TabContainer2_TabPanel8_btnTaskSave').click();
            }
            if (document.getElementById('TabContainer2_TabPanel9_btnDiarySave') && workActiveindex == 5) {
                document.getElementById('TabContainer2_TabPanel9_btnDiarySave').click();
            }
            if (document.getElementById('TabContainer2_TabPanel10_btnSave') && workActiveindex == 6) {
                document.getElementById('TabContainer2_TabPanel10_btnSave').click();
            }
            return false;
        }
        else if (isChoice == 7) {
            worktabctrl._loaded = true;
            workFlagCancel = true;
            document.getElementById('hdnDirty').value = '';
        }
        else {
            Formtabctrl = false;
            worktabctrl._loaded = false;
            setTimeout("setworktab()", 100);
        }
    }
}

function stopEvent(e) {
    if (!e) var e = window.event;
    //e.cancelBubble is supported by IE - this will kill the bubbling process.
    e.cancelBubble = true;
    e.returnValue = false;
    document.getElementById('hdnDirty').value = "1";

    //e.stopPropagation works only in Firefox.
    if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById('hdnDirty').value = "1";
    }
    return false;
}
function checkTabSave(sender, e) {
    ctrl = $find("TabContainer1");
    tabpanel = ctrl.get_tabs()[0];
    worktabctrl = $find("TabContainer2");
    if (worktabctrl)
        worktabpanel = worktabctrl.get_tabs()[0];
    if (worktabctrl != undefined) {
        WorkTabIndex = worktabctrl._activeTabIndex;
    }
    if (!window.ActiveXObject) {
        var elem = (event.target) ? event.target : event.srcElement;
        Control = elem.id.toLowerCase();
    }
    else {
        var elem = (window.event.target) ? window.event.target : window.event.srcElement;
        Control = elem.id.toLowerCase();
    }
    if (Control.indexOf('tab_tabcontainer') > -1 && Control == '__tab_tabcontainer1_tabpanel1') {
        redireceUrl = 'frmCaseDetails.aspx';
    }

    else if (Control.indexOf('tab_tabcontainer') > -1 && Control == '__tab_tabcontainer1_tabpanel2') {
        redireceUrl = 'frmPlaintiff.aspx';
    }
    else if ((Control.indexOf('tab_tabcontainer') > -1) && Control == '__tab_tabcontainer1_tabpanel3') {
        redireceUrl = 'frmDefendant.aspx';
    }
    else if (Control.indexOf('tab_tabcontainer') > -1) {
        redireceUrl = 'frmSVGForm.aspx';
    }

    if (document.getElementById('hdnDirty') && document.getElementById('hdnDirty').value == '1') {
        callAlert()
        if (isChoice == 6) {
            ctrl._loaded = false;
            setTimeout("settab()", 100);
            if (document.getElementById('btnSave')) {
                document.getElementById('btnSave').click();
            }
            else if (document.getElementById('btnSave')) {
                document.getElementById('btnSave').click();
            }
            else if (document.getElementById('btnSave')) {
                varresult = document.getElementById('btnSave').click();
            }
            else if (document.getElementById('btnOutsideSave')) {
                document.getElementById('btnOutsideSave').click();
            }
            else if (document.getElementById('btnSave')) {
                document.getElementById('btnSave').click();
            }
            else if (document.getElementById('btnAppSave') && WorkTabIndex == 0) {
                document.getElementById('btnAppSave').click();
            }
            else if (document.getElementById('TabContainer2_TabPanel5_btnCourtDatesAdd') && WorkTabIndex == 1) {
                document.getElementById('TabContainer2_TabPanel5_btnCourtDatesAdd').click();
            }
            else if (document.getElementById('TabContainer2_TabPanel6_btnCriticalDeadlineSave') && WorkTabIndex == 2) {
                varresult = document.getElementById('TabContainer2_TabPanel6_btnCriticalDeadlineSave').click();
            }
            else if (document.getElementById('TabContainer2_TabPanel7_btnPhoneCallsSave') && WorkTabIndex == 3) {
                varresult = document.getElementById('TabContainer2_TabPanel7_btnPhoneCallsSave').click();
            }
            else if (document.getElementById('TabContainer2_TabPanel8_btnTaskSave') && WorkTabIndex == 4) {
                document.getElementById('TabContainer2_TabPanel8_btnTaskSave').click();
            }
            else if (document.getElementById('TabContainer2_TabPanel9_btnDiarySave') && WorkTabIndex == 5) {
                document.getElementById('TabContainer2_TabPanel9_btnDiarySave').click();
            }
            else if (document.getElementById('TabContainer2_TabPanel10_btnSave') && WorkTabIndex == 6) {
                document.getElementById('TabContainer2_TabPanel10_btnSave').click();
            }
            else if (document.getElementById('btnSave')) {
                document.getElementById('btnSave').click();
            }
            else if (document.getElementById('btnFirm_Save')) {
                document.getElementById('btnFirm_Save').click();
            }
            else if (document.getElementById('btnTreatment_Save')) {
                document.getElementById('btnTreatment_Save').click();
            }
            else if (document.getElementById('btnCourt_Save')) {
                document.getElementById('btnCourt_Save').click();
            }
            else if (document.getElementById('btninterestSave')) {
                document.getElementById('btninterestSave').click();
            }
            else if (document.getElementById('btnSaveOrder')) {
                document.getElementById('btnSaveOrder').click();
            }
            return false;
        }
        else if (isChoice == 7) {
            ctrl._loaded = false;
            setTimeout("settab()", 100);
            fromTab = true;
            window.location.href = redireceUrl;


        }
        else {
            fromTab = false;
            ctrl._loaded = false;
            setTimeout("settab()", 100);
        }

    }
    else {

    }
}

//function checkTabSave(sender, e) {
//    var sSave;
//    var Control;
//    if (Tabset == true)
//        return true;
//    ctrl = $find("TabContainer1");
//    tabpanel = ctrl.get_tabs()[0];

////    if ((window.ActiveXObject) && window.event.srcElement && window.event.srcElement.id.toLowerCase().indexOf('__tab_tabcontainer1_tabpanel1') > -1) {
////        stopEvent(e);
////    }
////    if ((window.ActiveXObject) && window.event.srcElement && window.event.srcElement.id.toLowerCase().indexOf('__tab_tabcontainer1_tabpanel2') > -1) {
////        stopEvent(e);
////    }
////    if ((window.ActiveXObject) && window.event.srcElement && window.event.srcElement.id.toLowerCase().indexOf('__tab_tabcontainer1_tabpanel3') > -1) {
////        stopEvent(e);
////    }
//    if (!window.ActiveXObject) {
//        var elem = (event.target) ? event.target : event.srcElement;
//        Control = elem.id.toLowerCase();
//    }
//    else {
//        var elem = (window.event.target) ? window.event.target : window.event.srcElement;
//        Control = elem.id.toLowerCase();
//    }
//    if (Control.indexOf('tab_tabcontainer') > -1 && $find('TabContainer1').get_activeTabIndex()) {
//        if (Control.indexOf('tab_tabcontainer') > -1 && $find('TabContainer1').get_activeTabIndex() == 0) {
//            redireceUrl = 'frmCaseDetails.aspx';
//        }

//        else if (Control.indexOf('tab_tabcontainer') > -1 && $find('TabContainer1').get_activeTabIndex() == 1) {
//            redireceUrl = 'frmPlaintiff.aspx';
//        }
//        else if ((Control.indexOf('tab_tabcontainer') > -1) && $find('TabContainer1').get_activeTabIndex() == 2) {
//            redireceUrl = 'frmDefendant.aspx';
//        }
//        else if (Control.indexOf('tab_tabcontainer') > -1) {
//            redireceUrl = 'frmSVGForm.aspx';
//        }
//        setTimeout("setClearDirty()", 10);

//        if (isDirty == 1 && document.getElementById('hdnDirty').value == "1") {
//            callAlert();
//            if (isChoice == 6) {
//                ctrl._loaded = false;
//                setTimeout("settab()", 100);
//                var varresult;
//                if (document.getElementById('btnSave')) {
//                    document.getElementById('btnSave').click();
//                }
//                if (document.getElementById('btnSave')) {
//                    document.getElementById('btnSave').click();
//                }
//                if (document.getElementById('btnSave')) {
//                    varresult = document.getElementById('btnSave').click();
//                }
//                if (document.getElementById('btnAppSave'))
//                    varresult = document.getElementById('btnAppSave').click();
//                if (document.getElementById('btnOutsideSave')) {
//                    document.getElementById('btnOutsideSave').click();
//                }
//                if (document.getElementById('btnSave')) {
//                    document.getElementById('btnSave').click();
//                }
//                if (document.getElementById('btnSave')) {
//                    document.getElementById('btnSave').click();
//                }
//                redireceUrl = window.event.srcElement.href;
//                saved = true;
//                return false;
//            }
//            else if (isChoice == 7) {
//                ctrl._loaded = false;
//                setTimeout("settab()", 100);
//                if (window.event.srcElement)
//                    window.location.href = window.event.srcElement.href;
//            }
//            else {
//                ctrl._loaded = false;
//                setTimeout("settab()", 100);
//                saved = true;
//                
//                redireceUrl = '';
//                setTimeout("document.getElementById('hdnDirty').value = '1'", 1000);
//                return false;
//            }
//        }
//        return false;
//    }
//}


function settab() {
    if (ctrl) {
        ctrl.set_activeTab(tabpanel);
        document.getElementById('hdnDirty').value = "1";
    }
}

function handle(event) {
    saved = false;
    if (fromTab == true) {
        fromTab = false;
        return;
    }
    if (Formtabctrl == true) {
        Formtabctrl = false;
        return;
    }

    var Control;
    if (!window.ActiveXObject) {
        var elem = (event.target) ? event.target : event.srcElement;
        Control = elem.id.toLowerCase();
    }
    else {
        var elem = (window.event.target) ? window.event.target : window.event.srcElement;
        Control = elem.id.toLowerCase();
    }

    if ((window.ActiveXObject) && window.event.srcElement && window.event.srcElement.outerHTML.toLowerCase().indexOf('>edit<') > -1) {
        fromGridedit = true;
        return true;
    }
    if (Control.indexOf('lnkvender') > -1) {
        fromAddaddress = true;
        return true;
    }
    if (Control.indexOf('lnkaddnew') > -1) {
        fromAddaddress = true;
        return true;
    }

    if (Control.indexOf('lnkbtnaddnew') > -1) {
        fromAddaddress = true;
        return true;
    }

    if (Control.indexOf('lnkcopyaddr') > -1) {
        fromAddaddress = true;
        return true;
    }
    if (Control.indexOf('lnkcopyaddr') > -1) {
        fromAddaddress = true;
        return true;
    }
    if (Control.indexOf('lnksetorder') > -1) {
        fromSetOrder = true;
        return true;
    }
    if (Control.indexOf('lnkReferal') > -1) {
        fromReferal = true;
        return true;
    }


    if ((window.ActiveXObject) && window.event.srcElement && window.event.srcElement.outerHTML.toLowerCase().indexOf('>reminder<') > -1) {
        return true;
    }
    if ((window.ActiveXObject) && window.event.srcElement) {
        if (window.event.srcElement.href != null && window.event.srcElement.href.indexOf('frm') > -1) {
            {
                if (isDirty == 1 && document.getElementById('hdnDirty') && document.getElementById('hdnDirty').value == "1") {
                    callAlert();
                    if (isChoice == 6) {
                        var varresult;
                        if (document.getElementById('btnSave')) {
                            document.getElementById('btnSave').click();
                        }
                        if (document.getElementById('btnSave')) {
                            document.getElementById('btnSave').click();
                        }
                        if (document.getElementById('btnSave')) {
                            varresult = document.getElementById('btnSave').click();
                        }
                        if (document.getElementById('btnAppSave'))
                            varresult = document.getElementById('btnAppSave').click();
                        if (document.getElementById('btnOutsideSave')) {
                            document.getElementById('btnOutsideSave').click();
                        }
                        if (document.getElementById('btnSave')) {
                            document.getElementById('btnSave').click();
                        }
                        if (document.getElementById('btnSave')) {
                            document.getElementById('btnSave').click();
                        }
                        if (document.getElementById('btnFirm_Save')) {
                            document.getElementById('btnFirm_Save').click();
                        }
                        if (document.getElementById('btnTreatment_Save')) {
                            document.getElementById('btnTreatment_Save').click();
                        }
                        if (document.getElementById('btnCourt_Save')) {
                            document.getElementById('btnCourt_Save').click();
                        }
                        if (document.getElementById('btninterestSave')) {
                            document.getElementById('btninterestSave').click();
                        }
                        if (document.getElementById('btnSaveOrder')) {
                            document.getElementById('btnSaveOrder').click();
                        }
                        redireceUrl = window.event.srcElement.href;
                        saved = true;
                        return false;
                        stopEvent(evt);
                    }
                    else if (isChoice == 7) {
                        if (window.event.srcElement)
                            redireceUrl = window.event.srcElement.href;
                        saved = true;
                        setTimeout("setClearDirty()", 10);
                        return false;
                    }
                    else {
                        saved = true;

                        redireceUrl = '';
                        setTimeout("document.getElementById('hdnDirty').value = '1'", 1000);
                        return false;
                    }
                }
            }
        }
    }
    else {
        var a = event.target.toString()
        if (a.indexOf('frm') > -1) {
            if (isDirty == 1 && document.getElementById('hdnDirty') && document.getElementById('hdnDirty').value == "1") {
                sSave = window.confirm("There are some changes that have not been saved. Click OK to save now or CANCEL to continue without saving.");
                if (sSave == true) {
                    if (document.getElementById('btnSave')) {
                        document.getElementById('btnSave').click();
                    }
                    if (document.getElementById('btnSave')) {
                        document.getElementById('btnSave').click();
                    }
                    if (document.getElementById('btnSave')) {
                        varresult = document.getElementById('btnSave').click();
                    }
                    if (document.getElementById('btnAppSave'))
                        varresult = document.getElementById('btnAppSave').click();
                    if (document.getElementById('btnOutsideSave')) {
                        document.getElementById('btnOutsideSave').click();
                    }
                    if (document.getElementById('btnSave')) {
                        document.getElementById('btnSave').click();
                    }
                    if (document.getElementById('btnSave')) {
                        document.getElementById('btnSave').click();
                    }
                    if (document.getElementById('btnFirm_Save')) {
                        document.getElementById('btnFirm_Save').click();
                    }
                    if (document.getElementById('btnTreatment_Save')) {
                        document.getElementById('btnTreatment_Save').click();
                    }
                    if (document.getElementById('btnCourt_Save')) {
                        document.getElementById('btnCourt_Save').click();
                    }
                    if (document.getElementById('btninterestSave')) {
                        document.getElementById('btninterestSave').click();
                    }
                    if (document.getElementById('btnSaveOrder')) {
                        document.getElementById('btnSaveOrder').click();
                    }
                    setTimeout("return saved", 10000);
                }
                else {
                    return false;
                }
            }
        }
    }
    if (redireceUrl != '' && saved) {
        setTimeout("setClearDirty()", 10);
        return true;
    }
}

var isChoice;
function callAlert() {
    vbMsg('There are some changes that have not been saved. Do you want to save now ?..', 'IRIS')
    return isChoice;

}

//window.onbeforeunload = function(evt) {
//    if (fromTab == true) {
//        fromTab = false;
//        return;
//    }
//    if (!document.getElementById('hdnDirty')) {
//        return;
//    }
//    if (fromGridedit == true) {
//        fromGridedit = false;
//        return;
//    }
//    if (fromAddaddress == true) {
//        fromAddaddress = false;
//        return;
//    }
//    if (fromAddnew == true) {
//        fromAddnew = false;
//        return;
//    }
//    if (fromSetOrder == true) {
//        fromSetOrder = false;
//        return;
//    }
//    if (fromReferal == true) {
//        fromReferal = false;
//        return true;
//    }


//    if (!saved && document.getElementById('hdnDirty') && document.getElementById('hdnDirty').value == "1") {
//        callAlert();
//        if (isChoice == 6) {
//            var varresult;
//            if (document.getElementById('btnSave')) {
//                document.getElementById('btnSave').click();
//            }
//            if (document.getElementById('btnSave')) {
//                document.getElementById('btnSave').click();
//            }
//            if (document.getElementById('btnSave')) {
//                varresult = document.getElementById('btnSave').click();
//            }
//            if (document.getElementById('btnAppSave'))
//                varresult = document.getElementById('btnAppSave').click();
//            if (document.getElementById('btnOutsideSave')) {
//                document.getElementById('btnOutsideSave').click();
//            }
//            if (document.getElementById('btnSave')) {
//                document.getElementById('btnSave').click();
//            }
//            if (document.getElementById('btnSave')) {
//                document.getElementById('btnSave').click();
//            }
//            if (document.getElementById('btnFirm_Save')) {
//                document.getElementById('btnFirm_Save').click();
//            }
//            if (document.getElementById('btnTreatment_Save')) {
//                document.getElementById('btnTreatment_Save').click();
//            }
//            if (document.getElementById('btnCourt_Save')) {
//                document.getElementById('btnCourt_Save').click();
//            }
//            if (document.getElementById('btninterestSave')) {
//                document.getElementById('btninterestSave').click();
//            }
//            if (document.getElementById('btnSaveOrder')) {
//                document.getElementById('btnSaveOrder').click();
//            }
//            if (window.event.srcElement)
//                redireceUrl = window.event.srcElement.href;
//            saved = false;
//            if (evt && evt.cancelbubble) {
//                evt.cancelbubble = true;
//            }
//            else if (window.event && window.event.cancelbubble) {
//                window.event.cancelbubble = true;
//            }
//            stopEvent(evt);
//        }
//        else if (isChoice == 7) {
//            if (window.event.srcElement)
//                redireceUrl = window.event.srcElement.href;
//            setTimeout("setClearDirty()", 10);
//            saved = false;
//            if (evt && evt.cancelbubble) {
//                evt.cancelbubble = true;
//            }
//            else if (window.event && window.event.cancelbubble) {
//                
//                window.event.cancelbubble = true;

//            }
//        }
//        else {
//            saved = true;
//            redireceUrl = '';
//            if (evt && evt.cancelbubble) {
//                evt.cancelbu = true;
//            }
//            else if (window.event) {
//                window.event.cancelbubble = true;
//                return;
//            }
//            setTimeout("document.getElementById('hdnDirty').value = '1'", 1000);
//        }
//    }
//}

//function checksaved() {
//    var newWindow;
//    var v_Options;
//    var v_Bars;

//    try {
//        if (saved) {
//            v_Bars = 'directories=no, location=no, menubar=no, status=no,titlebar=no,toolbar=no';
//            v_Options = 'scrollbars=no,resizable=no,Height=1,Width=10,left=-100,top=-100,visible=false,alwaysLowered=yes;';
//            newWindow = window.open('frmCheckyser.aspx', 'testWindowe', 'scrollbars=yes, center=' + (screen.width) / 2 + ',width=1,height=1');
//            newWindow.resizeTo(0, 0)
//            newWindow.top = -5000;
//            newWindow.blur();
//        }
//        else {

//        }
//    }
//    catch (execption) {
//        return true;
//    }
//}
function fnCheckParent() {
    //    try {

    //        if (window.opener.location.href.indexOf('frmLogout.aspx') > 0 || window.opener.location.href.indexOf('frm') == -1) {
    //            window.close();
    //        }
    //    }
    //    catch (exception) {
    //        window.close();
    //    }
    return false;
}

//---------------- Javascript Functions -----------------------//		
// Project Name					: FAS
//------------------------------------------------------------//
function isNumeric(val) {
    //Function not allow to enter alphabets common to all browsers
    var dig = "";
    var strst = ""; var strend = "";
    var strsub = "";
    for (i1 = 0; i1 < 500; i1++) {
        strst = "";
        strend = "";
        strsub = "";
        dig = document.getElementById(val).value;
        for (i = 0; i < dig.length; i++) {
            strsub = dig.substring(i, i + 1);
            if (parseFloat(strsub, 10) == (strsub * 1)) {

            }
            else {
                strst = dig.substring(0, i);
                strend = dig.substring(i + 1, dig.length)
                dig = dig.substring(0, dig.length);
                document.getElementById(val).value = strst + strend;
            }
        }
    }
}

// ------ Accept Numeric from '0' to '9' Only ----------		
function Numeric() {
    if ((event.keyCode >= 48 && event.keyCode <= 57)) {
        event.keyCode = event.keyCode;
    }
    else {
        event.keyCode = 0;

    }
}
// ------ Accept Email  ----------		
function Email() {
    if (!(((event.keyCode >= 65) && (event.keyCode <= 90)) || ((event.keyCode >= 97) && (event.keyCode <= 122)) || (event.keyCode == 64) || ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode == 46) || (event.keyCode == 95)))) {
        event.keyCode = 0;
    }
}



// ------ Accept Alphabets from 'A' to 'Z' & Numbers Only ----------		
function AlphaUpperNumeric() {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57)) {
        event.keyCode = event.keyCode;
    }
    else {
        event.keyCode = 0;
    }
}

//---Accept Numbers from '0' to '9' and '+' -----------
function NumericPlus() {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode == 43)) {
        event.keyCode = event.keyCode;
    }
    else {
        event.keyCode = 0;
    }
}

// ------ Accept Decimal from '0' to '9' and '.' Only ----------
function Decimal() {

    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode == 46)) {
        event.keyCode = event.keyCode;
    }
    else {
        event.keyCode = 0;
    }
}

// ------ Accept Upper Case,lower Case and Space and numbers Only ----------
function Alphanumeric() {
    if ((event.keyCode >= 48 && event.keyCode <= 57)) {
        event.keyCode = event.keyCode;
    }
    else {
        AlphaULS();
    }

}

// ------ Accept Numbers Only ----------
function Numeric() {
    if ((event.keyCode >= 48 && event.keyCode <= 57)) {
        event.keyCode = event.keyCode;
    }
    else {
        event.keyCode = 0;
    }
}


// ------ Accept Upper Case,lower Case and Space Only ----------
function AlphaULS() {
    if (!(((event.keyCode >= 65) && (event.keyCode <= 90)) || ((event.keyCode >= 97) && (event.keyCode <= 122)) || (event.keyCode == 32) || (event.keyCode == 46) || (event.keyCode == 44) || (event.keyCode == 95))) {
        event.keyCode = 0;
    }
}

//-------------- Confirm function for Delete -------------//
//			function confirm_delete()
//			{
//				if(confirm("Are you sure want to Delete?")==true)
//				{
//					return true;
//				}
//				else
//				{
//					return false;
//				}
//			}


//-------------- Confirm function for Sign out -------------//
function confirm_signout() {
    if (confirm("Are you sure, do you want to Sign out ?") == true) {
        return true;
    }
    else {
        return false;
    }
}

function confirm_bckUp() {
    if (confirm("Are you sure, do you want to take Backup ?") == true) {
        return true;
    }
    else {
        return false;
    }
}


// ------ Phone Number Validation(0-9 , -  )----------		
function PhoneValidation() {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode == 44) || (event.keyCode == 45) || (event.keyCode == 32)) {
        event.keyCode = event.keyCode;
    }
    else {
        event.keyCode = 0;
    }
}
// ------ Address Validation (0-9 , A - Z a - z , / - .- ,#,@ )----------		
function Address() {
    if (!(((event.keyCode >= 65) && (event.keyCode <= 90)) || ((event.keyCode >= 97) && (event.keyCode <= 122)) || (event.keyCode == 32) || (event.keyCode == 35) || (event.keyCode == 64) || ((event.keyCode >= 44 && event.keyCode <= 57)))) {
        event.keyCode = 0;
    }

}

//--------------- To Check the Form Controls -----------		

function formValidator(ID, strElements) {
    var stringArray = strElements.split(',');
    for (var iLoop = 0; iLoop < stringArray.length; iLoop++) {
        var strCurrElement = stringArray[iLoop];
        var theForm = document.getElementById(ID);
        var allvalid = true;
        var alertstr = "";
        var validstr = "All form data is correct.\n\n";
        var num_of_elements = theForm.length;
        var radio_selected = false;
        var checkbox_selected = false;
        for (var i = 0; i < num_of_elements; i++) {
            var theElement = theForm.elements[i];
            var element_type = theElement.type;
            var element_name = theElement.name;
            var element_value = theElement.value;

            if (strCurrElement == element_name) {
                // Check Text Box ...
                if (element_type == "text") {
                    if (trim(element_value).length == 0) {
                        alert("Sorry,Cannot Save data without mandatory field!");
                        theElement.focus();
                        theElement.style.backgroundColor = "#ffff99";
                        return false;
                    }
                    else {
                        theElement.style.backgroundColor = "#ffffff";
                    }
                }
                //password field
                if (element_type == "password") {
                    if (trim(element_value).length == 0) {
                        alert("Enter the mandatory field!");
                        theElement.focus();
                        theElement.style.backgroundColor = "#ffff99";
                        return false;
                    }
                    else {
                        theElement.style.backgroundColor = "#ffffff";
                    }
                }
                // Check Drop-down lists ...
                if (element_type.indexOf("select") > -1) {
                    var index = theElement.selectedIndex;
                    if (index == "0") {
                        alert("Select the mandatory field !");
                        theElement.focus();
                        theElement.style.backgroundColor = "#ffff99";
                        return false;
                    }
                    else {
                        theElement.style.backgroundColor = "#ffffff";
                    }
                }
                // Check Textarea boxes ...
                if (element_type == "textarea") {
                    if (element_value.length == 0) {
                        alert("Enter the mandatory field!");
                        theElement.focus();
                        theElement.style.backgroundColor = "#ffff99";
                        return false;
                    }
                    else {
                        theElement.style.backgroundColor = "#ffffff";
                    }
                }

                // Check List Box...
                if (element_type.indexOf("multiple") > -1) {
                    var index = theElement.selectedIndex;
                    if (index < 1) {
                        alert("Select Value!");
                        theElement.focus();
                        theElement.style.backgroundColor = "#ffff99";
                        return false;
                    }
                    else {
                        theElement.style.backgroundColor = "#ffffff";
                    }
                }

                // Check File Browser...
                if (element_type.indexOf("file") > -1) {
                    if (trim(element_value).length == 0) {
                        alert("Enter the mandatory field!");
                        theElement.focus();
                        theElement.style.backgroundColor = "#ffff99";
                        return false;
                    }
                    else {
                        theElement.style.backgroundColor = "#ffffff";
                    }
                }

                // Check Radio buttons ...
                if (element_type == "radio") {
                    if (theElement.checked == true) {
                        radio_selected = true;
                        validstr += "From form element '" + element_name +
									"' you selected the \"" + element_value + "\" button.\n\n";
                    }
                }

                // Check Checkboxes ...
                if (element_type == "checkbox") {
                    if (theElement.checked == true) {
                        checkbox_selected = true;
                        validstr += "From form element '" + element_name +
									"' you selected the \"" + element_value + "\" checkbox.\n\n";
                    }
                }
            }
        }
    }
}


// Removes leading whitespaces
function LTrim(value) {
    var re = /\s*((\S+\s*)*)/;
    return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim(value) {
    var re = /((\s*\S+)*)\s*/;
    return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim(value) {
    return LTrim(RTrim(value));

}

function ChkPerTime(ID1, ID2, ID3, ID4) {
    alert('test');
    // --------From and To Time Validation ------------
    var fromTime = document.getElementById(ID1).value + ':' + document.getElementById(ID2).value
    var toTime = document.getElementById(ID3).value + ':' + document.getElementById(ID4).value

    var Status1 = CheckValid(fromTime, toTime);

    if (Status1 == false) {
        alert("To Time Should be Greater than From Time");
        return false;
    }
    return true;
}

function CheckValid(stTime, edTime) {
    var strArryFrom = stTime.split(':');
    var iHrsFrom = strArryFrom[0];
    var iMinFrom = strArryFrom[1];
    var strArryTo = edTime.split(':');
    var iHrsTo = strArryTo[0];
    var iMinTo = strArryTo[1];
    var blnStatus = "0";
    if ((iHrsTo == iHrsFrom) && (iMinTo > iMinFrom)) {
        blnStatus = "1";
    }
    else if (iHrsTo > iHrsFrom) {
        blnStatus = "1";
    }

    if (blnStatus == "0") {
        return false;
    }
    else if (blnStatus == "1") {
        return true;
    }
    return false;
}


function CheckTime(stTime, edTime) {
    var strArryFrom = stTime.split(':');
    var iHrsFrom = strArryFrom[0];
    var iMinFrom = strArryFrom[1];
    var strArryTo = edTime.split(':');
    var iHrsTo = strArryTo[0];
    var iMinTo = strArryTo[1];
    var blnStatus = "0";
    if ((iHrsTo == iHrsFrom) && (iMinTo > iMinFrom)) {
        blnStatus = "1";
    }
    else if (iHrsTo > iHrsFrom) {
        blnStatus = "1";
    }
    if (blnStatus == "0") {
        return false;
    }
    else if (blnStatus == "1") {
        return true;
    }
    return false;

}
function CheckBetweenTime(ID1, ID2, ID3, ID4, ID5, ID6, ID7, ID8) {
    // --------From and To Time Validation 
    var fromTime = document.getElementById(ID1).value + ':' + document.getElementById(ID2).value
    var toTime = document.getElementById(ID3).value + ':' + document.getElementById(ID4).value
    var lunFromTime = document.getElementById(ID5).value + ':' + document.getElementById(ID6).value
    var lunToTime = document.getElementById(ID7).value + ':' + document.getElementById(ID8).value

    var Status1 = CheckTime(fromTime, toTime);
    if (Status1 == false) {
        alert("To Time Should be Greater than From Time");
        return false;
    }
    var Status2 = CheckTime(lunFromTime, lunToTime);
    if (Status2 == false) {
        alert("Lunch To Time Should be Greater than Lunch From time");
        return false;
    }
    var Status1 = CheckTime(fromTime, lunFromTime);
    var Status2 = CheckTime(lunToTime, toTime);
    if ((Status1 == false) || (Status2 == false)) {
        alert("Lunch Time Should be Between Working Hours");
        return false;
    }
    return true;
}

function isEmail(ID) {

    var EmailIdvalue = document.getElementById(ID).value;
    if (EmailIdvalue == "") {
        return true;
    }
    if (EmailIdvalue.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    }
    else {
        //	alert(EmailIdvalue)
        alert("Invalid E-mail Address!");
        //document.getElementById(ID).select();
        document.getElementById(ID).value = "";
        document.getElementById(ID).focus();
        return false;
    }
}



// ------ Accept Upper Case,lower Case, Numbers and NoSpace   ----------
function AlphaULNS() {
    if (!((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 48 && event.keyCode <= 57))) {
        event.keyCode = event.keyCode;
    }
}

// ---------------Accept Lowercase uppercase Numbers and undersocre only----

function UserNameValidation() {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode == 95)) {
        event.keyCode = event.keyCode;
    }
    else {
        AlphaULNS();
    }

}


function isAlpha(val) {
    //Function not allowed to enter numbers common to all browsers
    escap(val); //Function not allowed to enter special characters common to all browsers
    var dig = "";
    var strst = ""; var strend = "";
    var strsub = "";
    for (i1 = 0; i1 < 500; i1++) {
        strst = "";
        strend = "";
        strsub = "";
        dig = "";
        dig = document.getElementById(val).value;
        for (i = 0; i < dig.length + 1; i++) {
            strsub = dig.substring(i, i + 1);
            if (parseFloat(strsub, 10) == (strsub * 1)) {
                strst = dig.substring(0, i);
                strend = dig.substring(i + 1, dig.length)
                dig = dig.substring(0, dig.length);
                document.getElementById(val).value = strst + strend;
            }
            else {

            }
        }
    }
}

function escap(val) {
    //Function not allowed any special characters
    //Common to Internet Explorer and Firebox
    var dig = "";
    var sBadChars = new Array("~",
										"`",
										"!",
										"@",
										"#",
										"$",
										"%",
										"^",
										"&",
										"*",
										"(",
										 ")",
										"-",
										"_",
										"=",
										"+",
										"|",
										"[",
										"]",
										"{",
										"}",
										"'",
										";",
										":",
										"/",
										"?",
										".",
										">",
										"<",
										","
										);
    dig = document.getElementById(val).value;
    for (iCount = 0; iCount < sBadChars.length; iCount++) {
        while (dig.indexOf(sBadChars[iCount]) != -1) {
            dig = dig.replace(sBadChars[iCount], "");

        }
    }
    document.getElementById(val).value = dig;
}


function datecheck(e) {
    var whichCode = (window.Event) ? e.which : e.keyCode;
    var strCheck = '0123456789./';

    if (whichCode == 13) return true;
    key = String.fromCharCode(whichCode);  // Get key value from key code
    if (strCheck.indexOf(key) == -1) return false;
}

function schdatecheck(mobj, m) {
    var m1 = m;
    if (mobj.value == "" && m1 == "N") {
        return true;
    }
    if (chkdate(mobj.value) == false) {
        alert("Please enter a valid date.");
        mobj.select();
        mobj.focus();
        return false;
    }
    mobj.value = chkdate(mobj.value);
    return true;
}

function chkdate(pdate) {
    var strDate = pdate;

    var strDateArray;
    var strDay;
    var strMonth;
    var strYear;
    var intday;
    var intMonth;
    var intYear;
    var booFound = false;
    var strSeparatorArray = new Array("-", " ", "/", ".");
    var intElementNr;
    var err = 0;

    if (strDate.length < 6)
    { return false; }

    for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
        if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
            strDateArray = strDate.split(strSeparatorArray[intElementNr]);
            if (strDateArray.length != 3) {
                err = 1;
                return false;
            }
            else {
                strDay = strDateArray[0];
                strMonth = strDateArray[1];
                strYear = strDateArray[2];
            }
            booFound = true;
        }
    }

    if (booFound == false) {
        if (strDate.length > 5) {
            strDay = strDate.substr(0, 2);
            strMonth = strDate.substr(2, 2);
            strYear = strDate.substr(4);
        }
    }

    if (strYear.length > 4) {
        err = 2;
        return false;
    }

    if (strYear.length == 2) {
        strYear = '19' + strYear;
    }

    intday = parseInt(strDay, 10);
    if (isNaN(intday)) {
        err = 2;
        return false;
    }

    intMonth = parseInt(strMonth, 10);
    if (isNaN(intMonth)) {
        for (i = 0; i < 12; i++) {
            if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
                intMonth = i + 1;
                strMonth = strMonthArray[i];
                i = 12;
            }
        }

        if (isNaN(intMonth)) {
            err = 3;
            return false;
        }
    }

    intYear = parseInt(strYear, 10);
    if (isNaN(intYear)) {
        err = 4;
        return false;
    }
    if (intMonth > 12 || intMonth < 1) {
        err = 5;
        return false;
    }
    if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
        err = 6;
        return false;
    }
    if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
        err = 7;
        return false;
    }
    if (intMonth == 2) {
        if (intday < 1) {
            err = 8;
            return false;
        }
        if (LeapYear(intYear) == true) {
            if (intday > 29) {
                err = 9;
                return false;
            }
        }
        else {
            if (intday > 28) {
                err = 10;
                return false;
            }
        }
    }

    var dt = new Date()
    if (strYear > dt.getYear()) {
        return false;
    }

    return (intday + "/" + intMonth + "/" + strYear);
}

function LeapYear(intYear) {
    if (intYear % 100 == 0) {
        if (intYear % 400 == 0)
        { return true; }
    }
    else {
        if ((intYear % 4) == 0)
        { return true; }
    }
    return false;
}


function AlertCount(id, length, msg, e) {
    var keyASCII = BrowserCheck(e);
    var keyValue = String.fromCharCode(keyASCII);

    if (document.getElementById(id).value.length > length) {
        if (msg != "") {
            alert(msg);

        }
        document.getElementById(id).value = document.getElementById(id).value.substring(0, length)
        return BrowserCorrection(e)
    }
}


function BrowserCheck(e) {
    var keyASCII;

    if (window.event) // IE
    {
        keyASCII = e.keyCode
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        keyASCII = e.which
    }
    return keyASCII;
}

function BrowserCorrection(e) {
    if (window.event) // IE
    {
        e.keyCode = 0;
        return false;
    }
    else if (e.which) // Netscape/Firefox/Opera
    {
        if (e.which != '8') {
            return false;
        }

    }
}

function CheckPresentDays(txtID1, txtID2) {
    if (parseFloat(document.getElementById(txtID1).value) < parseFloat(document.getElementById(txtID2).value)) {
        alert("Enter Correct Present Days");
        document.getElementById(txtID2).select();
        return false;
    }
}

function CheckLeaveDays(txtID1, txtID2) {
    if (parseFloat(document.getElementById(txtID1).innerText) < parseFloat(document.getElementById(txtID2).value)) {
        alert("Enter Correct Leave Days");
        document.getElementById(txtID2).select();
        return false;
    }

}

function CheckOutstanding(txtID1) {
    if (parseFloat(document.getElementById(txtID1).value) < 9) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
    else if (parseFloat(document.getElementById(txtID1).value) > 10) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
}

function CheckVeryGood(txtID1) {
    if (parseFloat(document.getElementById(txtID1).value) < 6) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
    else if (parseFloat(document.getElementById(txtID1).value) > 8) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
}

function CheckGood(txtID1) {
    if (parseFloat(document.getElementById(txtID1).value) < 4) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
    else if (parseFloat(document.getElementById(txtID1).value) > 5) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
}

function CheckUnsatisfactory(txtID1) {
    if (parseFloat(document.getElementById(txtID1).value) > 3.9) {
        alert("Enter Correct Marks");
        document.getElementById(txtID1).select();
        return false;
    }
}

function datevalid(ID) {
    var objectID = document.getElementById(ID);
    if (objectID.value == "") {
        return true;
    }
    if (datefunction(ID) == false) {
        alert("Please enter a valid date - Format[mm/dd/yyyy].");
        objectID.value = "";
        // objectID.focus();
        document.getElementById(ID).focus();
        return false;
    }
    else
        return true;
}

function datefunction(ID) {
    var objectID = document.getElementById(ID);
    var element_value = objectID.value;
    var element_lenth = element_value.length
    if (element_lenth != 10) {
        return false;
    }
    for (i = 0; i < 10; i++) {
        var date_char = element_value.charAt(i);
        if (i == 0 && (isNaN(date_char))) {
            return false;
        }
        if (i == 1 && (isNaN(date_char))) {
            return false;
        }
        if (i == 2 && date_char != '/') {
            return false;
        }
        if (i == 3 && (isNaN(date_char))) {
            return false;
        }
        if (i == 4 && (isNaN(date_char))) {
            return false;
        }
        if (i == 5 && date_char != '/') {
            return false;
        }
        if (i == 6 && (isNaN(date_char))) {
            return false;
        }
        if (i == 7 && (isNaN(date_char))) {
            return false;
        }
        if (i == '8' && (isNaN(date_char))) {
            return false;
        }
        if (i == '9' && (isNaN(date_char))) {
            return false;
        }

    }
    var date_arr = element_value.split('/');
    var dd = date_arr[0];
    var mm = date_arr[1];
    var yy = date_arr[2];
    if ((yy % 4) == 0) {
        if (mm == '02' && (dd > '29' || dd == '00')) {
            return false;
        }
    }
    else {
        if (mm == '02' && (dd > '28' || dd == '00')) {
            return false;
        }


    }
    if ((mm == '01' || mm == '03' || mm == '05' || mm == '07' || mm == '08' || mm == '10' || mm == '12') && (dd > '31' || dd == '00')) {

        return false;
    }
    else if ((mm == '04' || mm == '06' || mm == '09' || mm == '11') && (dd > '30' || dd == '00')) {
        return false;
    }
    if (dd > '31') {
        return false;
    }
    if (mm > '12') {
        return false;
    }
}

//Code change for Defect id:MH1 ---- START
function LoadPleaseWait() {
    var imageid = document.getElementById("ImageLoading");
    imageid.style.visibility = "visible";
}
function LoadPleaseWaitDis() {
    var imageid = document.getElementById("ImageLoading");
    imageid.style.visibility = "hidden";

}
//Code change for Defect id:MH1 ---- END
//Code change for Defect id:MH2 ---- START
function CheckAscii() {
    if (event.keyCode == 47) {
        event.keyCode = 0;
    }
}
//Code change for Defect id:MH2 ---- END

startday = new Date();
clockStart = startday.getTime();

function initStopwatch() {
    var myTime = new Date();
    var timeNow = myTime.getTime();
    var timeDiff = timeNow - clockStart;
    this.diffSecs = timeDiff / 1000;
    return (this.diffSecs);
}
function getSecs() {
    var mySecs = initStopwatch();
    var mySecs1 = "" + mySecs;
    mySecs1 = mySecs1.substring(0, mySecs1.indexOf(".")) + " secs.";
    document.forms[0].timespent.value = mySecs1;
    window.setTimeout('getSecs()', 1000);
}

function ValidateDate(txt) {
    var val = txt.value;
    if (txt.value != '' && txt.value != '__/__/____') {
        if (isDateNew(txt.value) == true) {
            return true;
        }
        else {
            txt.focus();
            return false;
        }
    }
    return true;
}
function ChangeCase(ID) {
    if (document.getElementById(ID).value != '') {
        document.getElementById(ID).value = document.getElementById(ID).value.toUpperCase();
    }
}
function ExportMessage() {
    alert('No record Exists to Export..!!');
}

function MaxCharInReport(CharControl, DisplayControl) {
    var str = document.getElementById(CharControl).value;

    if (str.length > 499) {
        alert('Maximum Limit Reached');
        document.getElementById(CharControl).value = document.getElementById(CharControl).value.substring(0, 499)
        return true;
    }


    if (str.length > 200) {
        str = str.substring(0, 200);
        document.getElementById(DisplayControl).innerHTML = str.toString();
    }
    else
        document.getElementById(DisplayControl).innerHTML = str.toString();

}

function MaxCharNew(CharControl, DisplayControl, length) {
    var str = document.getElementById(CharControl).value;

    if (str.length > length - 1) {
        alert('Maximum Limit Reached');
        document.getElementById(CharControl).value = document.getElementById(CharControl).value.substring(0, length - 1)
        return true;
    }


    if (str.length > 200) {
        str = str.substring(0, 200);
        document.getElementById(DisplayControl).innerHTML = str.toString();
    }
    else
        document.getElementById(DisplayControl).innerHTML = str.toString();

}

var isDirty;
isDirty = 0;

function setDirty() {
    document.getElementById('hdnDirty').value = "1";
    isDirty = 1;
    saved = false;
}
function setClearDirty() {
    if (document.getElementById('hdnDirty')) {

        document.getElementById('hdnDirty').value = "0";
        isDirty = 0;
        saved = true;
        var herf = window.location.href;
        if (herf.toLowerCase().indexOf('?popup') > -1) {
            return true;
        }
        if (worktabctrl && WorkTabIndex != undefined && WorkTabIndex != worktabctrl._activeTabIndex) {
            setTimeout("LoadSelectedTab()", 100);
            return
        }
        if (redireceUrl != '') {
            if (redireceUrl.indexOf('http') > -1) {
                if (window.location.href.toUpperCase().trim() != redireceUrl.toUpperCase().trim())
                    if (redireceUrl.indexOf('frmPlaintiff') > -1 || redireceUrl.indexOf('frmCaseDetails') > -1 || redireceUrl.indexOf('frmDefendant') > -1 || redireceUrl.indexOf('frmSVGForm') > -1)
                        window.location.href = redireceUrl;
                    else
                        window.location.href = redireceUrl;
            }
            else {
                var path = window.location.href.substring(0, window.location.href.indexOf('frm')) + redireceUrl;
                if (path != window.location.href)
                    if (window.location.href.toUpperCase().trim() != path.toUpperCase().trim())
                        if (path.indexOf('frmPlaintiff') > -1 || path.indexOf('frmCaseDetails') > -1 || path.indexOf('frmDefendant') > -1 || path.indexOf('frmSVGForm') > -1)
                            window.location.href = path.replace('CaseEvaluation', 'forms');
                        else
                            window.location.href = path.replace('forms', 'CaseEvaluation');
            }
            saved = false;
        }
    }
}

function LoadSelectedTab() {
    var ctrl = $find('TabContainer2');
    ctrl.set_activeTab(ctrl.get_tabs()[WorkTabIndex]);
    ctrl._loaded = true;
}

function checkSave() {
    var sSave;
    if (isDirty == 1) {
        sSave = window.confirm("There are some changes that have not been saved. Click OK to save now or CANCEL to continue without saving.");
        if (sSave == true) {
            var val = setTimeout("document.getElementById('btnSave').click();return true;", 10);
            if (val)
                return true;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function checkTabFormSave(btnSave) {
    var sSave;
    // checkClose()
    //    if (isDirty == 1 && document.getElementById('hdnDirty').value == "1") {
    //        sSave = window.confirm("There are some changes that have not been saved. Click OK to save now or CANCEL to continue without saving.");
    //        if (sSave == true) {
    //            document.getElementById(btnSave).click();

    //        }
    //        else {
    //            return true;
    //        }
    //    }
}

function validateDecimal(ctrlID)//fun 1
{
    var varValue = document.getElementById(ctrlID).value;
    if (varValue.split('.').length > 2) {
        alert("Enter valid numeric data");
        document.getElementById(ctrlID).style.backgroundColor = "#ffff99";
        document.getElementById(ctrlID).focus();
        return false;
    }
    if (varValue != '') {
        if (!IsDecimalWithChar(varValue)) {
            alert("Enter numeric data");
            document.getElementById(ctrlID).value = "";
            document.getElementById(ctrlID).focus();
            document.getElementById(ctrlID).style.backgroundColor = "#ffff99";
            return false;
        }
        else if (varValue == 0.00) {
            document.getElementById(ctrlID).value = '';
            document.getElementById(ctrlID).style.backgroundColor = "#ffffff";
            return false;
        }
    }
    document.getElementById(ctrlID).style.backgroundColor = "#ffffff";
    return true;
}



function getDateObject(dateString, dateSeperator) {
    //This function return a date object after accepting 
    //a date string ans dateseparator as arguments
    var curValue = dateString;
    var sepChar = dateSeperator;
    var curPos = 0;
    var cDate, cMonth, cYear;

    //extract day portion
    curPos = dateString.indexOf(sepChar);
    cDate = dateString.substring(0, curPos);

    //extract month portion				
    endPos = dateString.indexOf(sepChar, curPos + 1);
    cMonth = dateString.substring(curPos + 1, endPos);

    //extract year portion				
    curPos = endPos;
    endPos = curPos + 5;
    cYear = curValue.substring(curPos + 1, endPos);

    //Create Date Object
    dtObject = new Date(cYear, cMonth, cDate);
    return dtObject;
}

//This function to Avoid the future date and current date enrty

function CheckFutureAndCurrentDate(EnrtyDate, CurrentDate) {
    checkdate(EnrtyDate);
    var varValueEnrtyDate = document.getElementById(EnrtyDate).value;
    var strEntryDate = new Date(varValueEnrtyDate);

    var varValue = CurrentDate.value;
    var strCurrentDate = new Date(varValue);
    if (strEntryDate >= strCurrentDate) {
        alert('Date should not be Equal or Greater than Current Date!')
        document.getElementById(EnrtyDate).value = '';
        document.getElementById(EnrtyDate).style.backgroundColor = "#ffff99";
        document.getElementById(EnrtyDate).focus();
        return false;
    }
}

//This function to Avoid the future date entry

function CheckFutureDate(EnrtyDate, CurrentDate) {

    checkdate(EnrtyDate);
    var varValueEnrtyDate = document.getElementById(EnrtyDate).value;
    if (varValueEnrtyDate != '') {
        var strEntryDate = new Date(varValueEnrtyDate);

        var varValue = CurrentDate.value;
        var strCurrentDate = new Date(varValue);

        if (strEntryDate > strCurrentDate) {
            alert('Date should not be Future Date!')
            document.getElementById(EnrtyDate).value = '';
            document.getElementById(EnrtyDate).style.backgroundColor = "#ffff99";
            document.getElementById(EnrtyDate).focus();
        }

        else {
            document.getElementById(EnrtyDate).style.backgroundColor = "#ffffff";
            return true;
        }
    }
}

function ValidateIsDate(txt) {


    var val = txt.value;
    if (txt.value != '' && txt.value != '__/__/____') {
        if (val.length == 10) {
            var splits = val.split("/");
            var dt = new Date(splits[0] + "/" + splits[1] + "/" + splits[2]);

            if (splits.length != 3) {
                txt.value = "";
                alert("Invalid Date!");
                txt.focus();
                return false;
            }

            //Validation for Dates
            if (dt.getDate() != splits[1]) {
                txt.value = "";
                alert("Invalid Date!");
                txt.focus();
                return false;
            }
            else if (dt.getMonth() + 1 != splits[0]) {
                txt.value = "";
                alert("Invalid Date!");
                txt.focus();
                return false;
            }
            else if (dt.getFullYear() != splits[2]) {
                txt.value = "";
                alert("Invalid Date!");
                txt.focus();
                return false;
            }
            else {
                return true;
            }

        }
        else {
            txt.value = '';
            alert('Invalid Date!');
        }
    }
}


function isValidDate(dateStr) {
    var format = "MDY";
    if (format == null) { format = "MDY"; }
    format = format.toUpperCase();
    if (format.length != 3) { format = "MDY"; }
    if ((format.indexOf("M") == -1) || (format.indexOf("D") == -1) || (format.indexOf("Y") == -1)) { format = "MDY"; }
    if (format.substring(0, 1) == "Y") { // If the year is first
        var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
        var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
    } else if (format.substring(1, 2) == "Y") { // If the year is second
        var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/
        var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/
    } else { // The year must be third
        var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/
        var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
    }
    // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
    if ((reg1.test(dateStr) == false) && (reg2.test(dateStr) == false)) { return false; }
    var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
    // Check to see if the 3 parts end up making a valid date
    if (format.substring(0, 1) == "M") { var mm = parts[0]; } else
        if (format.substring(1, 2) == "M") { var mm = parts[1]; } else { var mm = parts[2]; }
    if (format.substring(0, 1) == "D") { var dd = parts[0]; } else
        if (format.substring(1, 2) == "D") { var dd = parts[1]; } else { var dd = parts[2]; }
    if (format.substring(0, 1) == "Y") { var yy = parts[0]; } else
        if (format.substring(1, 2) == "Y") { var yy = parts[1]; } else { var yy = parts[2]; }
    if (parseFloat(yy) <= 50) { yy = (parseFloat(yy) + 2000).toString(); }
    if (parseFloat(yy) <= 99) { yy = (parseFloat(yy) + 1900).toString(); }
    var dt = new Date(parseFloat(yy), parseFloat(mm) - 1, parseFloat(dd), 0, 0, 0, 0);
    if (parseFloat(dd) != dt.getDate()) { return false; }
    if (parseFloat(mm) - 1 != dt.getMonth()) { return false; }
    return true;
}

function checkdate(id) {
    var val = document.getElementById(id).value;
    if (document.getElementById(id).value != '' && document.getElementById(id).value != '__/__/____') {
        if (!isValidDate(val)) {
            alert('Enter valid date');
            document.getElementById(id).value = '';
            document.getElementById(id).style.backgroundColor = "#ffff99";
            document.getElementById(id).focus();
            return false;
        }
        else {
            document.getElementById(id).style.backgroundColor = "#ffffff";
        }

    }

}
//-------------check given  string is Number
function IsNumber(strString)
    //  check for valid numeric strings	
{
    var strValidChars = "0123456789";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    //  test strString consists of valid characters listed above
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

//-------------check given  string is Number
function IsDecimalWithChar(strString)
    //  check for valid numeric strings	
{
    var strValidChars = "0123456789.-%";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return false;

    //  test strString consists of valid characters listed above
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}

function ValidDatePicker(id) {
    if (document.getElementById(id).value != "") {
        var strDate = document.getElementById(id).value;
        var strLength = strDate.split('/').length;
        var arrDate = strDate.split('/');
        var strDateUpend;
        if (strLength == 2 || strLength == 3) {
            if (strLength == 2) {
                if (arrDate[1].length == 4) {
                    strDateUpend = arrDate[0] + "/01/" + arrDate[1];
                    if (!isValidDate(strDateUpend)) {
                        alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                        document.getElementById(id).style.backgroundColor = "#ffff99";
                        document.getElementById(id).focus();
                        return false;
                    }
                }
                else {
                    alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                    document.getElementById(id).style.backgroundColor = "#ffff99";
                    document.getElementById(id).focus();
                    return false;
                }
            }
            else {
                if (arrDate[2].length == 4) {
                    strDateUpend = strDate;
                    if (!isValidDate(strDateUpend)) {
                        alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                        document.getElementById(id).style.backgroundColor = "#ffff99";
                        document.getElementById(id).focus();
                        return false;
                    }
                }
                else {
                    alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
                    document.getElementById(id).style.backgroundColor = "#ffff99";
                    document.getElementById(id).focus();
                    return false;
                }
            }
        }
        else {
            alert("Enter valid date (MM/YYYY, MM/DD/YYYY)");
            document.getElementById(id).style.backgroundColor = "#ffff99";
            document.getElementById(id).focus();
            return false;
        }
    }
    document.getElementById(id).style.backgroundColor = "#ffffff";
    return true;
}

function validate_Numeric_Amount(txt1) {
    var txttext = txt1.value;
    if (txttext.split('.').length > 2) {
        var val = txt1.id;
        setTimeout("document.getElementById('" + val + "').focus()", 50);
        alert('Please provide valid information...!!');
        return false;
    }
    if (txttext.split('.')[1] == '') {
        var val = txt1.id;
        setTimeout("document.getElementById('" + val + "').focus()", 50);
        alert('Please provide valid information...!');
        return false;
    }
}


function CheckValidDate(id) {
    if (document.getElementById(id).value != "") {
        var strDate = document.getElementById(id).value;
        var strLength = strDate.split('/').length;
        var arrDate = strDate.split('/');
        var strDateUpend;
        if (strLength == 3) {
            strDateUpend = strDate;
            if (!isValidDate(strDateUpend)) {
                alert("Enter valid date (MM/DD/YYYY)");
                document.getElementById(id).style.backgroundColor = "#ffff99";
                document.getElementById(id).focus();
                return false;
            }
        }
        else {
            alert("Enter valid date (MM/DD/YYYY)");
            document.getElementById(id).style.backgroundColor = "#ffff99";
            document.getElementById(id).focus();
            return false;
        }
    }
    document.getElementById(id).style.backgroundColor = "#ffffff";
    return true;
}

function validateDate(dtControl) {
    var val = document.getElementById(dtControl).value;
    if (val == "__/__/____") {
        return true;
    }

    if (val.length == 0) {
        return true;
    }

    if (val.length == 10) {
        var splits = val.split("/");
        var dt = new Date(splits[0] + "/" + splits[1] + "/" + splits[2]);

        //Validation for Dates
        if (dt.getDate() == splits[1] && dt.getMonth() + 1 == splits[0] && dt.getFullYear() == splits[2]) {
            return true;
        }
        else {
            document.getElementById(dtControl).value = '';
            document.getElementById(dtControl).focus();
            alert('Invalid Day, Month, or Year range detected. Please correct.')
            return false;
        }
    }
}

function PrimarySecondary(id) {
    var chkSecondary = id.replace('chkPrimary', 'chkSecondary');
    var ChkPrimary = id.replace('chkSecondary', 'chkPrimary');
    if (document.getElementById(ChkPrimary).checked == true && document.getElementById(chkSecondary).checked == true) {
        if (document.getElementById(id).id.indexOf('chkPrimary') > 0) {
            document.getElementById(ChkPrimary).checked = false;
        }
        else {
            document.getElementById(chkSecondary).checked = false;
        }
        alert("Select any one Primary or Secondary...!!");
    }
}

var base64 = {};
base64.PADCHAR = '=';
base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
title = 'STEALTH'
base64.makeDOMException = function () {
    // sadly in FF,Safari,Chrome you can't make a DOMException
    var e, tmp;

    try {
        return new DOMException(DOMException.INVALID_CHARACTER_ERR);
    } catch (tmp) {

        var ex = new Error("DOM Exception 5");

        // ex.number and ex.description is IE-specific.
        ex.code = ex.number = 5;
        ex.name = ex.description = "INVALID_CHARACTER_ERR";

        // Safari/Chrome output format
        ex.toString = function () { return 'Error: ' + ex.name + ': ' + ex.message; };
        return ex;
    }
}

base64.getbyte64 = function (s, i) {
    // This is oddly fast, except on Chrome/V8.
    //  Minimal or no improvement in performance by using a
    //   object with properties mapping chars to value (eg. 'A': 0)
    var idx = base64.ALPHA.indexOf(s.charAt(i));
    if (idx === -1) {
        throw base64.makeDOMException();
    }
    return idx;
}

base64.decode = function (s) {
    // convert to string  

    var getbyte64 = base64.getbyte64;
    var pads, i, b10;
    var imax = s.length
    if (imax === 0) {
        return s;
    }

    if (imax % 4 !== 0) {
        throw base64.makeDOMException();
    }

    pads = 0
    if (s.charAt(imax - 1) === base64.PADCHAR) {
        pads = 1;
        if (s.charAt(imax - 2) === base64.PADCHAR) {
            pads = 2;
        }
        // either way, we want to ignore this last block
        imax -= 4;
    }

    var x = [];
    for (i = 0; i < imax; i += 4) {
        b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) |
            (getbyte64(s, i + 2) << 6) | getbyte64(s, i + 3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }

    switch (pads) {
        case 1:
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) | (getbyte64(s, i + 2) << 6);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
            break;
        case 2:
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12);
            x.push(String.fromCharCode(b10 >> 16));
            break;
    }
    return x.join('').replace(title, '').replace(title, '');
}

base64.getbyte = function (s, i) {
    var x = s.charCodeAt(i);
    if (x > 255) {
        throw base64.makeDOMException();
    }
    return x;
}

base64.encode = function (s) {
    if (arguments.length !== 1) {
        throw new SyntaxError("Not enough arguments");
    }
    s = title + s + title;
    var padchar = base64.PADCHAR;
    var alpha = base64.ALPHA;
    var getbyte = base64.getbyte;

    var i, b10;
    var x = [];

    // convert to string
    s = '' + s;

    var imax = s.length - s.length % 3;

    if (s.length === 0) {
        return s;
    }
    for (i = 0; i < imax; i += 3) {
        b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
        x.push(alpha.charAt(b10 >> 18));
        x.push(alpha.charAt((b10 >> 12) & 0x3F));
        x.push(alpha.charAt((b10 >> 6) & 0x3f));
        x.push(alpha.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
        case 1:
            b10 = getbyte(s, i) << 16;
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
               padchar + padchar);
            break;
        case 2:
            b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
               alpha.charAt((b10 >> 6) & 0x3f) + padchar);
            break;
    }
    return x.join('');
}