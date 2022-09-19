import { Component, OnInit, ViewChild } from '@angular/core';
import { ApigenericService } from 'src/app/core/services/apigeneric.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableBuyerList } from '../buyerlist/advancedmodel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buyerdeletedlist',
  templateUrl: './buyerdeletedlist.component.html',
  styleUrls: ['./buyerdeletedlist.component.scss']
})
export class BuyerdeletedlistComponent implements OnInit {
  displayedColumns: string[] = ['EntryDate', 'BuyerName', 'HisabStartAmount', 'MobileNumber', 'BuyerId', 'Status', 'Id'];
  definedColumns: any[] = [
    { name: 'BuyerName', bn: 'ক্রেতার নাম' },
    { name: 'HisabStartAmount', bn: 'হিসাব শুরুর টাকা' },
    { name: 'MobileNumber', bn: 'মোবাইল নাম্বার' },
    { name: 'Address', bn: 'ঠিকানা' },
    { name: 'BuyerId', bn: 'নং' },
    { name: 'EntryDate', bn: 'তারিখ' },

  ];

  dataSource: MatTableDataSource<TableBuyerList>;

  breadCrumbItems: Array<{}>;
  hideme: boolean[] = [];

  dataSources: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private router: Router, private apiservice: ApigenericService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'ক্রেতা' }, { label: 'তথ্য রিস্টোর করুন ', active: true }];

    this.dataSource = new MatTableDataSource();
    this.getTableData();

  }

  
  gotoEditPage(id) {
    this.router.navigate(['/buyer/buyer'], { queryParams: { id: btoa(id) } });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Editdelete(data: any, type: number) {

    if (type === -1) {
      this.titleText(data);
    } else {
      this.gotoEditPage(data);

    }

  }

  titleText(buyerId: any) {
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

        this.apiservice.getData(this.apiservice.buyerStatusChange + "?status=1&buyerId=" + buyerId).subscribe(data => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'রিস্টোর  হয়েছে ',
            showConfirmButton: false,
            timer: 1500
          }).then();

          this.getTableData();

        },
          (error) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'রিস্টোর  হয়নি  ',
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

    let id = userId === 0 ? createdBy : userId;
    this.apiservice.getData(this.apiservice.buyerList + "?userId=" + id + "&status=-1")
      .subscribe(dd => {
       // console.log(dd.listOfBuyers);

        this.dataSource.data = dd.listOfBuyers;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       // console.log(this.dataSource);
      },
        (error) => {

          return;
        })
  }


}
