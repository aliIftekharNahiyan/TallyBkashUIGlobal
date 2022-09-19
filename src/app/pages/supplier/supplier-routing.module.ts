import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuppliermodificationComponent } from './suppliermodification/suppliermodification.component'
import { SupplierlistComponent } from './supplierlist/supplierlist.component'
import { SupplierdeletedlistComponent } from './supplierdeletedlist/supplierdeletedlist.component'

const routes: Routes = [
  {
    path: 'supplier',
    component: SuppliermodificationComponent
  },
  {
    path: 'supplierList',
    component: SupplierlistComponent
  },
  {
    path: 'supplierDeletedList',
    component: SupplierdeletedlistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
