import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table'
import{MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule } from '@angular/material/input'

import {MatSortModule} from '@angular/material/sort'
import {MatPaginatorModule} from '@angular/material/paginator';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SuppliermodificationComponent } from './suppliermodification/suppliermodification.component';
import { SupplierlistComponent } from './supplierlist/supplierlist.component';
import { SupplierdeletedlistComponent } from './supplierdeletedlist/supplierdeletedlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '../../shared/ui/ui.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



import { from } from 'rxjs';

@NgModule({
  declarations: [
    SuppliermodificationComponent,
    SupplierlistComponent,
    SupplierdeletedlistComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
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
    MatPaginatorModule
    
  

  ]
})
export class SupplierModule { }
