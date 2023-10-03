using PMSCLS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace PMSWEB
{
    /// <summary>
    /// Summary description for PMS_Master
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class PMS_Master : System.Web.Services.WebService
    {

        public PMS_Master()
        {

            //Uncomment the following line if using designed components 
            //InitializeComponent(); 
        }

        [WebMethod]
        public List<Role> RoleRetrieve()
        {
            List<Role> objInvoiceResult = new PMSCLS.IRole().RoleRetrieve();
            return objInvoiceResult;
        }
        [WebMethod]
        public int RoleSave(Role role)
        {
            return new PMSCLS.IRole().RoleSave(role.RoleId, role.RoleName, role.Description, role.UserId);
        }
        [WebMethod]
        public int RoleDelete(Role role)
        {
            return new PMSCLS.IRole().RoleDelete(role.RoleId, role.UserId);
        }
        [WebMethod]
        public Login LoginRetrieve(Login log)
        {
            return new PMSCLS.ILogin().LoginRetrieve(log.UserName, log.Password, log.IPAddress);
        }
        //Forgot Password
        [WebMethod]
        public ForgotPassword ForgotPassword(ForgotPassword fp)
        {
            return new PMSCLS.ILogin().ForgotPassword(fp.UserName);
        }
        //Forgot Password Check
        [WebMethod]
        public ChangePassword ForgotPasswordCheck(ChangePassword strId)
        {
            return new PMSCLS.ILogin().ForgotPasswordCheck(strId.Id);
        }
        //Change Password
        [WebMethod]
        public ChangePassword ChangePassword(ChangePassword cp)
        {
            return new PMSCLS.ILogin().ChangePassword(cp.Id, cp.UserId, cp.Password);
        }
        [WebMethod]
        public List<Scheme> SchemeRetrieve()
        {
            List<Scheme> objInvoiceResult = new PMSCLS.IScheme().SchemeRetrieve();
            return objInvoiceResult;
        }
        [WebMethod]
        public int SchemeSave(Scheme Scheme)
        {
            return new PMSCLS.IScheme().SchemeSave(Scheme.SchemeId, Scheme.SchemeName, Scheme.ExternallyFunded, Scheme.Description, Scheme.EADRData, Scheme.LogUserId);
        }
        [WebMethod]
        public int SchemeDelete(Scheme Scheme)
        {
            return new PMSCLS.IScheme().SchemeDelete(Scheme.SchemeId, Scheme.LogUserId);
        }
        [WebMethod]
        public List<User> UserRetrieve()
        {
            List<User> objInvoiceResult = new PMSCLS.IUser().Useretrieve();
            return objInvoiceResult;
        }
        [WebMethod]
        public int UserSave(User user)
        {
            return new PMSCLS.IUser().UserSave(user.UserId, user.FirstName, user.LastName, user.RoleId, user.Designation, user.EmailId, user.MobileNo, user.UserName, user.Password, user.Active, user.SchemeMapping, user.LogUserId);
        }
        [WebMethod]
        public int UserCheck(User user)
        {
            return new PMSCLS.IUser().UserCheck(user.UserName);
        }
        [WebMethod]
        public int UserEmailCheck(User user)
        {
            return new PMSCLS.IUser().UserEmailCheck(user.EmailId, user.UserId);
        }

        //RoleAccess
        [WebMethod]
        public List<RoleAccess> RoleAccessRetrieve(RoleAccess roleAccess)
        {
            List<RoleAccess> objInvoiceResult = new PMSCLS.IRoleAccess().RoleAccessRetrieve(roleAccess.RoleId);
            return objInvoiceResult;
        }
        [WebMethod]
        public int RoleAccessSave(RoleAccess roleAccess)
        {
            return new PMSCLS.IRoleAccess().RoleAccessSave(roleAccess.RoleId, roleAccess.RoleAccessData, roleAccess.LogUserId);
        }

        //RoleMenu
        [WebMethod]
        public string RoleMenuRetrieve(int intRoleId, string strMenuCode)
        {
            return new PMSCLS.ILogin().RoleMenuRetrieve(intRoleId, strMenuCode);
        }
        //RoleAccess
        [WebMethod]
        public RoleAccess RoleAccess(RoleAccess ra)
        {
            return new PMSCLS.ILogin().RoleAccess(ra.RoleId, ra.MenuId);
        }
        //Vaccination
        [WebMethod]
        public List<Vaccination> VaccinationRetrieve()
        {
            List<Vaccination> objInvoiceResult = new PMSCLS.IVaccination().VaccinationRetrieve();
            return objInvoiceResult;
        }
        [WebMethod]
        public int VaccinationSave(Vaccination vac)
        {
            return new PMSCLS.IVaccination().VaccinationSave(vac.VaccinationId, vac.VaccinationName, vac.FirstDose, vac.NextDose, vac.DoseRoute, vac.Description, vac.UserId);
        }
        [WebMethod]
        public int VaccinationDelete(Vaccination vac)
        {
            return new PMSCLS.IVaccination().VaccinationDelete(vac.VaccinationId, vac.UserId);
        }
        //Breed
        [WebMethod]
        public List<Breed> BreedRetrieve()
        {
            List<Breed> objInvoiceResult = new PMSCLS.IBreed().BreedRetrieve();
            return objInvoiceResult;
        }
        [WebMethod]
        public int BreedSave(Breed breed)
        {
            return new PMSCLS.IBreed().BreedSave(breed.BreedId, breed.BreedName, breed.Description, breed.SchemeMapping, breed.LogUserId);
        }
        [WebMethod]
        public int BreedDelete(Breed breed)
        {
            return new PMSCLS.IBreed().BreedDelete(breed.BreedId, breed.SchemeMapping, breed.LogUserId);
        }
        //Shed
        [WebMethod]
        public List<Shed> ShedRetrieve()
        {
            List<Shed> objInvoiceResult = new PMSCLS.IShed().ShedRetrieve();
            return objInvoiceResult;
        }
        [WebMethod]
        public int ShedSave(Shed shed)
        {
            return new PMSCLS.IShed().ShedSave(shed.ShedId, shed.NoOfPens, shed.ShedName, shed.Description, shed.Length, shed.Breadth, shed.Height, shed.PenData, shed.LogUserId);
        }
        [WebMethod]
        public int ShedDelete(Shed shed)
        {
            return new PMSCLS.IShed().ShedDelete(shed.ShedId, shed.PenData, shed.LogUserId);
        }
        [WebMethod]
        public int PenDelete(Shed shed)
        {
            return new PMSCLS.IShed().PenDelete(shed.PenId, shed.LogUserId);
        }
        [WebMethod]
        public int PenNoCheck(Shed shed)
        {
            return new PMSCLS.IShed().PenNoCheck(shed.PenNo, shed.ShedId, shed.PenId);
        }
        //Reminder due
        [WebMethod]
        public int ReminderDueSave(ReminderDue rd)
        {
            return new PMSCLS.IReminderDue().ReminderDueSave(rd.Before, rd.After);
        }
        [WebMethod]
        public ReminderDue ReminderDueRetrieve()
        {
            return new PMSCLS.IReminderDue().ReminderDueRetrieve();
        }
    }
}
