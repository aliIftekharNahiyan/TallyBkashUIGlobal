import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'

import{MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule } from '@angular/material/input'

import {MatSortModule} from '@angular/material/sort'
import {MatPaginatorModule} from '@angular/material/paginator';


import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BuysellmanagementRoutingModule } from './buysellmanagement-routing.module';
import { BuyerEntryComponent } from './buyer-entry/buyer-entry.component';
import { SellerEntryComponent } from './seller-entry/seller-entry.component';
import { SellerEntryListComponent } from './seller-entry-list/seller-entry-list.component';
import { BuyerEntryListComponent } from './buyer-entry-list/buyer-entry-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {ReplaceLineBreaks} from './newBreakClass';
import { BuyerDueCollectionComponent } from './buyer-due-collection/buyer-due-collection.component';
import { SupplierDuePaymentComponent } from './supplier-due-payment/supplier-due-payment.component';
import { BuyerEntryDeletedListComponent } from './buyer-entry-deleted-list/buyer-entry-deleted-list.component';
import { SellerEntryDeletedListComponent } from './seller-entry-deleted-list/seller-entry-deleted-list.component';
import { BuyerDueCollectionDetailsComponent } from './buyer-due-collection-details/buyer-due-collection-details.component';
import { SupplierDuePaymentDetailsComponent } from './supplier-due-payment-details/supplier-due-payment-details.component'
import {NgxPrintModule} from 'ngx-print';
import { SupplierRawInfoComponent } from './supplier-raw-info/supplier-raw-info.component';
import { BuyerRawInfoComponent } from './buyer-raw-info/buyer-raw-info.component';
import { BuyerRawInfoDetailsComponent } from './buyer-raw-info-details/buyer-raw-info-details.component';
import { SupplierRawInfoDetailsComponent } from './supplier-raw-info-details/supplier-raw-info-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    BuyerEntryComponent,
    SellerEntryComponent,
    SellerEntryListComponent,
    BuyerEntryListComponent,
    ReplaceLineBreaks,
    BuyerDueCollectionComponent,
    SupplierDuePaymentComponent,
    BuyerEntryDeletedListComponent,
    SellerEntryDeletedListComponent,
    BuyerDueCollectionDetailsComponent,
    SupplierDuePaymentDetailsComponent,
    SupplierRawInfoComponent,
    BuyerRawInfoComponent,
    BuyerRawInfoDetailsComponent,
    SupplierRawInfoDetailsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BuysellmanagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    UiModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    NgbAlertModule,
    NgxPrintModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule
  ]
})
export class BuysellmanagementModule { }
