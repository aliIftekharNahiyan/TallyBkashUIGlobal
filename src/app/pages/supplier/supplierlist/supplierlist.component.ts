import { Component, OnInit, ViewChild } from '@angular/core';
import { MyadvanceserviceService } from './myadvanceservice.service';
import { ApigenericService } from 'src/app/core/services/apigeneric.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableSupplierList } from './advanced.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator,PageEvent} from '@angular/material/paginator'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplierlist',
  templateUrl: './supplierlist.component.html',
  styleUrls: ['./supplierlist.component.scss'], 
})
export class SupplierlistComponent implements OnInit {

  displayedColumns: string[] = ['EntryDate','SupplierName', 'HisabStartAmount', 'MobileNumber', 'SupplierId','Status','Id'];
  definedColumns:any[]= [
    {name: 'SupplierName', bn: 'সাপ্লাইয়ারর নাম'},
    {name: 'HisabStartAmount', bn: 'হিসাব শুরুর টাকা'},
    {name: 'MobileNumber', bn: 'মোবাইল নাম্বার'},
    {name: 'Address', bn: 'ঠিকানা'},
    {name: 'SupplierId', bn: 'নং'} ,
    {name: 'EntryDate', bn: 'তারিখ'} ,
  
  ];

  dataSource:MatTableDataSource<TableSupplierList>;

  breadCrumbItems: Array<{}>;
  hideme: boolean[] = [];

  dataSources:any;

  @ViewChild(MatSort, { static: false }) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor( public myservice: MyadvanceserviceService, private router: Router,private apiservice:ApigenericService) { 

  }


  ngOnInit() {
    
  this.breadCrumbItems = [{ label: 'সাপ্লাইয়ার' }, { label: 'সকল সাপ্লাইয়ার তথ্য ', active: true }];

  this.dataSource = new MatTableDataSource(); 
  this.getTableData(); 
  
  

  }

  gotoEditPage(id){   
    this.router.navigate(['/supplier/supplier'], { queryParams: {id: btoa(id)}});
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

    titleText(supplierId:any) {
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
           
       this.apiservice.getData(this.apiservice.supplierStatusChange+"?status=-1&supplierId="+supplierId).subscribe(data => {
        
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
    this.apiservice.getData(this.apiservice.supplierList+"?userId="+id+"&status=1")
    .subscribe(dd => {
   //   console.log(dd.listOfSuppliers);
    
      this.dataSource.data = dd.listOfSuppliers;
      this.dataSource.sort= this.sort;
      this.dataSource.paginator=this.paginator;
  //   console.log(this.dataSource);
    },
      (error) => {
       
        return;
      })
  }
 

}
