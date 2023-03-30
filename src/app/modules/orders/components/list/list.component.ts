import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { SnackbarService } from "src/app/services/snack-bar.service";

import { Order } from "../../data/data";
import { OrderService } from "../../services/orders.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  public displayedColumns: string[] = ["orderId", "orderTotal", "customerName"];
  public dataSource: MatTableDataSource<Order>;

  private _subscriptions = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _router: Router,
    private _service: OrderService,
    private _snackBarService: SnackbarService
  ) {}

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
    this._service
      .getOrders()
      .pipe(takeUntil(this._subscriptions))
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err) => {
          this._snackBarService.openSnackBar(
            "Unable to load orders. Please try again later."
          );
        },
      });
  }

  public goToDetails(row: Order): void {
    this._router.navigate(["/orders/details"], {
      queryParams: { orderId: row?.orderId },
    });
  }
}
