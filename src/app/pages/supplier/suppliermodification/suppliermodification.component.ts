import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';
import { FormBuilder, Validators,  FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MustMatch } from '../../form/validation/validation.mustmatch';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {SupplierModelResult,SupplierModel} from '../supplierModel'
import { Location } from '@angular/common';
@Component({
  selector: 'app-suppliermodification',
  templateUrl: './suppliermodification.component.html',
  styleUrls: ['./suppliermodification.component.scss']
})

export class SuppliermodificationComponent implements OnInit {
 
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; 
  
  submitted = false;
  typesubmit=false;
  supplierName:string;
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

  supplierModel:SupplierModel;






  constructor(public formBuilder: FormBuilder,private apiservice: ApigenericService,private route: ActivatedRoute) { }


  // dateValidator(c: AbstractControl): { [key: string]: boolean } {
  //   let value = c.value;
  //   if (value && typeof value === "string") {
  //     let match = value.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
  //     if (!match) {
  //       return { 'dateInvalid': true };
  //     } else if (match && match[0] !== value) {
  //       return { 'dateInvalid': true };
  //     }
  //   }
  //   return null;
  // }


  ngOnInit() {

    let dd = new Date();   
    this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
    // this.breadCrumbItems = [{ label: 'সাপ্লাইয়ার তৈরি করুন' }, { label: 'Form Elements', active: true }];
    this.breadCrumbItems = [{ label: 'সাপ্লাইয়ার' }, { label: 'সাপ্লাইয়ার তৈরি করুন', active: true }];
    bsCustomFileInput.init();


    this.route.queryParamMap
    .subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.id !== undefined) {
        this.hasParam = true;
        this.btnName = "সংশোধন করুন";
       // console.log(this.apiservice.supplierGetInfo + "?id=" + atob(this.paramsObject.params.id));
        this.apiservice.getData(this.apiservice.supplierGetInfo + "?id=" + atob(this.paramsObject.params.id))
          .subscribe(data => {
            let jsonObj: any = JSON.parse(JSON.stringify(data));
            this.supplierModel = <SupplierModel>jsonObj;
            let dd = new Date(this.supplierModel.result.EntryDate);   
           // console.log(this.supplierModel.result.EntryDate);
           // console.log(new NgbDate(dd.getFullYear(),dd.getMonth(),dd.getDate()));      

            this.supplierName = this.supplierModel.result.SupplierName;
            this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
            this.address = this.supplierModel.result.Address;
            this.mobileNumber = this.supplierModel.result.MobileNumber;
            this.hisabStartAmount = this.supplierModel.result.HisabStartAmount.toString();            
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
      supplierName: ['', Validators.required],
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
    Id:this.hasParam ? this.supplierModel.result.Id : 0,
    SupplierName:this.f.supplierName.value,
    HisabStartAmount:this.f.hisabStartAmount.value,
    MobileNumber:this.f.mobileNumber.value,
    Address:this.f.address.value,
    UserId:this.userId===0?this.createdBy:this.userId,
    SubUserId:this.userId === 0 ? 0 :this.createdBy ,
    CreatedBy:this.createdBy,
    Status:1,
    EntryDate:this.f.date.value.year+'-'+this.f.date.value.month+'-'+this.f.date.value.day
   
  }
 // console.log(datamodel);
 // console.log(this.apiservice.supplierApi);

  this.apiservice.postData(this.apiservice.supplierApi, datamodel)
  .subscribe(data => {
   // console.log('success');
   
   
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


