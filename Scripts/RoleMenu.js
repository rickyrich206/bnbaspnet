$(document).ready(function () {
    CheckSesion(CurrentBannerRole.WebPath);
    var bootstrapButton = $.fn.button.noConflict();
    $.fn.bootstrapBtn = bootstrapButton;
    if (CurrentLoggedUser.UserId == null || CurrentLoggedUser.UserId == undefined || CurrentLoggedUser.UserId == "") {
        LoginCalldialog("Your session expired. Sorry for inconvenience.");
        return;
    }
    else {

        for (var i = 0; i < 3; i++) {
            var dat = "";
            //if (i == 0) {
            //    dat = "D"
            //}
            if (i == 0) {
                dat = "A"
            }
            else if (i == 1) {
                dat = "B"
            }
            else if (i == 2) {
                dat = "C"
            }
            $.ajax({
                type: "POST",
                dataType: 'Json',
                contentType: "application/json; charset=utf-8",
                url: CurrentBannerRole.WebPath + "PMS_Master.asmx/RoleMenuRetrieve",
                data: JSON.stringify({
                    intRoleId: CurrentLoggedUser.RoleId, strMenuCode: dat
                }),
                success: function (data) {
                    var obj = JSON.parse(data.d);
                    if (obj.length > 0) {
                        buildMenu($('#menu' + obj[0].MenuCode), obj, 0);
                        // $('#menu' + obj[0].MenuCode).menu();
                    }
                    else {
                        $('#menu' + dat).css("display", "none");
                    }
                }
                ,
                error: function (msg) {
                    Calldialog("Error in Menu load!");
                    HideLoader();
                }
            });
        }

        function buildMenu(parent, items, id, l, val) {
            $.each(items, function (a, b) {
                if (id == 0) {
                    //var obj = JSON.parse(b);
                    var obj = b;

                    //for (var i = 0; i < obj.length; i++) {

                    if (obj.lstMenu && obj.lstMenu.length > 0) {
                        var li = $('<li class="dropdown" ><a  class="dropdown-item waves-effect waves-light" data-toggle="dropdown"  id="' + b.MenuId + '" runat="server" href="' + obj.MenuLink + '">' + obj.MenuName + '<span class="caret"></span></a></li>');
                    }
                    else {
                        var li = $('<li><a id="' + b.MenuId + '" runat="server" href="' + obj.MenuLink + '">' + obj.MenuName + '<span class="caret"></span></a></li>');
                    }
                    li.appendTo(parent);
                    if (obj.lstMenu && obj.lstMenu.length > 0) {
                        var ul = $('<ul class="dropdown-menu"></ul>');
                        ul.appendTo(li);
                        buildMenu(ul, obj.lstMenu, 1, 0);
                    }
                    //}
                }
                else {
                    //var li = $('<li ><a  tabindex="-1" id="' + b.MenuId + '" runat="server" href="' + b.MenuLink + '">' + b.MenuName + '</a></li>');
                    if (b.lstMenu && b.lstMenu.length > 0) {
                        var li = $('<li class="dropdown-submenu" ><a  class="dropdown-item waves-effect waves-light" data-toggle="dropdown"  id="' + b.MenuId + '" runat="server" href="' + b.MenuLink + '">' + b.MenuName + '<span class="caret"></span></a></li>');
                    }
                    else {
                        var li = $('<li><a tabindex="-1" id="' + b.MenuId + '" runat="server" href="' + b.MenuLink + '">' + b.MenuName + '</a></li>');
                    }
                    li.appendTo(parent);
                    if (b.lstMenu && b.lstMenu.length > 0) {
                        var ul = $('<ul class="dropdown-menu"></ul>');
                        ul.appendTo(li);
                        buildMenu(ul, b.lstMenu, 1, 0);
                    }
                }
            });
        }
    }
});