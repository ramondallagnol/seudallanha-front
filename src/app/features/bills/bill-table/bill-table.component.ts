import { Component, Input, OnChanges, ViewChild, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Bill } from "../bill";

@Component({
    selector: 'app-bill-table',
    templateUrl: './bill-table.component.html',
    styleUrls: ['./bill-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillTableComponent implements OnChanges {

    displayedColumns: string[] = ['id', 'description', 'amount', 'actions'];
    dataSource = new MatTableDataSource<Bill>();
  
    @ViewChild(MatSort, { static: true })
    sort: MatSort = new MatSort;

    @Input() bills : Bill[] = [];

    ngOnChanges(changes: SimpleChanges) {
        this.bills = changes.bills.currentValue
        this.dataSource = new MatTableDataSource(this.bills);
    }
}