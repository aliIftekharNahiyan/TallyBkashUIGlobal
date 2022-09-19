import { ChangeDetectorRef, Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import { BuyerModelResults,RequestObject } from '../buyermodel';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DueCollectionModel, DueCollectionModelResult } from './advancedmodel';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{map,startWith}from 'rxjs/operators';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-buyer-due-collection',
  templateUrl: './buyer-due-collection.component.html',
  styleUrls: ['./buyer-due-collection.component.scss']
})
export class BuyerDueCollectionComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions:Observable<BuyerModelResults[]>;


  error = '';
  bakiReceived: number = 0;
  currentBaki:number=0
  businesslist: BuyerModelResults[];
  submitted: boolean = false;
  businessType: number = 0;
  btnName: string = ""
  btnNameAlert: string = "";
  previousBaki:number=0;
  other:boolean=false;
  smsBalance:number=0;
  sendSms:boolean=false;
  hasParam:boolean=false;
  breadCrumbItems:Array<{}>;
  paramsObject: any;
  dueModel:DueCollectionModelResult;
  ddn:any;
  dates:any;
  shopName:any;
  shopNumber:any;
  shopAddress:any;
  requestId:number=0;
  bakiReceivedNew:number;
  editModel:string="";

  constructor(private apiservice: ApigenericService,private cdRef:ChangeDetectorRef,private route:ActivatedRoute,private router:Router,private modalService: NgbModal) { 

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
    this.apiservice.getData(this.apiservice.buyerList + "?userId=" + id + "&status=1").subscribe(data => {
    
      this.businesslist = data.listOfBuyers;
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
        this.apiservice.getData(this.apiservice.buyerDueCollectionDetailsModification + "?id=" + atob(this.paramsObject.params.id))
          .subscribe(data => {
            let jsonObj: any = JSON.parse(JSON.stringify(data));
            this.dueModel = <DueCollectionModelResult>jsonObj;
           // console.log(this.dueModel.result.BuyerId);
            this.businessType = this.dueModel.result.BuyerId;
            this.other=true;
            this.previousBaki=this.dueModel.result.TotalBaki;
            this.bakiReceived=this.dueModel.result.BakiReceived;
            this.currentBaki=this.dueModel.result.RemainBaki;
            this.requestId = this.dueModel.result.Id;

            let a = this.businesslist.filter(
              book => book.Id.toString() === this.dueModel.result.BuyerId.toString());
            //  console.log(a);
              this.editModel=a[0].BuyerName;
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
   // console.log(subject);
   return subject? subject.name:undefined;
  }

  _filter(value:any):BuyerModelResults[]{
    return this.businesslist.filter(option => 
      option.BuyerName.toLowerCase().includes(value.toLowerCase())
      );
  }
  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
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


  onChange(newValue) {
  
   if(newValue==="0"){
    this.other=false;
   }else{
    this.other=true;
    this.error = ""; 
    this.dropDownValue(newValue);
   }
     

    
   
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
  BuyerId:this.businessType,
  TotalBaki:this.previousBaki,
  BakiReceived:this.bakiReceived,
  RemainBaki:this.currentBaki,
  Id:this.requestId,
  EntryDate: this.dates.year + '-' + this.dates.month + '-' + this.dates.day
}
    this.apiservice.postData(this.apiservice.buyerDueCollection,data).subscribe(data => {
      ;
      },
        (error) => {
    
          return;
        })



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

// onAllList(){
//   this.router.navigate(['/buySellManagement/BuyerDueCollectionDetails']);
// }



onAllList(a){
  console.log(a);
  //return;
  if(a =='all'){
    this.router.navigate(['/buySellManagement/BuyerDueCollectionDetails']);

  }else{
    this.router.navigate(['/buySellManagement/BuyerRawInfo']);

  }

}

dropDownValue(datas:any){
  let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
  let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;
 

  let id = userId === 0 ? createdBy : userId;
  this.apiservice.getData(this.apiservice.getBuyerBakiTaka + "?supplierId=" + datas + "&userId="+id).subscribe(data => {
    this.previousBaki=data.result;    
    this.test();
})

}
}
