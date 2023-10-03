using PMSCLS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace PMSWEB
{
    /// <summary>
    /// Summary description for PMS_Reports
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PMS_Reports : System.Web.Services.WebService
    {

        public PMS_Reports()
        {

            //Uncomment the following line if using designed components 
            //InitializeComponent(); 
        }

        //Stock Report
        [WebMethod]
        public List<StockReport> StockReportRetrieve(StockReport sr)
        {
            return new PMSCLS.IStockReport().StockReportRetrieve(sr.SchemeId, sr.BreedId, sr.StockMonth, sr.StockYear, sr.ReportType);
        }

        //Feed Report
        [WebMethod]
        public List<FeedReport> FeedReportRetrieve(FeedReport fr)
        {
            return new PMSCLS.IFeedReport().FeedReportRetrieve(fr.SchemeId, fr.FeedMonth, fr.FeedYear, fr.ReportType);
        }

        //Purchase Report
        [WebMethod]
        public List<PurchaseReport> PurchaseReportRetrieve(PurchaseReport pr)
        {
            return new PMSCLS.IPurchaseReport().PurchaseReportRetrieve(pr.Date, pr.PurchaseMonth, pr.PurchaseYear, pr.ReportType);
        }

        //Selling Report
        [WebMethod]
        public List<SellingReport> SellingReportRetrieve(SellingReport sr)
        {
            return new PMSCLS.ISellingReport().SellingReportRetrieve(sr.StatusId, sr.Date, sr.SellingMonth, sr.SellingYear, sr.SchemeId, sr.ReportType);
        }

        //Death Report
        [WebMethod]
        public List<DeathReport> DeathReportRetrieve(DeathReport dr)
        {
            return new PMSCLS.IDeathReport().DeathReportRetrieve(dr.SchemeId, dr.BreedId, dr.DeathMonth, dr.DeathYear);
        }

        //Daily Stock Report
        [WebMethod]
        public List<DailyStockReport> DailyStockReportRetrieve(DailyStockReport dsr)
        {
            return new PMSCLS.IDailyStockReport().DailyStockReportRetrieve(dsr.SchemeId, dsr.BreedId, dsr.Date);
        }

        //Economic Indices Report
        [WebMethod]
        public List<EconomicIndicesReport> EconomicIndicesReportRetrieve(int intSchemeId, int intFy)
        {
            return new PMSCLS.IEconomicIndicesReport().EconomicIndicesReportRetrieve(intSchemeId, intFy);
        }

        //Pig Generation
        [WebMethod]
        public string PigGenerationRetrieve(string strTagNo)
        {
            return new PMSCLS.IPigGeneration().PigGenerationRetrieve(strTagNo);
        }
    }
}
