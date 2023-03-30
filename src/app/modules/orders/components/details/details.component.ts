import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { SnackbarService } from "src/app/services/snack-bar.service";
import { CUSTOMERS, Order, OrderLine } from "../../data/data";
import { OrderService } from "../../services/orders.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public orderDetails: Order;
  public customers: any[];
  public products: any[];
  public currentTotal = 0;
  public orderId = "";
  public isAddNewOrder = false;
  public customerControl: FormControl;
  public orderLinesControl: FormControl;

  private _subscriptions = new Subject<void>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: OrderService,
    private _snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.customerControl = new FormControl("", [Validators.required]);
    this.orderLinesControl = new FormControl(new FormArray([]));
    this._route.queryParams.subscribe((params) => {
      this._getCustomers();
      this._getProducts();
      if (params["addNew"]) {
        this._addNewOrder();
      } else {
        this._getOrderById(params["orderId"]);
        this.orderId = params["orderId"];
      }
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
  }

  public getOrderLineControls() {
    return (this.orderLinesControl.value as FormArray).controls;
  }

  public getOrderLineFormControl(index: number, control: string) {
    return (this.orderLinesControl.value as FormArray)
      .at(index)
      .get(control) as FormControl;
  }

  private _addNewOrder(): void {
    this.isAddNewOrder = true;
    this.orderDetails = {
      orderId: `${Date.now()}`,
      lines: [],
      orderTotal: 0,
      customerId: 1,
      customerName: CUSTOMERS[0].name,
    };
    this.customerControl.setValue(1);
    this.addNewProduct();
  }

  private _getOrderById(orderId: string): void {
    this._service
      .getOrderById(orderId)
      .pipe(takeUntil(this._subscriptions))
      .subscribe({
        next: (res) => {
          this.orderDetails = res;
          this.customerControl = new FormControl(this.orderDetails.customerId, [
            Validators.required,
          ]);
          this.orderLinesControl = new FormControl(new FormArray([]));
          this._getOrderLinesForm(this.orderDetails.lines as OrderLine[]);
        },
        error: (err) => {
          this._snackBarService.openSnackBar(
            "Unable to load order details. Please try again later."
          );
        },
      });
  }

  private _getOrderLinesForm(orderLines: OrderLine[]): void {
    const orderLinesFormArr = this.orderLinesControl.value as FormArray;
    orderLines.forEach((orderLine: OrderLine) => {
      const product = this.products.filter(
        (product) => product.productId === orderLine.productId
      )[0];
      orderLinesFormArr?.push(
        new FormGroup({
          productId: new FormControl(orderLine.productId, [
            Validators.required,
          ]),
          quantity: new FormControl(orderLine.quantity, [
            Validators.required,
            Validators.min(1),
          ]),
          totalPrice: new FormControl(product.price * orderLine.quantity, [
            Validators.required,
          ]),
        })
      );
    });
    this.orderLinesControl.setValue(orderLinesFormArr);
    this._getPriceTotal();
  }

  private _getCustomers(): void {
    this._service
      .getCustomers()
      .pipe(takeUntil(this._subscriptions))
      .subscribe({
        next: (res) => {
          this.customers = res;
        },
        error: (err) => {
          this._snackBarService.openSnackBar(
            "Unable to load customers. Please try again later."
          );
        },
      });
  }

  private _getProducts(): void {
    this._service
      .getProducts()
      .pipe(takeUntil(this._subscriptions))
      .subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (err) => {
          this._snackBarService.openSnackBar(
            "Unable to load products. Please try again later."
          );
        },
      });
  }

  private _getPriceTotal(): void {
    this.currentTotal = 0;
    const orderLines = this.orderLinesControl.value as FormArray;
    for (let formIndex = 0; formIndex < orderLines.length; formIndex++) {
      this.currentTotal += orderLines.at(formIndex).get("totalPrice")?.value;
    }
  }

  public updatePrice(index: number): void {
    const orderLinesFormArr = this.orderLinesControl.value as FormArray;
    const product = this.products.filter(
      (product) =>
        product.productId ===
        orderLinesFormArr.at(index).get("productId")?.value
    )[0];
    orderLinesFormArr
      .at(index)
      .get("totalPrice")
      ?.setValue(
        orderLinesFormArr.at(index).get("quantity")?.value * product.price
      );
    this.orderLinesControl.setValue(orderLinesFormArr);
    this._getPriceTotal();
  }

  public updateProduct(index: number): void {
    const orderLinesFormArr = this.orderLinesControl.value as FormArray;
    const product = this.products.filter(
      (product) =>
        product.productId ===
        orderLinesFormArr.at(index).get("productId")?.value
    )[0];
    orderLinesFormArr
      .at(index)
      .get("totalPrice")
      ?.setValue(
        orderLinesFormArr.at(index).get("quantity")?.value * product.price
      );
    this.orderLinesControl.setValue(orderLinesFormArr);
    this._getPriceTotal();
  }

  public addNewProduct(): void {
    const orderLines = this.orderLinesControl.value as FormArray;
    orderLines.push(
      new FormGroup({
        productId: new FormControl(1, [Validators.required]),
        quantity: new FormControl(1, [Validators.required]),
        totalPrice: new FormControl(10, [Validators.required]),
      })
    );
    this.orderLinesControl.setValue(orderLines);
    this._getPriceTotal();
  }

  public removeOrderLine(index: number): void {
    if ((this.orderLinesControl.value as FormArray).length < 2) return;
    (this.orderLinesControl.value as FormArray).removeAt(index);
    this._getPriceTotal();
  }

  public goBack(): void {
    this._router.navigate(["/orders/list"]);
  }

  public resetDetails(): void {
    this._getOrderById(this.orderId);
  }

  public submitOrder(): void {
    this._getPriceTotal();
    const customer = this.customers.filter(
      (customer) => customer.customerId === this.customerControl?.value
    )[0];
    const orderData = {
      ...this.orderDetails,
      ...customer,
      lines: this.orderLinesControl.value.value,
      orderTotal: this.currentTotal,
      customerName: customer.name,
    };
    this._service
      .updateOrder(this.orderId, orderData, this.isAddNewOrder)
      .subscribe({
        next: () => this.goBack(),
        error: (err) =>
          this._snackBarService.openSnackBar(
            "Unable to update order details. Please try again later."
          ),
      });
  }
}
