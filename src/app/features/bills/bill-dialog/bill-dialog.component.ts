import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.css']
})
export class BillDialogComponent {
  description = new FormControl('', [Validators.required]);
  amount = new FormControl('', [Validators.required]);
  billType = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<BillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BillDialogModel, 
    public billService: BillService) {
  }

  onConfirm(): void {
    this.createBill(this.description.value, this.amount.value, this.billType.value);
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  createBill(description: string, amount: number, billType: string) {
    let bill: Bill = {
      description: description,
      amount: amount,
      billType: billType,
      mesAno: "062022"
    };

    this.billService.createBill(bill).subscribe(response => (
      console.log(response)
    ));
  }
}

export class BillDialogModel {

  constructor(public title: string, public message: string) {
  }
}
