import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BillService } from '../bill.service';
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Bill } from '../bill';


@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  expenses: Bill[] = [];
  incomes: Bill[] = [];
  currentMesAno: string = "";

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private notificationService: NotificationService,
    private titleService: Title,
    private billService: BillService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Bills');
  }

  loadBills(mesAno: string) {
    this.billService
      .getBillListByMesAno(mesAno)
      .pipe()
      .subscribe((bills) => {
        this.incomes = bills.filter((bill: Bill) => bill.billType === "INCOME");
        this.expenses = bills.filter((bill: Bill) => bill.billType === "EXPENSE");
        // this.notificationService.openSnackBar('produtos carregados');
      });
  }

  openDialogBill() {
    this.dialog
    .open(BillDialogComponent, {data: { mesAno: this.currentMesAno }})
    .afterClosed().subscribe((isSaved) => {
      if (isSaved) {
        this.notificationService.openSnackBar('Lançamento salvo com sucesso!');
      }
      this.refreshData(this.currentMesAno);
    });
  }

  refreshData(mesAno: string) {
    this.currentMesAno = mesAno;
    this.loadBills(mesAno);
  }

  refreshCallbackFunction = (mesAno: string): void => {
    this.refreshData(mesAno);
  }

  getIncomeAmountTotal() {
    return this.incomes.reduce((sum, bill) => sum += bill.amount, 0);
  }

  getExpensesAmountTotal() {
    return this.expenses.reduce((sum, bill) => sum += bill.amount, 0);
  }
}
