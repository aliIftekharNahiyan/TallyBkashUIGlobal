import { ChangeDetectorRef, Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import { BuyerModelResults,RequestObject } from '../buyermodel';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { DueCollectionModelResult } from './advancedmodel';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{map,startWith}from 'rxjs/operators';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import { SupplierModelResult } from '../../supplier/supplierModel';



@Component({
  selector: 'app-supplier-due-payment',
  templateUrl: './supplier-due-payment.component.html',
  styleUrls: ['./supplier-due-payment.component.scss']
})
export class SupplierDuePaymentComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions:Observable<SupplierModelResult[]>;
  error = '';
  bakiReceived: number = 0;
  currentBaki:number=0
  businesslist: SupplierModelResult[];
  submitted: boolean = false;
  businessType: number = 0;
  btnName: string = ""
  btnNameAlert: string = "";
  previousBaki:number=0;
  other:boolean=false;
  smsBalance:number=0;
  sendSms:boolean=false;
  hasParam:boolean=false;
  breadCrumbItems: Array<{}>;
  paramsObject:any;
  dueModel:DueCollectionModelResult;
  requestId: number = 0;
  dates:any;
  ddn:any;
  shopName:any;
  shopNumber:any;
  shopAddress:any;
  modelHeader:any;
  bakiReceivedNew:any;
  editModel:String="";
  constructor(private apiservice: ApigenericService,private cdRef:ChangeDetectorRef,private route:ActivatedRoute,private router:Router,private modalService: NgbModal)  {
    
    this.btnName = "সংরক্ষণ করুন";
    this.btnNameAlert = "সংরক্ষণ";
    // this.btnName = "সংশোধন করুন";
    // this.btnNameAlert = "সংশোধন";

    


   }
   @ViewChild('cc') cc:  ElementRef<HTMLElement>;
  ngOnInit() {

    let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
    let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;
    let id = userId === 0 ? createdBy : userId;
    this.apiservice.getData(this.apiservice.supplierList + "?userId=" + id + "&status=1").subscribe(data => {
    
      this.businesslist = data.listOfSuppliers;
      this.filteredOptions=this.myControl.valueChanges.pipe(
        startWith(''),
        map(value=> this._filter(value))
      );
    
    })



    this.breadCrumbItems = [{ label: 'ক্রয়/বিক্রয়' }, { label: 'বাকি টাকা প্রদান', active: true }];

    let dd = new Date();   
    this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
    //this.addQuantity();
    this.ddn=dd;

    this.route.queryParamMap
    .subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.id !== undefined) {
        this.hasParam = true;
        this.btnName = "সংশোধন করুন";        
        this.apiservice.getData(this.apiservice.supplierDuePaymentDetailsModification + "?id=" + atob(this.paramsObject.params.id))
          .subscribe(data => {
            let jsonObj: any = JSON.parse(JSON.stringify(data));
            this.dueModel = <DueCollectionModelResult>jsonObj;
            console.log(this.dueModel.result.BuyerId);
            this.businessType = this.dueModel.result.SupplierId;
            this.other=true;
            this.previousBaki=this.dueModel.result.TotalBaki;
            this.bakiReceived=this.dueModel.result.BakiReceived;
            this.currentBaki=this.dueModel.result.RemainBaki;
            this.requestId = this.dueModel.result.Id;
           // console.log(this.businesslist);
           // console.log(this.dueModel.result.BuyerId);
            let a = this.businesslist.filter(
              book => book.Id === this.dueModel.result.SupplierId);
             // console.log(a);
              this.editModel=a[0].SupplierName;

            // this.requestId = this.workerModel.result.Id;
            // this.kormochariName = this.workerModel.result.WorkerName;            
            // this.address = this.workerModel.result.Address;
            // this.mobileNumber = this.workerModel.result.WorkerMobile;
            // this.nid = this.workerModel.result.Nid.toString();    
            // this.imgURL=this.workerModel.result.Picture.toString();
            // this.active=this.workerModel.result.Active.toString()==='1'?true:false;        
            this.btnName = "সংশোধন করুন";
            this.btnNameAlert = "সংশোধন";
          },
            (error) => {

              return;
            })
      }

    }
    );
  }

  displayFn (subject) { 
    //console.log(subject);
   return subject? subject.name:undefined;
  }

  _filter(value:any):SupplierModelResult[]{
    return this.businesslist.filter(option => 
      option.SupplierName.toLowerCase().includes(value.toLowerCase())
      );
  }
  onSubmit() {
    this.submitted=true;
    if((this.businessType===0))
   {
     
       this.businessType = 0;
       this.error = "error";  
       this.other=false;  
       this.sendSms=false;
      // console.log('i m error');
       return;
   }
  // console.log('i m here');
     this.titleText();
     

 
  }
  setVariable(id){
   // console.log(id);


    if (id === "0") {
      this.businessType = 0;
      this.error = "error";
      this.other = false;
      this.sendSms = false;
      return;
    }
    else {
      this.other = true;
      this.error = "";
      this.businessType=id;
      this.dropDownValue(id);


    }
    

  }

  onChange(newValue) {
  
   if(newValue==="0"){
    this.other=false;
   }else{
    this.other=true;
    this.error = ""; 
    this.dropDownValue(newValue);
   }
     

    
   
}
postRequest(){
 
    
  let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
  let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;
 

  let id = userId === 0 ? createdBy : userId;
  let subUserId= userId === 0 ? "0" :createdBy.toString();  




  this.apiservice.getData(this.apiservice.signupUpdate + '?id='+id).subscribe(data => {
    this.shopName=data.result.ShopName;
    this.shopNumber=data.result.MobileNumber;
    this.shopAddress=data.result.ShopAddress;
},
  (error) => {

    return;
  })



let el: HTMLElement = this.cc.nativeElement;
el.click();








var data={
  UserId:id,
  SupplierId:this.businessType,
  TotalBaki:this.previousBaki,
  BakiReceived:this.bakiReceived,
  RemainBaki:this.currentBaki,
  Id:this.requestId,
  EntryDate: this.dates.year + '-' + this.dates.month + '-' + this.dates.day
}

  this.apiservice.postData(this.apiservice.supplierDuePayment,data).subscribe(data => {
    ;
    },
      (error) => {
  
        return;
      })   


}
  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }

titleText() {
  Swal.fire({
    title: 'আপনি কি নিশ্চিত?',  
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#ff3d60',
    confirmButtonText: 'হ্যা',
    cancelButtonText:'না'
  }).then(result => {
    if (result.value) {        
    
     
   this.postRequest();

    this.bakiReceivedNew= this.bakiReceived;
      this.bakiReceived = 0;
     this.other=false;
       this.businessType = 0;
      this.hasParam=false;
      this.btnName = "সংরক্ষণ করুন";
      this.btnNameAlert = "সংরক্ষণ";
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: this.btnNameAlert,
        showConfirmButton: false,
        timer: 1500
      }).then();

      
     
    }
  });
}


test() {

  this.currentBaki = this.previousBaki  - this.bakiReceived;
}

onAllList(a){
 // console.log(a);
  //return;
  if(a =='all'){
    this.router.navigate(['/buySellManagement/SupplierDuePaymentDetails']);

  }else{
    this.router.navigate(['/buySellManagement/SupplierRawInfo']);

  }

}




dropDownValue(datas:any){
  let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
  let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;
 

  let id = userId === 0 ? createdBy : userId;
  this.apiservice.getData(this.apiservice.getSupplierBakiTaka + "?supplierId=" + datas + "&userId="+id).subscribe(data => {
    this.previousBaki=data.result; 
    this.test();
})

}
}
