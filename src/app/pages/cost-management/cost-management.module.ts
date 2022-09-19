import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import{MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule } from '@angular/material/input'
import {MatSortModule} from '@angular/material/sort'
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';




import { CostManagementRoutingModule } from './cost-management-routing.module';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { CreateCostTypeComponent } from './create-cost-type/create-cost-type.component';
import { SpendCostComponent } from './spend-cost/spend-cost.component';
import { SpendCostDetailsComponent } from './spend-cost-details/spend-cost-details.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    WorkerListComponent,
    CreateCostTypeComponent,
    SpendCostComponent,
    SpendCostDetailsComponent,
    WorkerDetailsComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    CostManagementRoutingModule,
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
    NgbAlertModule
  ]
})
export class CostManagementModule { }
