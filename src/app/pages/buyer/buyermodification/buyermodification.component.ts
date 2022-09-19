import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';
import { FormBuilder, Validators,  FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {BuyerModel} from '../buyerModel'



@Component({
  selector: 'app-buyermodification',
  templateUrl: './buyermodification.component.html',
  styleUrls: ['./buyermodification.component.scss']
})
export class BuyermodificationComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; 
  
  submitted = false;
  typesubmit=false;
  buyerName:string;
  hisabStartAmount:string;
  mobileNumber:string;
  address:string='';
  date:any = { "year": "2021", "month": "2", "day": "25" };

  dates:any;

  btnName: string = "সংরক্ষণ করুন";
  btnNameAlert: string = "সংরক্ষণ";

  userId:number;
  subuserId:number;
  createdBy:number;
  paramsObject: any;
  hasParam: boolean = false;

  buyerModel:BuyerModel;

  constructor(public formBuilder: FormBuilder,private apiservice: ApigenericService,private route: ActivatedRoute) { }

  ngOnInit() {
    let dd = new Date();   
    this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
    this.breadCrumbItems = [{ label: 'ক্রেতা' }, { label: 'ক্রেতা তৈরি করুন', active: true }];
    bsCustomFileInput.init();


    this.route.queryParamMap
    .subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.id !== undefined) {
        this.hasParam = true;
        this.btnName = "সংশোধন করুন";        
        this.apiservice.getData(this.apiservice.buyerGetInfo + "?id=" + atob(this.paramsObject.params.id))
          .subscribe(data => {
            let jsonObj: any = JSON.parse(JSON.stringify(data));
            this.buyerModel = <BuyerModel>jsonObj;
            let dd = new Date(this.buyerModel.result.EntryDate);   
           // console.log(this.buyerModel.result.EntryDate);
           // console.log(new NgbDate(dd.getFullYear(),dd.getMonth(),dd.getDate()));      

            this.buyerName = this.buyerModel.result.BuyerName;
            this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
            this.address = this.buyerModel.result.Address;
            this.mobileNumber = this.buyerModel.result.MobileNumber;
            this.hisabStartAmount = this.buyerModel.result.HisabStartAmount.toString();            
            this.btnName = "সংশোধন করুন";
            this.btnNameAlert = "সংশোধন";
          },
            (error) => {

              return;
            })
      }

    }
    );
   

    this.typeValidationForm = this.formBuilder.group({
      buyerName: ['', Validators.required],
      hisabStartAmount: [''],    
      mobileNumber: [''],     
      address: [''],    
      date:['', Validators.required],
    });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  get f() { return this.typeValidationForm.controls; }

  
  onSubmit() {
    this.submitted = true;

    if (this.typeValidationForm.invalid) {    
     // console.log('invalid'); 
      return;
    }
    this.submitted = false; 
    this.titleText();
  }
postRequest(){
  this.userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;     
  this.createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;    

  var datamodel={
    Id:this.hasParam ? this.buyerModel.result.Id : 0,
    BuyerName:this.f.buyerName.value,
    HisabStartAmount:this.f.hisabStartAmount.value,
    MobileNumber:this.f.mobileNumber.value,
    Address:this.f.address.value,
    UserId:this.userId===0?this.createdBy:this.userId,
    SubUserId:this.userId === 0 ? 0 :this.userId ,
    CreatedBy:this.createdBy,
    Status:1,
    EntryDate:this.f.date.value.year+'-'+this.f.date.value.month+'-'+this.f.date.value.day
   
  }


  this.apiservice.postData(this.apiservice.buyerApi, datamodel)
  .subscribe(data => {
  //  console.log('success');
   
   
  },
    (error) => {
      //this.error = error ? "মোবাইল নম্বরটি পূর্বে ব্যবহার হচ্ছে। " : '';
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
        this.typeValidationForm.reset();
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

}
