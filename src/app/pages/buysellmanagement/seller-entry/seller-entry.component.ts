import { ChangeDetectorRef, Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ApigenericService } from '../../../core/services/apigeneric.service'
import { BuyerModelResults, RequestObject } from '../buyermodel';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{map,startWith}from 'rxjs/operators';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-seller-entry',
  templateUrl: './seller-entry.component.html',
  styleUrls: ['./seller-entry.component.scss']
})
export class SellerEntryComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions:Observable<BuyerModelResults[]>;

  editModel:string="";
  error = '';
  productForm: FormGroup;
  total: number = 0;
  baki: number = 0;
  nogod: number = 0;
  char: number = 0;
  businesslist: BuyerModelResults[];
  submitted: boolean = false;
  businessType: number = 0;
  btnName: string = ""
  btnNameAlert: string = "";
  previousBaki: string = "0";
  totalNew: number = 0;
  bakiNew: number = 0;
  nogodNew: number = 0;
  charNew: number = 0;
  previousBakiNew: number = 0;

  other: boolean = false;
  smsBalance: number = 0;
  sendSms: boolean = false;
  hasParam: boolean = false;
  requestdata: RequestObject = new RequestObject();
  paramsObject: any;
  requestId: number = 0;
  breadCrumbItems: Array<{}>;
  dates: any;
  shopName:any;
  shopNumber:any;
  shopAddress:any;
  modelHeader:any;
  ddn:any;
  supplierName:any;
  supplierMobileNumber:any;
  supplierAddress:any;
  listOfItems:any;
  ll:any;
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

    this.apiservice.getData(this.apiservice.buyerList + "?userId=" + id + "&status=1").subscribe(data => {
        this.businesslist = data.listOfBuyers;
        
        this.filteredOptions=this.myControl.valueChanges.pipe(
          startWith(''),
          map(value=> this._filter(value))
        );
      
      })

    

    let dd = new Date();   
    this.dates =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate());  
    //this.addQuantity();
    this.ddn=dd;
    this.modelHeader='বিক্রয় রশিদ';
    this.breadCrumbItems = [{ label: 'ক্রয়/বিক্রয়' }, { label: 'বিক্রয় এন্ট্রি', active: true }];
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
          this.apiservice.getData(this.apiservice.getModificationDataBuyerManagement + "?id=" + atob(this.paramsObject.params.id))
            .subscribe(data => {
              //console.log('dddd');

              let jsonObj: any = JSON.parse(JSON.stringify(data.result));
              this.requestdata = <RequestObject>jsonObj;
              //console.log(this.requestdata.EntryDate);

              this.total = parseFloat(this.requestdata.Total);
              this.baki = parseFloat(this.requestdata.Remain);
              this.nogod = parseFloat(this.requestdata.Cashed);
              this.char = parseFloat(this.requestdata.Discount);
              this.businessType = parseInt(this.requestdata.SupplierId);
              this.requestId = parseInt(this.requestdata.Id);
              this.dropDownValue(parseInt(this.requestdata.SupplierId));
              let a = this.businesslist.filter(
                book => book.Id.toString() === this.requestdata.SupplierId);
               // console.log(a);
                this.editModel=a[0].BuyerName;



              this.other = true;
              let dds = new Date(this.requestdata.EntryDate);   
              this.dates =  new NgbDate(dds.getFullYear(),dds.getMonth()+1,dds.getDate());  
              this.requestdata.Infos.forEach(element => {
                this.addQuantityModification(element.qty, element.price);
              });

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
    //console.log(subject);
   return subject? subject.name:undefined;
  }

  _filter(value:any):BuyerModelResults[]{
    return this.businesslist.filter(option => 
      option.BuyerName.toLowerCase().includes(value.toLowerCase())
      );
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

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  get f() { return this.productForm.controls; }


  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }

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
   // console.log(datas);
    let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;
    let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;


    let id = userId === 0 ? createdBy : userId;
    this.apiservice.getData(this.apiservice.getBuyerBakiTaka + "?supplierId=" + datas + "&userId=" + id).subscribe(data => {
      this.previousBaki = data.result;
    })

  }


  onSubmit() {

    this.submitted = true;
    if ((this.productForm.invalid)) {

      // this.businessType = 0;
      // this.error = "error";
      // this.other = false;
      // this.sendSms = false;
      this.error = "সকল পণ্যের নাম ও পরিমান দিন";
      this.errorMsg = "সকল পণ্যের নাম ও পরিমান দিন";
    
     this.other = false;
     this.sendSms = false;

      return;
    }else if( (this.businessType === 0)){
      this.error = "সকল পণ্যের নাম ও পরিমান দিন";
      this.errorMsg = "ক্রেতা দিন";
     // this.errorMsg += "yyyyyyy";
     this.other = false;
     this.sendSms = false;
     return;
    }

    this.titleText();




  }

  redirectSupplier(){
    this.router.navigate(['/buyer/buyer']);
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

    this.apiservice.getData(this.apiservice.buyerSingleInfo + '?buyerId='+this.businessType).subscribe(data => {
      this.supplierName=data.result.BuyerName + '-'+data.result.BuyerId;
      this.supplierAddress=data.result.Address;
      this.supplierMobileNumber=data.result.MobileNumber;
  },
    (error) => {

      return;
    }) 

this.listOfItems=this.productForm.value.quantities;
//console.log(this.listOfItems);
 let el: HTMLElement = this.cc.nativeElement;
 if(!this.hasParam){
  el.click();
 }
 



    if (!this.hasParam) {
      this.apiservice.postData(this.apiservice.setBuyerInfoManagement, this.requestdata).subscribe(data => {
        ;
      },
        (error) => {

          return;
        })
    }
    else {
      this.requestdata.Id = this.requestId.toString();
      this.apiservice.postData(this.apiservice.updateBuyerManagementData, this.requestdata).subscribe(data => {
        ;
      },
        (error) => {

          return;
        })

    }

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
