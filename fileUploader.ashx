<%@ WebHandler Language="C#" Class="fileUploader" %>

using System;
using System.Web;
using System.Web.SessionState;
using PMSCLS.Model;

public class fileUploader : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
        SessionL ssl = new PMSCLS.ILogin().GetCookieVal();
        if (ssl.UserName.ToString() != "" || ssl.UserName != null)
        {
            System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
            if (context.Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollection flCollection = context.Request.Files;
                    for (int intLoop = 0; intLoop < flCollection.Count; intLoop++)
                    {
                        HttpPostedFile file = flCollection[intLoop];
                        string strFlPath = string.Empty;

                        strFlPath = context.Server.MapPath("~/" + file.FileName);
                        string strFileFolderPath = strFlPath;
                        string str = System.IO.Path.GetFileName(strFlPath);
                        strFileFolderPath = strFileFolderPath.Replace(str, "");
                        if (!System.IO.Directory.Exists(strFileFolderPath))
                        {

                            System.IO.Directory.CreateDirectory(strFileFolderPath);
                        }
                        file.SaveAs(strFlPath);
                    }
                    context.Response.ContentType = "text/json";
                    context.Response.Write(jss.Serialize("Success"));
                }
                catch (Exception ex)
                {
                    context.Response.ContentType = "text/json";
                    context.Response.Write(jss.Serialize("Error"));
                }
            }
        }
        else
        {
            context.Response.Redirect("../frmLogin.aspx");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}