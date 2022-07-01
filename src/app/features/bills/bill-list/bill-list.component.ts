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
  displayedColumns: string[] = ['id', 'description', 'price', 'createdAt', 'actions'];
  dataSourceIncomes = new MatTableDataSource();
  dataSourceExpense = new MatTableDataSource();

  expenses: Bill[] = [];
  incomes: Bill[] = [];

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
    this.loadBills("062022");
  }

  loadBills(mesAno: string) {
    this.billService
      .getBillListByMesAno(mesAno)
      .pipe()
      .subscribe((bills) => {
        this.incomes = bills.filter((bill: Bill) => bill.billType === "INCOME");
        this.expenses = bills.filter((bill: Bill) => bill.billType === "EXPENSE");
        this.notificationService.openSnackBar('produtos carregados');
      });
  }

  openDialogBill() {
    this.dialog.open(BillDialogComponent, {
      data: { title: 'austin' },
    });
  }

  addItem(mesAno: string) {
    console.log(mesAno)
    this.loadBills(mesAno);
  }
  
}
