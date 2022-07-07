import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.css']
})
export class BillDialogComponent {
  billEdit?: Bill;
  mesAno: string = "";

  form = new FormGroup({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    billType: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<BillDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: BillDialogModel, public billService: BillService) {
    this.mesAno = data.mesAno;
    if (data.billEdit) {
      this.setFormEdit(data.billEdit);
    }
  }

  setFormEdit(billEdit: Bill) {
    const { mesAno, description, amount, billType } = billEdit;
    this.billEdit = billEdit;
    this.form.patchValue({
      mesAno, 
      description, 
      amount, 
      billType
    })
  }

  createBill(bill: Bill): Bill {
    const {description, mesAno, amount, billType} = bill;
    const billCreated: Bill = {
      description,
      mesAno,
      amount, 
      billType
    }
    return billCreated;
  }

  onSubmit(bill: Bill): void {
    let billDto = this.createBill(bill);
    billDto.mesAno = this.mesAno;

    if (this.isEdit()) {
      billDto.id = this.billEdit?.id;
    }

    this.saveBill(billDto);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  isEdit(): boolean {
    return this.billEdit?.id != null;
  }

  saveBill(bill: Bill) {
    this.billService.saveBill(bill).subscribe(response => (
      this.dialogRef.close(true)
    ));
  }
}

export class BillDialogModel {

  constructor(public mesAno: string, public billEdit: Bill) {
    
  }
}
