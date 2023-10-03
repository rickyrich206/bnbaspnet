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

namespace PMS.Html
{
    public partial class frmReminder : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string ExportVaccination(List<VaccinationReminder> list)
        {
            try
            {
                if (list.Count() == 0)
                    return null;

                DataTable dt = ToDataTable<VaccinationReminder>(list);

                string neatName = "Vaccination Reminder";
                string strFileName = neatName + DateTime.Now.ToString() + ".xls";

                // Fix the file name, replace any illegal character with an underscore (_).
                for (int i = 0; i < strFileName.Length; i++)
                    if (Path.GetInvalidFileNameChars().Contains(Convert.ToChar(strFileName.Substring(i, 1))))
                        strFileName = strFileName.Replace(strFileName.Substring(i, 1), "_");

                ExportExcel.DataTable_To_Excel(strFileName, dt, neatName, neatName, "");

                return strFileName;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [WebMethod]
        public static string ExportWeight(List<WeightReminder> list)
        {
            try
            {
                if (list.Count() == 0)
                    return null;

                DataTable dt = ToDataTable<WeightReminder>(list);

                string neatName = "Body Weight Reminder";
                string strFileName = neatName + DateTime.Now.ToString() + ".xls";

                // Fix the file name, replace any illegal character with an underscore (_).
                for (int i = 0; i < strFileName.Length; i++)
                    if (Path.GetInvalidFileNameChars().Contains(Convert.ToChar(strFileName.Substring(i, 1))))
                        strFileName = strFileName.Replace(strFileName.Substring(i, 1), "_");

                ExportExcel.DataTable_To_Excel(strFileName, dt, neatName, neatName, "");

                return strFileName;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [WebMethod]
        public static string ExportWeaning(List<WeaningReminder> list)
        {
            try
            {
                if (list.Count() == 0)
                    return null;

                DataTable dt = ToDataTable<WeaningReminder>(list);

                string neatName = "Weaning Reminder";
                string strFileName = neatName + DateTime.Now.ToString() + ".xls";

                // Fix the file name, replace any illegal character with an underscore (_).
                for (int i = 0; i < strFileName.Length; i++)
                    if (Path.GetInvalidFileNameChars().Contains(Convert.ToChar(strFileName.Substring(i, 1))))
                        strFileName = strFileName.Replace(strFileName.Substring(i, 1), "_");

                ExportExcel.DataTable_To_Excel(strFileName, dt, neatName, neatName, "");

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
    }
}