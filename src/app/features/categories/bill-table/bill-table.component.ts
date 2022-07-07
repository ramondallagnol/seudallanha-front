import { Component, Input, OnChanges, ViewChild, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NotificationService } from 'src/app/core/services/notification.service';
import { Bill } from "../bill";
import { BillDialogComponent } from '../bill-dialog/bill-dialog.component';
import { BillService } from '../bill.service';

@Component({
    selector: 'app-bill-table',
    templateUrl: './bill-table.component.html',
    styleUrls: ['./bill-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillTableComponent implements OnChanges {

    constructor(public dialog: MatDialog, public billService: BillService, public notificationService: NotificationService) {

    }

    displayedColumns: string[] = ['description', 'amount', 'actions'];
    dataSource = new MatTableDataSource<Bill>();
  
    @ViewChild(MatSort, { static: true })
    sort: MatSort = new MatSort;

    @Input() bills : Bill[] = [];

    @Input() refreshCallbackFunction: (mesAno: string) => void;

    ngOnChanges(changes: SimpleChanges) {
        this.bills = changes.bills.currentValue
        this.dataSource = new MatTableDataSource(this.bills);
    }

    onDelete(item:any) {
        this.billService.delete(item.id).subscribe(() => {
            this.refreshCallbackFunction(item.mesAno);
            this.notificationService.openSnackBar('Lançamento excluído com sucesso!');
        });
    }

    onEdit(item:any) {
        this.openBillEditDialog(item);
    }

    openBillEditDialog(billEdit: Bill) {
        this.dialog.open(BillDialogComponent, {data: { billEdit: billEdit, mesAno: billEdit.mesAno }})
        .afterClosed().subscribe((dialogResponse) => {
            if (dialogResponse) {
                this.notificationService.openSnackBar('Lançamento editado com sucesso!');
            }
            this.refreshCallbackFunction(billEdit.mesAno);
        });
    }

}