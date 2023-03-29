import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Order } from '../../data/data';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['orderId', 'orderTotal', 'customerName'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subscriptions = new Subject<void>();

  constructor(private _router: Router, private _service: OrdersService) {}

  ngOnInit(): void {
    this._getOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
  }

  private _getOrders(): void {
    this._service.getOrders()
    .pipe(
      takeUntil(this._subscriptions)
    ).subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  goToDetails(row: Order): void {
    this._router.navigate(['/orders/details'], { queryParams: { orderId: row?.orderId } })
  }
}


