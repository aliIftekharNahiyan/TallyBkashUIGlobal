import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigenericService } from 'src/app/core/services/apigeneric.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableBuyerList } from './advancedmodel';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-raw-info',
  templateUrl: './buyer-raw-info.component.html',
  styleUrls: ['./buyer-raw-info.component.scss']
})
export class BuyerRawInfoComponent implements OnInit {
  displayedColumns: string[] = ['BuyerName','RemainBaki','Status'];
  definedColumns:any[]= [
    //  {name: 'BuyerName', bn: 'সর্বরোহকারী  তথ্য'},   
    // {name: 'MobileNumber', bn: 'মোবাইল নাম্বার'},
    // {name: 'Address', bn: 'ঠিকানা'},   
 
    {name: 'RemainBaki', bn: 'সর্বমোট বাকি'} ,
  
  ];

  dataSource:MatTableDataSource<TableBuyerList>;

  breadCrumbItems: Array<{}>;
  hideme: boolean[] = [];

  dataSources:any;

  @ViewChild(MatSort, { static: false }) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private router: Router,private apiservice:ApigenericService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'ক্রয়/বিক্রয়' }, { label: 'সকল ক্রয় তথ্য ', active: true }];

    this.dataSource = new MatTableDataSource(); 
    this.getTableData(); 

  }
  gotoEditPage(id){   
    this.router.navigate(['/buySellManagement/BuyerRawInfoDetails'], { queryParams: {id: btoa(id)}});
  }


  applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
  Editdelete(data:any,type:number){    
    if(type===-1){
        this.titleText(data);
    }else{
       this.gotoEditPage(type); 

    }
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
    this.apiservice.getData(this.apiservice.buyerrawinfo+"?userId="+id)
    .subscribe(dd => {
     // console.log(dd.result);
    
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
