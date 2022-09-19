import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table'
import{MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule } from '@angular/material/input'

import {MatSortModule} from '@angular/material/sort'
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';




import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerdeletedlistComponent } from './buyerdeletedlist/buyerdeletedlist.component';
import { BuyerlistComponent } from './buyerlist/buyerlist.component';
import { BuyermodificationComponent } from './buyermodification/buyermodification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    BuyerdeletedlistComponent,
    BuyerlistComponent,
    BuyermodificationComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
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
    MatSelectModule,
    NgxMatSelectSearchModule
  ]
})
export class BuyerModule { }
