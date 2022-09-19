import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApigenericService {

// baseurl ="http://103.138.169.250/tallyapibkash/api/";
//  baseurl ="http://bkashtalyapi.talymanager.com/api/";
  //baseurl ="http://localhost:53627//api/";

  //baseurl ="http://bkashtalyapi.talymanager.com/api/";
  baseurl ="https://tmapi.griho.app/api/"; //
  //baseurl ="http://localhost:10277/api/"; //localhost:10277
   
   //Login
   loginApi=this.baseurl+"Login/Login";
   loginApiCheck="http://wap.eworldbd.mobi/bKashGhooriGW/regstatus?securityKey=WO23G611V6r8AwbBEGY8MSvG557s41Pd&partnerId=b3c69edb-592f-4106-a71c-66e148e2d11c&customerId=cid001&serviceId=10001";
  //  loginApiBkash="http://wap.eworldbd.mobi/bKashGhooriGW/subscribe?securityKey=WO23G611V6r8AwbBEGY8MSvG557s41Pd&partnerId=b3c69edb-592f-4106-a71c-66e148e2d11c&customerId=cid001&serviceId=10001&partnerRedirectURL=http://wap.eworldbd.mobi/bKashGhooriGW/redirect?service=tally&cycle=WEEKLY";
   loginApiBkash="http://wap.eworldbd.mobi/bKashGhooriGW/subscribe?securityKey=WO23G611V6r8AwbBEGY8MSvG557s41Pd&partnerId=b3c69edb-592f-4106-a71c-66e148e2d11c&customerId=cid001&serviceId=10001&partnerRedirectURL=http://taly.talymanager.com?service=tally&cycle=WEEKLY"
   loginApiCheckGP=this.baseurl+"Login/GpCheck";
   updateStatus=this.baseurl+"RegisterUser/UpdateUserStatus";
   GetUserInfoByNumber=this.baseurl+"RegisterUser/GetUserInfoByNumber";
   AccessLog=this.baseurl+"Login/InsertAccessLog";

   //Register
   signupApi=this.baseurl+"RegisterUser/RegisterUser";
   signupBusinessType=this.baseurl+"RegisterUser/GetBusinessType";
   signupUpdate = this.baseurl+"RegisterUser/GetUserInfo";

   //Supplier
   supplierApi = this.baseurl+"RegisterSuppliers/InsertUpdateSupplier";
   supplierList = this.baseurl+"RegisterSuppliers/GetSupplierList";
   supplierStatusChange=this.baseurl+"RegisterSuppliers/DeleteSupplier";
   supplierGetInfo=this.baseurl+"RegisterSuppliers/GetSupplierInfo";

   
   //Buyer
   buyerApi = this.baseurl+"RegisterBuyer/InsertUpdateBuyer";
   buyerList = this.baseurl+"RegisterBuyer/GetBuyerList";
   buyerStatusChange=this.baseurl+"RegisterBuyer/DeleteBuyer";
   buyerGetInfo=this.baseurl+"RegisterBuyer/GetBuyerInfo";


   //SupplierBuyEntryManagement
   getSupplierBakiTaka = this.baseurl+"SupplierManagement/GetLastBakiTaka";
   setSupplierInfoManagement = this.baseurl+"SupplierManagement/RawEntry";
   getSupplierManagementList=this.baseurl+"SupplierManagement/GetSupplierDataList";
   getSupplierActivityList=this.baseurl+"SupplierManagement/ActivityDetails";
   deleteSupplierInfo=this.baseurl+"SupplierManagement/DeleteSupplierInfo";
   getModificationDataSupplierManagement = this.baseurl+"SupplierManagement/GetModificationDaTask";
   updateSupplierManagementData= this.baseurl+"SupplierManagement/RawEntryUpdate";
   supplierDuePayment= this.baseurl+"SupplierManagement/SupplierDuePayment";
   supplierDuePaymentDetails= this.baseurl+"SupplierManagement/SupplierDuePaymentDetails";
   supplierRawInfo= this.baseurl+"SupplierManagement/SupplierRawInfo";
   supplierSingleInfo= this.baseurl+"SupplierManagement/GetSupplierInfo";
   supplierDuePaymentDetailsModification= this.baseurl+"SupplierManagement/SupplierDuePaymentDetailsModification";


   //BuyerBuyEntryManagement
   getBuyerBakiTaka = this.baseurl+"BuyerManagament/GetLastBakiTaka";
   setBuyerInfoManagement = this.baseurl+"BuyerManagament/RawEntry";
   getBuyerInfoManagementList=this.baseurl+"BuyerManagament/GetBuyerDataList";
   deleteBuyerInfo=this.baseurl+"BuyerManagament/DeleteBuyerInfo";
   getModificationDataBuyerManagement = this.baseurl+"BuyerManagament/GetModificationDaTask";
   updateBuyerManagementData= this.baseurl+"BuyerManagament/RawEntryUpdate";
   buyerDueCollection= this.baseurl+"BuyerManagament/BuyerDueCollection";
   buyerDueCollectionDetails= this.baseurl+"BuyerManagament/BuyerDueCollectionDetails";
   buyerSingleInfo= this.baseurl+"BuyerManagament/GetBuyerInfo";
   buyerrawinfo= this.baseurl+"BuyerManagament/BuyerRawInfo";
   buyerDuePaymentDetails= this.baseurl+"BuyerManagament/BuyerDuePaymentDetails";
   getBuyerActivityList=this.baseurl+"BuyerManagament/ActivityDetails";
   buyerDueCollectionDetailsModification= this.baseurl+"BuyerManagament/BuyerDueCollectionDetailsModification";


  //cost-management
  workerModification= this.baseurl+"WorkerCreate/WorkerModification";
  workerList = this.baseurl+"WorkerCreate/WorkerList";
  workerListDelete = this.baseurl+"WorkerCreate/WorkerListDelete";
  workerListInfo = this.baseurl+"WorkerCreate/GetWorkerInfo";

  createSpentMedium=this.baseurl+"CostSpentMedium/InsertUpdateMedium";
  userinfos=this.baseurl+"Info/Infos";





  constructor(private http:HttpClient) { }

  getData(url:any){
    return this.http.get<any>(url);
  }

  postData(url:any,postModel: any) {
    return this.http.post<any>(url, postModel);
   }
}
