import { ChangeDetectorRef, Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ApigenericService } from '../../../core/services/apigeneric.service'
import { BuyerModelResults, RequestObject } from '../buyermodel';
import Swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';
import{map,startWith}from 'rxjs/operators';
import {Observable} from 'rxjs';



import { NgbDate, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierModelResult } from '../../supplier/supplierModel';
@Component({
  selector: 'app-buyer-entry',
  templateUrl: './buyer-entry.component.html',
  styleUrls: ['./buyer-entry.component.scss']
})


export class BuyerEntryComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions:Observable<SupplierModelResult[]>;

  business:string;
  error = '';
  productForm: FormGroup;
  total: number = 0;
  baki: number = 0;
  nogod: number = 0;
  char: number = 0;
  previousBaki: string = "0";
  totalNew: number = 0;
  bakiNew: number = 0;
  nogodNew: number = 0;
  charNew: number = 0;
  previousBakiNew: number = 0;

  requestId: number = 0;
  businesslist:  SupplierModelResult[];
  submitted: boolean = false;
  businessType: number = 0;
  btnName: string = ""
  btnNameAlert: string = "";

  other: boolean = false;
  smsBalance: number = 0;
  sendSms: boolean = false;
  hasParam: boolean = false;
  requestdata: RequestObject = new RequestObject();
  paramsObject: any;
  breadCrumbItems: Array<{}>;
  dates: any;
  modelHeader:any;
  shopName:any;
  shopNumber:any;
  shopAddress:any;
  ddn:any;
  supplierName:any;
  supplierMobileNumber:any;
  supplierAddress:any;
  listOfItems:any;
  editModel:string="";
  errorMsg:string="";

  constructor(private fb: FormBuilder, private apiservice: ApigenericService, private router: Router, private cdRef: ChangeDetectorRef, private route: ActivatedRoute,private modalService: NgbModal) {


    this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]),
    });


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
    
    let dd = new Date();   
    this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
    this.modelHeader='ক্রয়ের রশিদ';
   // this.supplierName='ক্রয়ের রশিদ';


    // this.apiservice.getData(this.apiservice.signupUpdate + '?id='+'1001').subscribe(data => {
    //     this.shopName=data.result.Name;
    //     this.shopNumber=data.result.MobileNumber;
    //     this.shopAddress=data.result.ShopAddress;
    // },
    //   (error) => {

    //     return;
    //   })

    // this.apiservice.getData(this.apiservice.supplierSingleInfo + '?supplierId='+'20009').subscribe(data => {
    //     this.supplierName=data.result.SupplierName + '-'+data.result.SupplierId;
    //     this.supplierAddress=data.result.Address;
    //     this.supplierMobileNumber=data.result.MobileNumber;
    // },
    //   (error) => {

    //     return;
    //   }) 




    this.ddn=dd;
    //  
    this.breadCrumbItems = [{ label: 'ক্রয়/বিক্রয়' }, { label: 'ক্রয় এন্ট্রি', active: true }];
    this.productForm.valueChanges.subscribe(value => {

      let d = value.quantities.reduce((acc, cur) => acc + Number(cur.price), 0)
      this.total = d;
      this.baki = d - this.nogod - this.char;

    })



    this.route.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };
        if (this.paramsObject.params.id !== undefined) {
          this.hasParam = true;
          this.btnName = "সংশোধন করুন";
          this.apiservice.getData(this.apiservice.getModificationDataSupplierManagement + "?id=" + atob(this.paramsObject.params.id))
            .subscribe(data => {
             // console.log('dddd');

              let jsonObj: any = JSON.parse(JSON.stringify(data.result));
              this.requestdata = <RequestObject>jsonObj;
             // console.log(this.requestdata);

              this.total = parseFloat(this.requestdata.Total);
              this.baki = parseFloat(this.requestdata.Remain);
              this.nogod = parseFloat(this.requestdata.Cashed);
              this.char = parseFloat(this.requestdata.Discount);
              this.businessType = parseInt(this.requestdata.SupplierId);
            //  this.setVariable(parseInt(this.requestdata.SupplierId));
            let a = this.businesslist.filter(
              book => book.Id.toString() === this.requestdata.SupplierId);
              //console.log(a);
              this.editModel=a[0].SupplierName;
             // console.log(this.businessType);
              this.requestId = parseInt(this.requestdata.Id);
              this.dropDownValue(parseInt(this.requestdata.SupplierId));
              this.other = true;
              this.requestdata.Infos.forEach(element => {
                this.addQuantityModification(element.qty, element.price);
              });


              //  this.fb.group({
              //   qty: ['', Validators.required],
              //   price: ['0', Validators.required],
              // })


              this.btnName = "সংশোধন করুন";
              this.btnNameAlert = "সংশোধন";
            },
              (error) => {

                return;
              })
        }

      }
      );
    if (!this.hasParam) {
      this.addQuantity();
    }
   }



   setVariable(id){
   // console.log(id);


    if ((this.productForm.invalid) || (id === "0")) {
      this.businessType = 0;
      this.error = "error";
      this.other = false;
      this.sendSms = false;
      return;
    }
    else {
      this.other = true;
      this.error = "";
      this.businessType =id;
      this.dropDownValue(id);


    }
    

  }

  // displayFn(subject){
  //   return subject? subject.name:undefined;
  // }

  displayFn (subject) { 
   // console.log(subject);
   return subject? subject.name:undefined;
  }

  _filter(value:any):SupplierModelResult[]{
    return this.businesslist.filter(option => 
      option.SupplierName.toLowerCase().includes(value.toLowerCase())
      );
  }




  
  test() {

    this.baki = this.total - this.nogod - this.char;
  }
  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      qty: ['', Validators.required],
      price: ['0', Validators.required],
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
  newQuantityModification(q, p): FormGroup {
    return this.fb.group({
      qty: [q, Validators.required],
      price: [p, Validators.required],
    })
  }
  addQuantityModification(q, p) {
    this.quantities().push(this.newQuantityModification(q, p));
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  get f() { return this.productForm.controls; }


  onChange(newValue) {

    this.cdRef.detectChanges();
    if ((this.productForm.invalid) || (newValue === "0")) {
      this.businessType = 0;
      this.error = "error";
      this.other = false;
      this.sendSms = false;
      return;
    }
    else {
      this.other = true;
      this.error = "";
      this.dropDownValue(newValue);

    }

  }
  dropDownValue(datas: any) {
    let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
    let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;


    let id = userId === 0 ? createdBy : userId;
    this.apiservice.getData(this.apiservice.getSupplierBakiTaka + "?supplierId=" + datas + "&userId=" + id).subscribe(data => {
      this.previousBaki = data.result;
    })

  }


  onSubmit() {

    this.submitted = true;
    if ((this.productForm.invalid)) {

      //this.businessType = 0;
      this.error = "সকল পণ্যের নাম ও পরিমান দিন";
       this.errorMsg = "সকল পণ্যের নাম ও পরিমান দিন";
      // this.errorMsg += "yyyyyyy";
      this.other = false;
      this.sendSms = false;

      // console.log(Array(this.productForm.value.quantities).length);//
      // console.log(Array(this.productForm.value.quantities).length);//
      // console.log(this.productForm.value.quantities.length);//
      // // if(this.productForm.value.quantities.length==1 && this.productForm.value.quantities[0].qty ==''){
      // //   this.errorMsg += "zzzzzzzzzzzzzzzz";
      // }
      // console.log(this.productForm.value.quantities)
      // this.productForm.value.quantities.forEach(function(value){
      //   // if(value.qty == '' ){
      //   //   this.errorMsg = "সকল পণ্যের নাম ও পরিমান দিন";         
      //   // }
      //   console.log(value)
      // });
      console.log(this.businessType);
      return;
    }else if( (this.businessType === 0)){
      this.error = "সকল পণ্যের নাম ও পরিমান দিন";
      this.errorMsg = "সাপ্লাইয়ার দিন";
     // this.errorMsg += "yyyyyyy";
     this.other = false;
     this.sendSms = false;
     return;
    }

    this.titleText();




  }

  redirectSupplier(){
    this.router.navigate(['/supplier/supplier']);
  }
  postRequest() {


    let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
    let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;


    let id = userId === 0 ? createdBy : userId;
    let subUserId = userId === 0 ? "0" : createdBy.toString();

    this.requestdata.UserId = id;
    this.requestdata.SubUserId = subUserId;
    this.requestdata.SupplierId = this.businessType.toString();
    this.requestdata.Total = this.total.toString();
    this.requestdata.Discount = this.char.toString();
    this.requestdata.Cashed = this.nogod.toString();
    this.requestdata.Remain = this.baki.toString();
    this.requestdata.Infos = this.productForm.value.quantities;
    this.requestdata.EntryDate = this.dates.year + '-' + this.dates.month + '-' + this.dates.day;



    this.apiservice.getData(this.apiservice.signupUpdate + '?id='+this.requestdata.UserId).subscribe(data => {
        this.shopName=data.result.ShopName;
        this.shopNumber=data.result.MobileNumber;
        this.shopAddress=data.result.ShopAddress;
    },
      (error) => {

        return;
      })

      this.apiservice.getData(this.apiservice.supplierSingleInfo + '?supplierId='+this.businessType).subscribe(data => {
        this.supplierName=data.result.SupplierName + '-'+data.result.SupplierId;
        this.supplierAddress=data.result.Address;
        this.supplierMobileNumber=data.result.MobileNumber;
    },
      (error) => {

        return;
      }) 

  this.listOfItems=this.productForm.value.quantities;
 // console.log(this.listOfItems);
   let el: HTMLElement = this.cc.nativeElement;
   if(!this.hasParam){
    el.click();
   }
   

    if (!this.hasParam) {
      this.apiservice.postData(this.apiservice.setSupplierInfoManagement, this.requestdata).subscribe(data => {
        ;
      },
        (error) => {

          return;
        })
    }
    else {
      this.requestdata.Id = this.requestId.toString();
     // console.log(this.requestdata.Id);
      // return;
      this.apiservice.postData(this.apiservice.updateSupplierManagementData, this.requestdata).subscribe(data => {

      },
        (error) => {

          return;
        })


    }



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
      cancelButtonText: 'না'
    }).then(result => {
      if (result.value) {

        this.postRequest();
        this.totalNew=this.total;
        this.bakiNew=this.baki;
        this.charNew=this.char;
        this.nogodNew=this.nogod;
        this.previousBakiNew=+this.previousBaki;
       // return;
        this.productForm.reset();
        let clearFormValues = this.productForm.get("quantities") as FormArray;
        clearFormValues.clear();
        this.addQuantity();

        this.total = 0;
        this.baki = 0;
        this.nogod = 0;
        this.char = 0;
        this.other = false;
        this.businessType = 0;
        this.hasParam = false;
      if(this.btnName = "সংশোধন করুন"){
        this.btnName = "সংরক্ষণ করুন";
        this.btnNameAlert = "সংরক্ষণ";
      }else{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: this.btnNameAlert,
          showConfirmButton: false,
          timer: 1500
        }).then();
        this.btnName = "সংরক্ষণ করুন";
        this.btnNameAlert = "সংরক্ষণ";
      }
       


      }
    });
  }


}
