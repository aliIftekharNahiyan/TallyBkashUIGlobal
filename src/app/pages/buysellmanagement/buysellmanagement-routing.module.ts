import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyerEntryComponent } from './buyer-entry/buyer-entry.component';
import { SellerEntryComponent } from './seller-entry/seller-entry.component';
import { SellerEntryListComponent } from './seller-entry-list/seller-entry-list.component';
import { BuyerEntryListComponent } from './buyer-entry-list/buyer-entry-list.component';
import{BuyerDueCollectionComponent} from './buyer-due-collection/buyer-due-collection.component'
import {SupplierDuePaymentComponent} from './supplier-due-payment/supplier-due-payment.component'
import {SellerEntryDeletedListComponent} from './seller-entry-deleted-list/seller-entry-deleted-list.component'
import {BuyerEntryDeletedListComponent} from './buyer-entry-deleted-list/buyer-entry-deleted-list.component'
import {BuyerDueCollectionDetailsComponent} from'./buyer-due-collection-details/buyer-due-collection-details.component'
import {SupplierDuePaymentDetailsComponent} from './supplier-due-payment-details/supplier-due-payment-details.component'
import { SupplierRawInfoComponent } from './supplier-raw-info/supplier-raw-info.component';
import { BuyerRawInfoComponent } from './buyer-raw-info/buyer-raw-info.component';
import { BuyerRawInfoDetailsComponent } from './buyer-raw-info-details/buyer-raw-info-details.component';
import { SupplierRawInfoDetailsComponent } from './supplier-raw-info-details/supplier-raw-info-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'buyerEntry',
    component: BuyerEntryComponent
  },
  {
    path: 'sellerEntry',
    component: SellerEntryComponent
  },
  {
    path: 'sellerEntryList',
    component: SellerEntryListComponent
  }, 
  {
    path: 'buyerEntryList',
    component: BuyerEntryListComponent
  },
  {
    path: 'buyerDueCollection',
    component: BuyerDueCollectionComponent
  },
  {
    path: 'supplierDuePayment',
    component: SupplierDuePaymentComponent
  },
  {
    path: 'sellerListDeleted',
    component: SellerEntryDeletedListComponent
  },
  {
    path: 'BuyerListDeleted',
    component: BuyerEntryDeletedListComponent
  },
  {
    path: 'BuyerDueCollectionDetails',
    component: BuyerDueCollectionDetailsComponent
  },
  {
    path: 'SupplierDuePaymentDetails',
    component: SupplierDuePaymentDetailsComponent
  },
  {
    path: 'SupplierRawInfo',
    component: SupplierRawInfoComponent
  },
  {
    path: 'SupplierRawInfoDetails',
    component: SupplierRawInfoDetailsComponent
  },
  {
    path: 'BuyerRawInfo',
    component: BuyerRawInfoComponent
  },
  {
    path: 'BuyerRawInfoDetails',
    component: BuyerRawInfoDetailsComponent
  },

  {
    path: 'Dashboard',
    component: DashboardComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuysellmanagementRoutingModule { }
