import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WorkerListComponent } from './worker-list/worker-list.component';
import { CreateCostTypeComponent } from './create-cost-type/create-cost-type.component';
import { SpendCostComponent } from './spend-cost/spend-cost.component';
import { SpendCostDetailsComponent } from './spend-cost-details/spend-cost-details.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { InfoComponent } from './info/info.component';


const routes: Routes = [
  {
    path: 'WorkerList',
    component: WorkerListComponent
  },
  {
    path: 'CreateCostType',
    component: CreateCostTypeComponent
  },
  {
    path: 'SpendCost',
    component: SpendCostComponent
  }, 
  {
    path: 'SpendCostDetails',
    component: SpendCostDetailsComponent
  },
  {
    path: 'WorkerDetails',
    component: WorkerDetailsComponent
  },
  {
    path: 'Info',
    component: InfoComponent
  }
  
  
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostManagementRoutingModule { }
