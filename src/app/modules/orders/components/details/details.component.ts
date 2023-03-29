import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order, OrderLine } from '../../data/data';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  orderDetails: Order;
  customers: any[];
  products: any[];
  orderForm: FormGroup;
  currentTotal = 0;
  orderId = '';

  private _subscriptions = new Subject<void>();

  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _service: OrdersService) { }

  ngOnInit(): void {
    this.orderForm = this._fb.group({
      customer: [],
      orderLines: this._fb.array([])
    });
    this._route.queryParams
      .subscribe((params) => {
        this._getCustomers();
        this._getProducts();
        this._getOrderById(params['orderId']);
        this.orderId = params['orderId'];
      })
  }

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
  }

  getOrderLineControls() {
    return (this.orderForm.get('orderLines') as FormArray).controls
  }

  private _getOrderById(orderId: string): void {
    this._service.getOrderById(orderId)
      .pipe(
        takeUntil(this._subscriptions)
      ).subscribe({
        next: (res) => {
          this.orderDetails = res;
          this.orderForm = this._fb.group({
            customer: [this.orderDetails.customerId],
            orderLines: this._fb.array([])
          });
          this._getOrderLinesForm(this.orderDetails.lines as OrderLine[])
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  private _getOrderLinesForm(orderLines: OrderLine[]): void {
    const orderLinesFormArr = this.orderForm.get('orderLines') as FormArray;
    orderLines.forEach((orderLine: OrderLine) => {
      const product = this.products.filter((product) => product.productId === orderLine.productId)[0];
      orderLinesFormArr?.push(this._fb.group({
        productId: [orderLine.productId],
        quantity: [orderLine.quantity],
        totalPrice: [product.price * orderLine.quantity]
      }))
    })
    this._getPriceTotal();
  }

  private _getCustomers(): void {
    this._service.getCustomers()
      .pipe(
        takeUntil(this._subscriptions)
      ).subscribe({
        next: (res) => {
          this.customers = res;
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  private _getProducts(): void {
    this._service.getProducts()
      .pipe(
        takeUntil(this._subscriptions)
      ).subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  private _getPriceTotal(): void {
    this.currentTotal = 0;
    const orderLines = this.orderForm.get('orderLines') as FormArray;
    for (let formIndex = 0; formIndex < orderLines.length; formIndex++) {
      this.currentTotal += orderLines.at(formIndex).get('totalPrice')?.value;
    }
  }

  updatePrice(index: number): void {
    const orderLinesFormArr = this.orderForm.get('orderLines') as FormArray;
    const product = this.products.filter((product) => product.productId === orderLinesFormArr.at(index).get('productId')?.value)[0];
    orderLinesFormArr.at(index).get('totalPrice')?.setValue(
      orderLinesFormArr.at(index).get('quantity')?.value * product.price
    );
    this._getPriceTotal();
  }

  updateProduct(index: number): void {
    const orderLinesFormArr = this.orderForm.get('orderLines') as FormArray;
    const product = this.products.filter((product) => product.productId === orderLinesFormArr.at(index).get('productId')?.value)[0];
    orderLinesFormArr.at(index).get('totalPrice')?.setValue(
      orderLinesFormArr.at(index).get('quantity')?.value * product.price
    );
    this._getPriceTotal();
  }

  addNewProduct(): void {
    const orderLines = this.orderForm.get('orderLines') as FormArray;
    orderLines.push(this._fb.group({
      productId: [1],
      quantity: [1],
      totalPrice: [10]
    }))
    this._getPriceTotal();
  }

  removeOrderLine(index: number): void {
    if ((this.orderForm.get('orderLines') as FormArray).length < 2) return;
    (this.orderForm.get('orderLines') as FormArray).removeAt(index);
    this._getPriceTotal();
  }

  goBack(): void {
    this._router.navigate(['/orders/list'])
  }

  resetDetails(): void {
    this._getOrderById(this.orderId);
  }

  submitOrder(): void {
    this._getPriceTotal()
    const customer = this.customers.filter((customer) => customer.customerId === this.orderForm.get('customer')?.value)[0];
    const orderData = {
      ...this.orderDetails,
      ...this.orderForm.value,
      orderTotal: this.currentTotal,
      customerName: customer.name
    };
    this._service.updateOrder(this.orderId, orderData).subscribe({
      next: () => this.goBack(),
      error: (err) => console.error(err)
    })
  }
}
