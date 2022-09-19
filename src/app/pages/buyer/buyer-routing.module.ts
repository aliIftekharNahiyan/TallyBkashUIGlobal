import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerdeletedlistComponent } from './buyerdeletedlist/buyerdeletedlist.component';
import { BuyerlistComponent } from './buyerlist/buyerlist.component';
import { BuyermodificationComponent } from './buyermodification/buyermodification.component';



const routes: Routes = [
  {
    path: 'buyer',
    component: BuyermodificationComponent
  },
  {
    path: 'buyerList',
    component: BuyerlistComponent
  },
  {
    path: 'buyerDeletedList',
    component: BuyerdeletedlistComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
