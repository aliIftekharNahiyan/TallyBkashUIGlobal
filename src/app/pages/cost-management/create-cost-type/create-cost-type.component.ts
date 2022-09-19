import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import bsCustomFileInput from 'bs-custom-file-input';
import { FormBuilder, Validators,  FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import Swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';

import { from } from 'rxjs';


@Component({
  selector: 'app-create-cost-type',
  templateUrl: './create-cost-type.component.html',
  styleUrls: ['./create-cost-type.component.scss']
})
export class CreateCostTypeComponent implements OnInit {
 breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup;  
  submitted = false;
  buyerName:string;
  businessType:string="1";
  
  btnName: string = "সংরক্ষণ করুন";
  btnNameAlert: string = "সংরক্ষণ";
  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;  
  hidden: boolean;
 selected: any;
 hasParam:boolean=false;
  model: NgbDateStruct;
  date: { year: number, month: number };

  @Input() fromDate: Date;
  @Input() toDate: Date; 
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  constructor(public formBuilder: FormBuilder,private apiservice: ApigenericService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {


    this.typeValidationForm = this.formBuilder.group({
      buyerName: ['', Validators.required],
    
    });

  } 


get f() { return this.typeValidationForm.controls; }
onSubmit(){
  this.submitted=true;
   if (this.typeValidationForm.invalid) {    
      console.log('invalid'); 
      return;
    }
    this.submitted=false;
  this.titleText();
  } 

    postRequest(){
      let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;     
      let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;    
    
      var datamodel={       
        SpentName:this.f.buyerName.value,      
        Status:this.businessType,
       
       
      }
    
    
      this.apiservice.postData(this.apiservice.createSpentMedium, datamodel)
      .subscribe(data => {
        console.log('success');
       
       
      },
        (error) => {
          //this.error = error ? "মোবাইল নম্বরটি পূর্বে ব্যবহার হচ্ছে। " : '';
          return;
        })
    }


    onAllList(){
     // this.router.navigate(['/cost-management/WorkerDetails']);
     alert('under development')
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

