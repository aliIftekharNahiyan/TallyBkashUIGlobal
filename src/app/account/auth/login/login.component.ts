import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { UserProfileService } from '../../../core/services/user.service';
import { ApigenericService } from 'src/app/core/services/apigeneric.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDB } from '../../../core/models/auth.models';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  date:any = new Date();
  // set the currenr year
  year: number = new Date().getFullYear();
  paramsObject: any;
  url:any;
  flag:boolean=false;
  spin:boolean=false;
  raw:boolean=true;
  
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public authenticationService: AuthenticationService, public authFackservice: AuthfakeauthenticationService,private apiservice:ApigenericService) 
  
  {

   }

  ngOnInit() {




    this.apiservice.getData(this.apiservice.AccessLog+"?gm=initial").subscribe(data => {
     // console.log('log written');
  },
   (error) => {
    this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
    return;       
 })

  //  this.apiservice.getData('http://ipinfo.io')
     
  //           .subscribe(data=>{       
           
  //            console.log(data);
  //           },
  //           (error) => {
  //              this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
  //              return;       
  //           })

    this.route.queryParamMap
    .subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };


    }
    );



















    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      email: [''],
      //password: ['01622595292', [Validators.required]],
      password: [''],
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

reg(){
  this.router.navigate(['/account/signup']);
}



 /**
   * Form submit
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } 
    else {

      var dataModel ={
        MobileNumber:this.f.email.value,
        Password:this.f.password.value
      }

      this.apiservice.getData(this.apiservice.AccessLog+"?gm="+dataModel.MobileNumber).subscribe(data => {
     //   console.log('log written');
    },
     (error) => {
     // this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
     // return;       
   })


   
      // this.url= this.apiservice.loginApiCheck.toString().replace('cid001',dataModel.MobileNumber.toString());

       this.url=this.apiservice.loginApi
    if(dataModel.MobileNumber.toString()==='01622595292'){

      this.flag=true;
      this.spin=true;
      this.raw=false;
      this.apiservice.postData(this.apiservice.loginApi,dataModel)
     
      .subscribe(data=>{       
     
        if(!sessionStorage.getItem('userInfo')){
          sessionStorage.setItem('userInfo', JSON.stringify(data));                  
        }
        this.router.navigate(['/']);
      },
      (error) => {
        this.spin=false;
         this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
         return;       
      })


    }

    //  else if(dataModel.MobileNumber.toString().startsWith('019')|| dataModel.MobileNumber.toString().startsWith('014')||dataModel.MobileNumber.toString().startsWith('016')|| dataModel.MobileNumber.toString().startsWith('018')|| dataModel.MobileNumber.toString().startsWith('017')|| dataModel.MobileNumber.toString().startsWith('013'))
     else{
       this.spin=true;
       this.raw=false;  
       
       
       this.apiservice.postData(this.apiservice.loginApi,dataModel)
     
       .subscribe(data=>{       
      
         if(!sessionStorage.getItem('userInfo')){
           sessionStorage.setItem('userInfo', JSON.stringify(data));                  
         }
         this.router.navigate(['/']);
       },
       (error) => {
         this.spin=false;
         this.raw=true;  
          this.error = error ? "Mobile Number/Password is incorrect or please register" : '';
          return;       
       })
        return;




     }
    //  else{
    //   console.log('out');
    //   if(!this.flag){
    //    this.router.navigate(['/account/signup']);
 
    //   }

    //  }
     
      
     


    }
  }

}
