import { Component, OnInit } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';
import { FormBuilder, Validators,  FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import Swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';
import{WorkerModel}from'./workerModel'
import { from } from 'rxjs';


@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; 
  
  submitted = false;
  typesubmit=false;
  kormochariName:string;
  nid:string=''; 
  mobileNumber:string;
  address:string=''; 
  imgURL: any;
  requestId: number = 0;
  btnName: string = "সংরক্ষণ করুন";
  btnNameAlert: string = "সংরক্ষণ";

  userId:number;
  subuserId:number;
  createdBy:number;
  paramsObject: any;
  hasParam: boolean = false;
  workerModel:WorkerModel;
  active: boolean = false;
  constructor(public formBuilder: FormBuilder,private apiservice: ApigenericService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.imgURL='http://103.138.169.250/tallyapi/Assests/WorkerImages/demo-user.jpg';

    this.typeValidationForm = this.formBuilder.group({
      kormochariName: ['', Validators.required],
      nid: [''],    
      mobileNumber: ['', Validators.required],     
      address: [''], 
      file: new FormControl(''),
      fileSource: new FormControl(''),
      active:['']
    });





    this.route.queryParamMap
    .subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      if (this.paramsObject.params.id !== undefined) {
        this.hasParam = true;
        this.btnName = "সংশোধন করুন";        
        this.apiservice.getData(this.apiservice.workerListInfo + "?id=" + atob(this.paramsObject.params.id))
          .subscribe(data => {
            let jsonObj: any = JSON.parse(JSON.stringify(data));
            this.workerModel = <WorkerModel>jsonObj;
   
            this.requestId = this.workerModel.result.Id;
            this.kormochariName = this.workerModel.result.WorkerName;            
            this.address = this.workerModel.result.Address;
            this.mobileNumber = this.workerModel.result.WorkerMobile;
            this.nid = this.workerModel.result.Nid.toString();    
            this.imgURL=this.workerModel.result.Picture.toString();
            this.active=this.workerModel.result.Active.toString()==='1'?true:false;        
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
  get f() { return this.typeValidationForm.controls; }


  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.typeValidationForm.patchValue({
        fileSource: file
      });

      var reader = new FileReader();
    this.imgURL = event.target.files;
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  }
  onAllList(){
    this.router.navigate(['/cost-management/WorkerDetails']);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onSubmit() {
    this.submitted = true;

    if (this.typeValidationForm.invalid) {    
     // console.log('invalid'); 
      return;
    }
    this.submitted = false; 
    this.titleText();
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
        this.imgURL='http://103.138.169.250/tallyapi/Assests/WorkerImages/demo-user.jpg';
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





  postRequest(){
    this.userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;     
    this.createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;    
    //console.log(this.f.active.value);
    //return;
    // var datamodel={
    //   Id:this.hasParam ? this.buyerModel.result.Id : 0,
    //   BuyerName:this.f.buyerName.value,
    //   HisabStartAmount:this.f.hisabStartAmount.value,
    //   MobileNumber:this.f.mobileNumber.value,
    //   Address:this.f.address.value,
    //   UserId:this.userId===0?this.createdBy:this.userId,
    //   SubUserId:this.userId === 0 ? 0 :this.userId ,
    //   CreatedBy:this.createdBy,
    //   Status:1,
    //   EntryDate:this.f.date.value.year+'-'+this.f.date.value.month+'-'+this.f.date.value.day
     
    // }
  
    var formData: any = new FormData();
    formData.append("Nid", this.f.nid.value);
    formData.append("Status", '1');
    formData.append("WorkerName", this.f.kormochariName.value);
    formData.append("WorkerMobile", this.f.mobileNumber.value);
    formData.append("Active", this.f.active.value)
    formData.append("UserId", this.userId===0?this.createdBy:this.userId);
    formData.append("SubUserId", this.userId === 0 ? 0 :this.userId);
    formData.append("CreatedBy", this.createdBy);
    formData.append("Address", this.f.address.value);
    formData.append("file", this.typeValidationForm.get('fileSource').value);

     if (this.hasParam){      
       formData.append("Id",this.requestId.toString());
       
     }
    this.apiservice.postData(this.apiservice.workerModification, formData)
    .subscribe(data => {
     // console.log('success');
     
     
    },
      (error) => {
        //this.error = error ? "মোবাইল নম্বরটি পূর্বে ব্যবহার হচ্ছে। " : '';
        return;
      })
  }











}
