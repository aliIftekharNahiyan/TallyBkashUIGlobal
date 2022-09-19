import { Component, OnInit, ViewChild } from '@angular/core';

import { ApigenericService } from 'src/app/core/services/apigeneric.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableBuyerList } from './advancedmodel';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator'
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal,NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-buyer-raw-info-details',
  templateUrl: './buyer-raw-info-details.component.html',
  styleUrls: ['./buyer-raw-info-details.component.scss']
})
export class BuyerRawInfoDetailsComponent implements OnInit {
  displayedColumns: string[] = ['EntryDate','Type', 'Total','Discount','Cashed','Remain','Given','Balance'];
  definedColumns:any[]= [
    // {name: 'BuyerName', bn: 'ক্রেতার নাম'},   
    // {name: 'MobileNumber', bn: 'মোবাইল নাম্বার'},
    // {name: 'Address', bn: 'ঠিকানা'},   
    {name: 'EntryDate', bn: 'তারিখ'} ,
    {name: 'Total', bn: 'সর্বমোট '} ,
    {name: 'Discount', bn: 'ছাড়'} ,
    {name: 'Cashed', bn: 'নগদ '} ,
    {name: 'Remain', bn: 'বাকি'} ,
    {name: 'Given', bn: 'বাকি গ্রহণ'} ,
    {name: 'Balance', bn: 'ব্যালেন্স'} ,
    {name: 'Type', bn: 'লেনদেনের ধরণ '} ,
  
  ];

  dataSource:MatTableDataSource<TableBuyerList>;

  breadCrumbItems: Array<{}>;
  hideme: boolean[] = [];
  paramsObject: any;
  dataSources:any;
  otherpartyId:any;

  sn:any='';
  hsa:any='';
  hsd:any='';
  pb:any='';
  datestart:any;
  dateend:any;







  @ViewChild(MatSort, { static: false }) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private router: Router,private apiservice:ApigenericService,private modalService: NgbModal ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'ক্রয়/বিক্রয়' }, { label: 'সকল ক্রয় তথ্য ', active: true }];
    let dd = new Date(); 
    var d = new Date();
    d.setDate(d.getDate()-7);
   // console.log('daaa'+d);
    this.datestart =  new NgbDate(d.getFullYear(),d.getMonth()+1,d.getDate());    
    this.dateend =  new NgbDate(dd.getFullYear(),dd.getMonth()+1,dd.getDate()); 
   this.loadValues();
  }

  loadValues(){
     




    this.route.queryParamMap
      .subscribe((params) => {
        this.paramsObject = { ...params.keys, ...params };
        if (this.paramsObject.params.id !== undefined) {
         this.otherpartyId=atob(this.paramsObject.params.id);    
     
        }

      }
      );

    this.dataSource = new MatTableDataSource(); 
    this.getTableData(); 
  }
  transform(value: string): string {
    return value.replace(/\n/g, '<br/>');
 }
  
  gotoEditPage(id){   
    this.router.navigate(['/buySellManagement/buyerEntry'], { queryParams: {id: btoa(id)}});
  }


  applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  Editdelete(data:any,type:number){    
    if(type===-1){
        this.titleText(data);
    }else{
       this.gotoEditPage(data); 

    }
  }





  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }


    titleText(buyerId:any) {
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
           
        this.apiservice.getData(this.apiservice.deleteSupplierInfo+"?status=-1&id="+buyerId).subscribe(data => {
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ডিলিট হয়েছে ',
          showConfirmButton: false,
          timer: 1500
        }).then();

        this.getTableData(); 
       
      },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'ডিলিট হয়নি  ',
            showConfirmButton: false,
            timer: 1500
          }).then();
        });

       

        
       
      }
    });
  }
  getTableData() {
   
    let userId = JSON.parse(sessionStorage.getItem('userInfo')).result.MainUserId;     
    let createdBy = JSON.parse(sessionStorage.getItem('userInfo')).result.Id;    

    let id = userId===0?createdBy:userId;
   // console.log(this.datestart.year);
   // console.log(this.dateend);
var request =

{
  userId:id,
  supplierId:this.otherpartyId,
   sdate:this.datestart.year+'-'+this.datestart.month+'-'+this.datestart.day,
   edate:this.dateend.year+'-'+this.dateend.month+'-'+this.dateend.day
  // edate:this.dateend
  //EntryDate:this.f.date.value.year+'-'+this.f.date.value.month+'-'+this.f.date.value.day
}
//console.log(request);
// this.apiservice.getData(this.apiservice.getSupplierActivityList+"?userId="+id+"&supplierId="+this.otherpartyId)
this.apiservice.postData(this.apiservice.getBuyerActivityList,request)
    .subscribe(dd => {
      //console.log(dd.result);
      this.sn=dd.info.sn;
      this.hsa=dd.info.hsa;
      this.hsd=dd.info.hsd;
      this.pb=dd.info.pb;
      this.dataSource.data = dd.result;
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
     //console.log(this.dataSource);
    },
      (error) => {
       
        return;
      })
  }

}