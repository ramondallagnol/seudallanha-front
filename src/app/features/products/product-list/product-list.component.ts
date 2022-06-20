import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from '../product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'price', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private notificationService: NotificationService,
    private titleService: Title,
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Products');
    this.loadProducts();
    this.dataSource.sort = this.sort;
  }

  loadProducts() {
    this.productService
      .getProductList()
      .pipe()
      .subscribe((products) => {
        this.dataSource = new MatTableDataSource(products);
        this.notificationService.openSnackBar('produtos carregados');
      });
  }

  openDialogProduct() {
    this.dialog.open(ProductDialogComponent, {
      data: { title: 'austin' },
    });
  }
  
}
