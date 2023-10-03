using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.Services;
using System.IO;
using PMSCLS.Model;
using System.Reflection;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Text;
using System.Configuration;
using PMSCLS;

namespace PMS.Dashboard
{
    public partial class frmDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string strDay = "";
            string strMonth = "";
            string strYear = "";
            if (!Page.IsPostBack)
            {
                strDay = System.DateTime.Now.Day.ToString();
                strMonth = System.DateTime.Now.Month.ToString();
                strYear = System.DateTime.Now.Year.ToString();
                if (strDay.Length == 1)
                    strDay = "0" + strDay;
                if (strMonth.Length == 1)
                    strMonth = "0" + strMonth;
                lblDate.Text = strDay + "/" + strMonth + "/" + strYear;
                Stockload();                
            }
        }

        public void Stockload()
        {
            DataTable dtCommon = new DataTable();
            try
            {
                SessionL cookieVal = new ILogin().GetCookieVal();
                if (cookieVal.UserId == null || !(cookieVal.UserId != string.Empty))
                    return;
                dtCommon = new Stockdb().StockRetrieve(2, Convert.ToInt32(cookieVal.UserId.ToString()));
                if (dtCommon.Rows.Count > 0)
                {
                    repStock.DataSource = dtCommon;
                    repStock.DataBind();
                }
            }
            catch (Exception ex)
            {

            }
        }
        [WebMethod]
        public static List<object> StockRetrieve(int intId, int intUserId)
        {
            List<object> iData = new List<object>();
            List<string> labels = new List<string>();
            DataTable dtLabels = new PMSCLS.Stockdb().StockRetrieve(intId, intUserId);
            foreach (DataRow drow in dtLabels.Rows)
            {
                labels.Add(drow["breed"].ToString());
            }
            iData.Add(labels);

            List<int> lst_dataItem_1 = new List<int>();
            foreach (DataRow dr in dtLabels.Rows)
            {
                lst_dataItem_1.Add(Convert.ToInt32(dr["male"].ToString()));
            }
            iData.Add(lst_dataItem_1);

            List<int> lst_dataItem_2 = new List<int>();
            foreach (DataRow dr in dtLabels.Rows)
            {
                lst_dataItem_2.Add(Convert.ToInt32(dr["female"].ToString()));
            }
            iData.Add(lst_dataItem_2);

            return iData;
        }

        [WebMethod]
        public List<PigList> PigListRetrieve(int intUserId)
        {
            List<PigList> objInvoiceResult = new PMSCLS.IPigList().PigListRetrieve(intUserId);
            return objInvoiceResult;
        }

        [WebMethod]
        public static string ExportToExcel(List<PigList> list)
        {
            try
            {
                if (list.Count() == 0)
                    return null;

                DataTable dt = ToDataTable<PigList>(list);

                string neatName = "Animallist";
                string strFileName = neatName + DateTime.Now.ToString() + ".xls";

                // Fix the file name, replace any illegal character with an underscore (_).
                for (int i = 0; i < strFileName.Length; i++)
                    if (Path.GetInvalidFileNameChars().Contains(Convert.ToChar(strFileName.Substring(i, 1))))
                        strFileName = strFileName.Replace(strFileName.Substring(i, 1), "_");

                ExportExcel.DataTable_To_Excel(strFileName, dt, neatName, neatName, "Id,USERID,DOB");

                return strFileName;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        [WebMethod]
        public static string GeneticsExcel()
        {
            DataTable dt = new PMSCLS.PigListdb().GeneticsReport();
            try
            {

                string neatName = "Genetics Report";
                string strFileName = neatName + DateTime.Now.ToString() + ".xls";

                // Fix the file name, replace any illegal character with an underscore (_).
                for (int i = 0; i < strFileName.Length; i++)
                    if (Path.GetInvalidFileNameChars().Contains(Convert.ToChar(strFileName.Substring(i, 1))))
                        strFileName = strFileName.Replace(strFileName.Substring(i, 1), "_");

                ExportExcel.DataTable_To_Excel(strFileName, dt, neatName, neatName, "id");

                return strFileName;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [WebMethod]
        public static string GeneticsDBF()
        {
            string strFilePath = ConfigurationManager.AppSettings["Excel_path"].ToString() + "PMS.dbf";
            if (File.Exists(strFilePath))
            {
                File.Delete(strFilePath);
            }

            DataTable table = new PMSCLS.PigListdb().GeneticsReport();


            Spire.DataExport.DBF.DBFExport DBFExport = new Spire.DataExport.DBF.DBFExport();
            DBFExport.DataSource = Spire.DataExport.Common.ExportSource.DataTable;
            DBFExport.DataTable = table;
            DBFExport.ActionAfterExport = Spire.DataExport.Common.ActionType.OpenView;
            DBFExport.FileName = strFilePath;
            DBFExport.SaveToFile();
            return "PMS.dbf";
        }
        [WebMethod]
        public static string GeneticsMDB()
        {
            string strFilePath = ConfigurationManager.AppSettings["Excel_path"].ToString() + "PMS.mdb";
            return "PMS.mdb";
        }

        public void test()
        {
            try
            {
                string strFilePath = ConfigurationManager.AppSettings["Excel_path"].ToString() + "PMS.mdb";

                DataTable table = new PMSCLS.PigListdb().GeneticsReport();
                
                //Using JET.OLEDB :
                System.Data.OleDb.OleDbConnection AccessConn = new System.Data.OleDb.OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + strFilePath);                

                AccessConn.Open();
                try
                {
                    System.Data.OleDb.OleDbCommand AccessCommand1 = new System.Data.OleDb.OleDbCommand("drop table tbl_Genetics;", AccessConn);
                    AccessCommand1.ExecuteNonQuery();
                }
                catch
                {

                }

                //New table, using SELECT INTO
                //System.Data.OleDb.OleDbCommand AccessCommand = new System.Data.OleDb.OleDbCommand("SELECT * INTO tbl_Genetics FROM [tbl_Genetics] IN '' [ODBC;Driver={SQL Server};Server=14.139.120.122;Database=PMS;Trusted_Connection=yes;Uid=sa;Pwd=bab@1234];", AccessConn);
                System.Data.OleDb.OleDbCommand AccessCommand = new System.Data.OleDb.OleDbCommand("SELECT * INTO tbl_Genetics FROM [tbl_Genetics] IN '' [ODBC;Driver={SQL Server};Server=192-168-1-18\\SQL2012;Database=PMS;Trusted_Connection=yes]", AccessConn);

                AccessCommand.ExecuteNonQuery();
                AccessConn.Close();                
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}