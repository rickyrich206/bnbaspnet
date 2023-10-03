using PMSCLS;
using PMSCLS.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Services;

namespace PMSWEB
{
    /// <summary>
    /// Summary description for PMS_Common
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PMS_Common : System.Web.Services.WebService
    {

        public PMS_Common()
        {

            //Uncomment the following line if using designed components 
            //InitializeComponent(); 
        }

        [WebMethod]
        public int SendEmail(string strUserId, string strUserName, string strToEmailId)
        {
            SmtpClient smtpClient = new SmtpClient();
            MailMessage message = new MailMessage();
            int intResult = 0;
            string strSubject = string.Empty;
            string strBody = string.Empty;
            string strEncrypt = string.Empty;
            try
            {
                strEncrypt = new PMSCLS.Common().Encrypt(strUserId);
                smtpClient.Host = ConfigurationManager.AppSettings["SMTPServer"].ToString();
                smtpClient.Port = Convert.ToInt32(ConfigurationManager.AppSettings["SMTPPort"]);
                smtpClient.EnableSsl = false;
                message.From = new MailAddress(ConfigurationManager.AppSettings["From"].ToString());
                message.To.Add(new MailAddress(strToEmailId));
                message.Subject = "Forgotten Password - Piggery Management Software";
                message.IsBodyHtml = true;
                message.Body = "<html>  <Body>    <table border='0' align='left' cellpadding='1' cellspacing='0'>      <tr>        <td class='body-text'>Hi " + strUserName + ",</td>      </tr>      <tr>        <td class='body-text'>&nbsp;</td>      </tr>      <tr>        <td class='body-text'>You recently requested a new password to sign in to your Piggery Management Software. To choose as new password, click on the link below: </td>      </tr>      <tr>        <td class='body-text'>&nbsp;</td>      </tr>      <tr>        <td class='body-text'>          <a href='" + ConfigurationManager.AppSettings["Site"].ToString() + "/frmResetPassword.aspx?Id=" + strEncrypt + "'>" + ConfigurationManager.AppSettings["Site"].ToString() + "/frmResetPassword.aspx?Id=" + strEncrypt + "</a>        </td>      </tr>      <tr>        <td class='body-text'>&nbsp;</td>      </tr>      <tr>        <td class='body-text'>Regards,</td>      </tr>      <tr>        <td class='body-text'>Admin</td>      </tr>      <tr>        <td class='body-text'>Piggery Unit</td>      </tr>    </table>  </Body></html>";
                smtpClient.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["FromEmail"].ToString(), ConfigurationManager.AppSettings["EmailPassword"].ToString());
                smtpClient.Send(message);
                intResult = 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return intResult;
        }
        //Auto complete
        //Tagno
        [WebMethod]
        public string[] TagnoAuto(string strStatusId, int intSex, int intId, string strCondition, string strValue, int intUserId)
        {
            return new PMSCLS.IAutoComplete().TagnoAuto(strStatusId, intSex, intId, strCondition, strValue, intUserId);
        }
        //Scheme
        [WebMethod]
        public string[] SchemeAuto(int intUserId, string strValue)
        {
            return new PMSCLS.IAutoComplete().SchemeAuto(intUserId, strValue);
        }
        //Breed
        [WebMethod]
        public string[] BreedAuto(int intUserId, int intSchemeId, string strValue)
        {
            return new PMSCLS.IAutoComplete().BreedAuto(intUserId, intSchemeId, strValue);
        }
        //Shed
        [WebMethod]
        public string[] ShedAuto(string strValue)
        {
            return new PMSCLS.IAutoComplete().ShedAuto(strValue);
        }
        //Pen
        [WebMethod]
        public string[] PenAuto(int intShedId, string strValue)
        {
            return new PMSCLS.IAutoComplete().PenAuto(intShedId, strValue);
        }

        //Meta data
        //Status
        [WebMethod]
        public List<MetaData> StatusRetrieve()
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().StatusRetrieve();
            return objInvoiceResult;
        }
        //Mating Status
        [WebMethod]
        public List<MetaData> MatingStatusRetrieve()
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().MatingStatusRetrieve();
            return objInvoiceResult;
        }

        //Tagno check
        [WebMethod]
        public string TagnoCheck(string strTagno)
        {
            return new PMSCLS.IAutoComplete().TagnoCheck(strTagno);
        }

        [WebMethod]
        public void PigDetailUpdate()
        {
            new PMSCLS.AutoCompletedb().PigDetailUpdate();
        }
        //Weight(No of days)
        [WebMethod]
        public List<MetaData> WeightRetrieve()
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().WeightRetrieve();
            return objInvoiceResult;
        }
        //Stage
        [WebMethod]
        public List<MetaData> StageRetrieve(int intId)
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().StageRetrieve(intId);
            return objInvoiceResult;
        }
        //Pig list
        [WebMethod]
        public List<PigList> PigListRetrieve(PigList pl)
        {
            List<PigList> objInvoiceResult = new PMSCLS.IPigList().PigListRetrieve(pl.UserId);
            return objInvoiceResult;
        }
        //Condition
        [WebMethod]
        public List<MetaData> ConditionRetrieve()
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().ConditionRetrieve();
            return objInvoiceResult;
        }
        //Group Based Status Retrieve
        [WebMethod]
        public List<MetaData> GroupBasedStatusRetrieve(int intId, int intGroupId)
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().GroupBasedStatusRetrieve(intId, intGroupId);
            return objInvoiceResult;
        }

        //Stage
        [WebMethod]
        public string[] StageAuto(int intId, string strValue)
        {
            return new PMSCLS.IAutoComplete().StageAuto(intId, strValue);
        }

        //Weight
        [WebMethod]
        public string[] WeightAuto(int intId, int intWeightId, string strValue)
        {
            return new PMSCLS.IAutoComplete().WeightAuto(intId, intWeightId, strValue);
        }

        //Mobileno
        [WebMethod]
        public string[] SellingMobileAuto(string strValue)
        {
            return new PMSCLS.IAutoComplete().SellingMobileAuto(strValue);
        }
        //Quarterly
        [WebMethod]
        public List<MetaData> QuarterlyRetrieve()
        {
            List<MetaData> objInvoiceResult = new PMSCLS.IMetaData().QuarterlyRetrieve();
            return objInvoiceResult;
        }

        //Damno Based Tagno check
        [WebMethod]
        public string DamnoBasedTagnoCheck(string strTagno, string strDamno)
        {
            return new IAutoComplete().DamnoBasedTagnoCheck(strTagno, strDamno);
        }
        [WebMethod]
        public SessionL GetCookieVal()
        {
            return new ILogin().GetCookieVal();
        }

        [WebMethod]
        public int ClearCookiVal()
        {
            return new ILogin().ClearCookiVal();
        }
    }
}
