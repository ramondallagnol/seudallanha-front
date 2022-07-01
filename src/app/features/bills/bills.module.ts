import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsRoutingModule } from './bills-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillTableComponent } from './bill-table/bill-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BillDialogComponent } from './bill-dialog/bill-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    BillsRoutingModule,
    SharedModule,
    FormsModule, 
    MatFormFieldModule
  ],
  declarations: [
    BillListComponent,
    BillTableComponent,
    BillDialogComponent
  ],
  entryComponents: [
  ]
})
export class BillsModule { }
