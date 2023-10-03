using PMSCLS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace PMSWEB
{
    /// <summary>
    /// Summary description for PMS_Entries
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PMS_Entries : System.Web.Services.WebService
    {

        public PMS_Entries()
        {

            //Uncomment the following line if using designed components 
            //InitializeComponent(); 
        }
        //Pig detail
        [WebMethod]
        public PigDetail PigDetailRetrieve(string strTagno, int intUserId)
        {
            return new PMSCLS.IPigDetail().PigDetailRetrieve(strTagno, intUserId);
        }
        [WebMethod]
        public int PigDetailSave(PigDetail pd)
        {
            return new PMSCLS.IPigDetail().PigDetailSave(pd.Tagno, pd.StatusId, pd.SchemeId, pd.BreedId, pd.DOB, pd.Sex, pd.BirthWeight, pd.Color, pd.Sireno, pd.Damno, pd.ShedId, pd.PenId, pd.Generation, pd.NoofTeats, pd.TeatsType, pd.CastRated, pd.CastRatedDate, pd.UserId);
        }
        [WebMethod]
        public int PigDetailDelete(string strTagno)
        {
            return new PMSCLS.IPigDetail().PigDetailDelete(strTagno);
        }

        //Mating detail
        [WebMethod]
        public List<MatingDetail> MatingDetailRetrieve(string strTagno, int intUserId)
        {
            List<MatingDetail> objInvoiceResult = new PMSCLS.IMatingDetail().MatingDetailRetrieve(strTagno, intUserId);
            return objInvoiceResult;
        }
        [WebMethod]
        public int MatingDetailSave(MatingDetail md)
        {
            return new PMSCLS.IMatingDetail().MatingDetailSave(md.Tagno, md.SexualMaturityDate, md.SexualMaturityWeight, md.FirstServiceDate, md.FirstServiceWeight, md.MatingId, md.MatingDate, md.Boarno, md.MatingStatusId, md.UserId);
        }
        [WebMethod]
        public int MatingSave(MatingDetail md)
        {
            return new PMSCLS.IMatingDetail().MatingSave(md.Tagno, md.MatingId, md.MatingDate, md.Boarno, md.MatingStatusId, md.UserId);
        }
        //Farrowing detail
        [WebMethod]
        public FarrowingDetail MatingRetrieve(string strTagno, int intUserId)
        {
            return new PMSCLS.IFarrowingDetail().MatingRetrieve(strTagno, intUserId);
        }
        [WebMethod]
        public List<FarrowingDetail> FarrowingDetailRetrieve(string strTagno, int intUserId)
        {
            List<FarrowingDetail> objInvoiceResult = new PMSCLS.IFarrowingDetail().FarrowingDetailRetrieve(strTagno, intUserId);
            return objInvoiceResult;
        }
        [WebMethod]
        public int FarrowingDetailSave(FarrowingDetail fd)
        {
            return new PMSCLS.IFarrowingDetail().FarrowingDetailSave(fd.FarrowingId, fd.Sowno, fd.MatingId, fd.FarrowingDate, fd.DewormingDate, fd.DewormingName, fd.DoseRoute, fd.SBM, fd.SBF, fd.LSBM, fd.LSBF, fd.LWBM, fd.LWBF, fd.BreedId, fd.Generation, fd.PigletsData, fd.UserId);
        }
        //Weaning detail
        [WebMethod]
        public List<WeaningDetail> WeaningRetrieve(string strTagNo, int intUserId)
        {
            List<WeaningDetail> objInvoiceResult = new PMSCLS.IWeaningDetail().WeaningRetrieve(strTagNo, intUserId);
            return objInvoiceResult;
        }
        [WebMethod]
        public List<WeaningDetail> WeaningDetailRetrieve(string strTagNo)
        {
            List<WeaningDetail> objInvoiceResult = new PMSCLS.IWeaningDetail().WeaningDetailRetrieve(strTagNo);
            return objInvoiceResult;
        }
        [WebMethod]
        public List<WeaningDetail> WeaningPigletsDetailRetrieve(string strTagNo, int intFarrowingId)
        {
            List<WeaningDetail> objInvoiceResult = new PMSCLS.IWeaningDetail().WeaningPigletsDetailRetrieve(strTagNo, intFarrowingId);
            return objInvoiceResult;
        }
        [WebMethod]
        public int WeaningDetailSave(WeaningDetail weaning)
        {
            return new PMSCLS.IWeaningDetail().WeaningDetailSave(weaning.WeaningId, weaning.TagNo, weaning.FarrowingId, weaning.WeaningDate, weaning.LSWM, weaning.LSWF, weaning.LSWT, weaning.LWWM, weaning.LWWF, weaning.LWWT, weaning.PigletsData, weaning.LogUserId);
        }
        [WebMethod]
        public List<WeaningDetail> PenBasedPigCheck(int PenId, int ShedId)
        {
            List<WeaningDetail> objInvoiceResult = new PMSCLS.IWeaningDetail().PenBasedPigCheck(PenId, ShedId);
            return objInvoiceResult;
        }
        //Weaning Reminder
        [WebMethod]
        public List<WeaningReminder> WeaningReminder()
        {
            return new PMSCLS.IWeaningDetail().WeaningReminder();
        }
        //Pig Weight Details
        [WebMethod]
        public List<PigWeightDetails> WeightRetrieve(PigWeightDetails pigweight)
        {
            return new PMSCLS.IPigWeightDetails().WeightRetrieve(pigweight.WeightId);
        }
        [WebMethod]
        public List<PigWeightDetails> StageBasedMinMaxWeightRetrieve(int intStageId)
        {
            return new PMSCLS.IPigWeightDetails().StageBasedMinMaxWeightRetrieve(intStageId);
        }
        [WebMethod]
        public List<PigWeightDetails> AnimalWeightDetailsRetrieve(string strTagno)
        {
            return new PMSCLS.IPigWeightDetails().AnimalWeightDetailsRetrieve(strTagno);
        }
        [WebMethod]
        public List<PigWeightDetails> WeightDetailsRetrieve(PigWeightDetails pigweight)
        {
            return new PMSCLS.IPigWeightDetails().WeightDetailsRetrieve(pigweight.WeightId, pigweight.WeightDate, pigweight.TagNo, pigweight.ShedId);
        }
        [WebMethod]
        public int WeightDetailsSave(PigWeightDetails pigweight)
        {
            return new PMSCLS.IPigWeightDetails().WeightDetailsSave(pigweight.WeightId, pigweight.WeightDate, pigweight.WeightData, pigweight.LogUserId);
        }
        //Weight Reminder
        [WebMethod]
        public List<WeightReminder> WeightReminder()
        {
            return new PMSCLS.IPigWeightDetails().WeightReminder();
        }
        //Feed Details
        [WebMethod]
        public List<FeedDetails> FeedDetailsRetrieve(FeedDetails feed)
        {
            return new PMSCLS.IFeedDetails().FeedDetailsRetrieve(feed.FeedMonth, feed.FeedYear, feed.SchemeId, feed.Id);
        }
        [WebMethod]
        public int FeedDetailSave(FeedDetails feed)
        {
            return new PMSCLS.IFeedDetails().FeedDetailSave(feed.SchemeId, feed.FeedData, feed.LogUserId);
        }
        [WebMethod]
        public int FeedDetailDelete(FeedDetails feed)
        {
            return new PMSCLS.IFeedDetails().FeedDetailDelete(feed.FeedDetailsId, feed.LogUserId);
        }
        //Vaccination detail
        [WebMethod]
        public List<VaccinationDetail> VaccinationDetailRetrieve(VaccinationDetail vd)
        {
            return new PMSCLS.IVaccinationDetail().VaccinationDetailRetrieve(vd.VaccinationId, vd.VaccinationDate, vd.ShedId, vd.UserId);
        }
        [WebMethod]
        public int VaccinationDetailSave(VaccinationDetail vd)
        {
            return new PMSCLS.IVaccinationDetail().VaccinationDetailSave(vd.VaccinationId, vd.VaccinationDate, vd.VaccinationData, vd.UserId);
        }
        //Vaccination Reminder
        [WebMethod]
        public List<VaccinationReminder> VaccinationReminder()
        {
            return new PMSCLS.IVaccinationDetail().VaccinationReminder();
        }
        //Treatment detail
        [WebMethod]
        public List<TreatmentDetail> TreatmentDetailRetrieve(string strTagno, int intUserId)
        {
            return new PMSCLS.ITreatmentDetail().TreatmentDetailRetrieve(strTagno, intUserId);
        }
        [WebMethod]
        public int TreatmentDetailSave(TreatmentDetail td)
        {
            return new PMSCLS.ITreatmentDetail().TreatmentDetailSave(td.Tagno, td.TreatmentData, td.UserId);
        }

        [WebMethod]
        public int TreatmentDetailDelete(TreatmentDetail td)
        {
            return new PMSCLS.ITreatmentDetail().TreatmentDetailDelete(td.TreatmentId, td.UserId);
        }
        //Purchase details
        [WebMethod]
        public int PurchaseDetailsSave(PurchaseDetails pd)
        {
            return new PMSCLS.IPurchaseDetails().PurchaseDetailsSave(pd.Tagno, pd.DOP, pd.PurchaseNo, pd.PurchasePlace, pd.ReceiptNo, pd.Amount, pd.SchemeId, pd.BreedId, pd.DOB, pd.Sex, pd.BirthWeight, pd.Color, pd.Sireno, pd.Damno, pd.NoofTeats, pd.TeatsType, pd.Generation, pd.Age, pd.PenId, pd.WeaningWeight, pd.CurrentWeight, pd.VaccinationData, pd.DewormingData, pd.TreatmentData, pd.LogUserId);
        }
        //Selling detail
        [WebMethod]
        public List<SellingDetails> TagnoBasedStageRetrieve(string strTagno, string strSellingDate)
        {
            return new PMSCLS.ISellingDetails().TagnoBasedStageRetrieve(strTagno, strSellingDate);
        }

        //[WebMethod]
        //public List<SellingDetails> SellingDetailsRetrieve(SellingDetails selling)
        //{
        //    return new PMSCLS.ISellingDetails().SellingRetrieve(selling.StatusId, selling.SellingDate);
        //}

        [WebMethod]
        public int SellingDetailsSave(SellingDetails sd)
        {
            return new PMSCLS.ISellingDetails().SellingDetailsSave(sd.StatusId, sd.SellingDate, sd.SellingId, sd.Mobileno, sd.CustomerName, sd.CustomerAddress, sd.ReceiptNo, sd.SellingData1, sd.TagNoList, sd.SchemeId, sd.LogUserId);
        }

        [WebMethod]
        public List<SellingDetails> SellingAnimalDetailSearch(string strTagno, string strStageId, double? dblWeightFrom, double? dblWeightTo, int intShedId, int intUserId)
        {
            return new PMSCLS.ISellingDetails().SellingAnimalDetailSearch(strTagno, strStageId, dblWeightFrom, dblWeightTo, intShedId, intUserId);
        }
        //Deworming detail
        [WebMethod]
        public List<DewormingDetail> DewormingDetailRetrieve(DewormingDetail dd)
        {
            return new PMSCLS.IDewormingDetail().DewormingDetailRetrieve(dd.DewormingDate, dd.ShedId, dd.UserId);
        }
        [WebMethod]
        public int DewormingDetailSave(DewormingDetail dd)
        {
            return new PMSCLS.IDewormingDetail().DewormingDetailSave(dd.DewormingDate, dd.DewormingData, dd.UserId);
        }

        //Carcass details
        [WebMethod]
        public List<CarcassDetails> CarcassDetailsRetrieve(string strTagno, int intUserId)
        {
            return new PMSCLS.ICarcassDetails().CarcassDetailsRetrieve(strTagno, intUserId);
        }

        [WebMethod]
        public int CarcassDetailsSave(CarcassDetails cd)
        {
            return new PMSCLS.ICarcassDetails().CarcassDetailsSave(cd.CarcassId, cd.Tagno, cd.SlaughterDate, cd.LiveWeight, cd.WeightAfter24, cd.HeadWeight, cd.PluckWeight, cd.AlimentaryWeight, cd.HotCarcassWeight, cd.ChillingLoss, cd.CarcassWeightAfter24, cd.DressedWeight, cd.CarcassLength, cd.AverageBackFatThickness, cd.LoinEyeArea, cd.ShoulderWeight, cd.HamWeight, cd.LoinWeight, cd.BellyWeight, cd.BoneRatio, cd.Remarks, cd.LogUserId);
        }
        //Transfer details
        [WebMethod]
        public List<TransferDetails> TransferDetailsRetrieve(string strTagno, int intUserId)
        {
            return new PMSCLS.ITransferDetails().TransferDetailsRetrieve(strTagno, intUserId);
        }

        [WebMethod]
        public int TransferDetailsSave(TransferDetails td)
        {
            return new PMSCLS.ITransferDetails().TransferDetailsSave(td.Tagno, td.TransferDate, td.PenId, td.LogUserId);
        }

        //Death detail
        [WebMethod]
        public DeathDetail DeathDetailRetrieve(string strTagno, int intUserId)
        {
            return new PMSCLS.IDeathDetail().DeathDetailRetrieve(strTagno, intUserId);
        }
        [WebMethod]
        public int DeathDetailSave(DeathDetail dd)
        {
            return new PMSCLS.IDeathDetail().DeathDetailSave(dd.Tagno, dd.DeathDate, dd.DeathCause, dd.Remarks, dd.History, dd.ClinicalSigns, dd.TentativeDiagnosis, dd.MaterialSent, dd.GrossLesions, dd.intFileCount, dd.UserId);
        }
        [WebMethod]
        public int DeathDetailDelete(DeathDetail dd)
        {
            return new PMSCLS.IDeathDetail().DeathDetailDelete(dd.Tagno, dd.UserId);
        }

        //Vaccination detail load
        [WebMethod]
        public List<VaccinationDetail> VaccinationDetailLoad(string strTagno, int intUserId)
        {
            return new PMSCLS.IVaccinationDetail().VaccinationDetailLoad(strTagno, intUserId);
        }

        //Deworming detail load
        [WebMethod]
        public List<DewormingDetail> DewormingDetailLoad(string strTagno, int intUserId)
        {
            return new PMSCLS.IDewormingDetail().DewormingDetailLoad(strTagno, intUserId);
        }
        //Farmer Registration Details
        [WebMethod]
        public List<FarmerRegistrationDetails> FarmerRegistrationRetrieve()
        {
            return new PMSCLS.IFarmerRegistrationDetails().FarmerRegistrationRetrieve();
        }
        [WebMethod]
        public int FarmerRegistrationSave(FarmerRegistrationDetails frd)
        {
            return new PMSCLS.IFarmerRegistrationDetails().FarmerRegistrationSave(frd.FarmerId, frd.CustomerId, frd.DOV, frd.Mobileno, frd.CustomerName, frd.CustomerAddress, frd.Purpose, frd.LogUserId);
        }

        //Farmer Training Details
        [WebMethod]
        public List<FarmerTrainingDetails> FarmerTrainingRetrieve()
        {
            return new PMSCLS.IFarmerTrainingDetails().FarmerTrainingRetrieve();
        }
        [WebMethod]
        public int FarmerTrainingSave(FarmerTrainingDetails ftd)
        {
            return new PMSCLS.IFarmerTrainingDetails().FarmerTrainingSave(ftd.FarmerId, ftd.CustomerId, ftd.DOT, ftd.Mobileno, ftd.CustomerName, ftd.CustomerAddress, ftd.Family, ftd.Category, ftd.Occupation, ftd.Land, ftd.Livestock, ftd.LogUserId);
        }

        //Economic Indices Details
        [WebMethod]
        public List<EconomicIndicesDetails> EconomicIndicesDetailsRetrieve(EconomicIndicesDetails eid)
        {
            return new PMSCLS.IEconomicIndicesDetails().EconomicIndicesDetailsRetrieve(eid.SchemeId, eid.FY, eid.Id);
        }

        [WebMethod]
        public List<EconomicIndicesDetails> EconomicIndicesDetailsSave(EconomicIndicesDetails eid)
        {
            return new PMSCLS.IEconomicIndicesDetails().EconomicIndicesDetailsSave(eid.EconomicId, eid.SchemeId, eid.FY, eid.FeedCost, eid.SwillCost, eid.OtherCost, eid.VeterinaryCharges, eid.ElectricityCharges, eid.LabourCost, eid.VariableanyOther, eid.VariableOthers, eid.TotalCost, eid.AnimalSale, eid.MeatSale, eid.ManureSale, eid.GunnySale, eid.ReceiptAnyOther, eid.ReceiptOthers, eid.TotalReceiptsCost, eid.NRVC, eid.NRVCPer, eid.NRFC, eid.NRFCPer, eid.COPLiveBody, eid.NetFarmincome, eid.NetMarketValue, eid.COPPiglet, eid.ADGBW, eid.ADGWM, eid.NOPP, eid.NOPM, eid.LogUserId);
        }

        //Selling Details
        [WebMethod]
        public List<SellingDetails> SellingDateWiseRetrieve(string strSellingDate)
        {
            return new PMSCLS.ISellingDetails().SellingDateWiseRetrieve(strSellingDate);
        }

        [WebMethod]
        public List<SellingDetails> SellingDetailsRetrieve(SellingDetails selling)
        {
            return new PMSCLS.ISellingDetails().GetSellingDetail(selling.SellingId, selling.StatusId, selling.SellingDate, selling.ReceiptNo);
        }
    }
}
