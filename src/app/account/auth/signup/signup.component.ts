import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { UserProfileService } from '../../../core/services/user.service';
import { ApigenericService } from '../../../core/services/apigeneric.service'
import { SignUpdata, Result } from 'src/app/core/models/auth.models';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  drop = '';
  successmsg = false;
  businesslist: any = [];
  updateData: any;

  shopName: string;
  shopAddress: string;
  password: string;
  mobileNumber: string;
  businessType: number=0;
  btnName: string = "সংরক্ষণ করুন";
  ownerName:string;
url:any;
  // set the currenr year
  year: number = new Date().getFullYear();
  paramsObject: any;
  hasParam: boolean = false;
  signUp: SignUpdata;
  title: string = "একাউন্ট তৈরি করুন";
  clicked:boolean=false;
 // year: number = new Date().getFullYear();
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService, private apiservice: ApigenericService) {

    apiservice.getData(this.apiservice.signupBusinessType).subscribe(data => {
      this.businesslist = data.result;
    })


  }

  ngOnInit() {

    this.route.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };

        if (this.paramsObject.params.mobile === undefined) {
          //this.router.navigate(['/account/login']);
          //  window.location.href="http://api.talymanager.com/default/index";
         // return;  
        }





        if (this.paramsObject.params.id !== undefined) {
          this.hasParam = true;
          this.btnName = "সংশোধন করুন";

          this.apiservice.getData(this.apiservice.signupUpdate + "?id=" + atob(this.paramsObject.params.id))
            .subscribe(data => {
              let jsonObj: any = JSON.parse(JSON.stringify(data));
              this.signUp = <SignUpdata>jsonObj;
              this.shopName = this.signUp.result.ShopName;
              this.shopAddress = this.signUp.result.ShopAddress;
              this.password = this.signUp.result.Password;
              this.mobileNumber = this.signUp.result.MobileNumber;
              this.businessType = this.signUp.result.BusinessTypeId;
              this.ownerName=this.signUp.result.Name;
              this.title = "একাউন্ট সংশোধন করুন";
            },
              (error) => {

                return;
              })
        }else{
          this.ownerName="";
          this.shopAddress = "";
        }





      }
      );

    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.signupForm = this.formBuilder.group({
      shopName: ['', Validators.required],
      // shopAddress: ['', Validators.required],
      shopAddress: [''],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      businessType: [''],
      // ownerName: ['', Validators.required],
      ownerName: [''],

    });

    // this.signupForm.controls['businessType'].setValue(this.businesslist[1], {onlySelf: true});
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.signupForm.invalid) {

      this.drop = "Sdas";
      return;
    } else {
     
      this.clicked = true;
     

      var dataModel = {
        ShopName: this.f.shopName.value,
        ShopAddress: this.f.shopAddress.value,
        // BusinessTypeId: this.f.businessType.value,
        BusinessTypeId: 5,

        Password: this.f.password.value,
        MobileNumber: this.f.mobileNumber.value,
        IsSubUser: 0,
        CreatedBy: this.f.mobileNumber.value,
        Status: 1,
        MainUserId: 0,
        Name: this.f.ownerName.value,
        Email: "",
        Id: this.hasParam ? this.signUp.result.Id : 0

      }

      this.apiservice.postData(this.apiservice.signupApi, dataModel)
        .subscribe(data => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'একাউন্ট তৈরি হয়েছে ',
            showConfirmButton: false,
            timer: 1500
          }).then();
          this.router.navigate(['/account/login']);




         this.url= this.apiservice.loginApiCheck.toString().replace('cid001',dataModel.MobileNumber.toString());

if(dataModel.MobileNumber.toString().startsWith('019')|| dataModel.MobileNumber.toString().startsWith('014')||dataModel.MobileNumber.toString().startsWith('016')|| dataModel.MobileNumber.toString().startsWith('018')|| dataModel.MobileNumber.toString().startsWith('017')|| dataModel.MobileNumber.toString().startsWith('013'))
     {
       
      // console.log(this.url);
      // return;
      this.apiservice.getData(this.url)
     
      .subscribe(data=>{       
      
        if(data.SubscriptionStatus==='New' || data.SubscriptionStatus==='Inactive'){

          this.apiservice.getData(this.apiservice.GetUserInfoByNumber + "?mobilenumber=" + dataModel.MobileNumber).subscribe(datas => {
          
            this.apiservice.loginApiBkash=this.apiservice.loginApiBkash.toString().replace('cid001',dataModel.MobileNumber.toString());
             this.apiservice.getData(this.apiservice.loginApiBkash).subscribe(databkash => {             

              window.location.href=databkash.redirectURL;
              return false;
              
          },
          (error) => {
             this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
             return;       
          })
        },
        (error) => {
         
          this.router.navigate(['/account/login']);
           return;       
        })
          
        }
        else{

          //updateStatus

          this.apiservice.getData(this.apiservice.updateStatus + "?mobilenumber=" + dataModel.MobileNumber).subscribe(data => {
           // console.log('data');
           // console.log(data);
            if(data.result ===null){
              this.router.navigate(['/account/login']);
            }
            this.apiservice.postData(this.apiservice.loginApi,dataModel)
     
            .subscribe(data=>{       
           
              this.router.navigate(['/account/login']);
            },
            (error) => {
               this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
               return;       
            })
            
        })
        }

       

      },
      (error) => {
         this.error = error ? "Something went wrong" : '';
         return;       
      })


     }












        },
          (error) => {

               this.error = error ? "মোবাইল নম্বরটি পূর্বে ব্যবহার হচ্ছে। " : '';
              return;
            this.url= this.apiservice.loginApiCheck.toString().replace('cid001',dataModel.MobileNumber.toString());
    this.apiservice.getData(this.url)
     
      .subscribe(data=>{       
     
        if(data.SubscriptionStatus==='New'|| data.SubscriptionStatus==='InActive'){

          this.apiservice.getData(this.apiservice.GetUserInfoByNumber + "?mobilenumber=" + dataModel.MobileNumber).subscribe(datas => {
           
            this.apiservice.loginApiBkash=this.apiservice.loginApiBkash.toString().replace('cid001',dataModel.MobileNumber.toString());
            this.apiservice.getData(this.apiservice.loginApiBkash).subscribe(databkash => {             

             window.location.href=databkash.redirectURL;
             return false;
             
         },
         (error) => {
            this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
            return;       
         })
            
        },
        (error) => {
          this.router.navigate(['/account/login']);
           return;       
        })
          // window.location.href=data.RegistrationURL;
          // return false;
        }
        else if(data.SubscriptionStatus==='Active'){

          this.router.navigate(['/account/login']);
          return;       
        }
        else{

          //updateStatus

          this.apiservice.getData(this.apiservice.updateStatus + "?mobilenumber=" + dataModel.MobileNumber).subscribe(data => {
         //   console.log(data);

            this.apiservice.postData(this.apiservice.loginApi,dataModel)
     
            .subscribe(data=>{       
           
              if(!sessionStorage.getItem('userInfo')){
                sessionStorage.setItem('userInfo', JSON.stringify(data));                  
              }
              this.router.navigate(['/']);
            },
            (error) => {
               this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
               return;       
            })
        })
        }

       

      },
      (error) => {
         this.error = error ? "Something went wrong" : '';
         return;       
      })
                  // this.error = error ? "মোবাইল নম্বরটি পূর্বে ব্যবহার হচ্ছে। " : '';
            return;
          })
    }
  }
}
