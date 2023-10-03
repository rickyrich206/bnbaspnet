using PMSCLS;
using PMSCLS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PMS.UserControl
{
    public partial class Banner : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SessionL cookieVal = new ILogin().GetCookieVal();
            if (cookieVal.UserId != null && !(cookieVal.UserId == "-1"))
                return;
            ScriptManager.RegisterStartupScript((Control)this, this.GetType(), "A", "<script>LoginCalldialog('Your Session has expired');</script>", false);
        }
    }
}