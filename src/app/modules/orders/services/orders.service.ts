import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CUSTOMERS, Order, ORDERS, PRODUCTS } from "../data/data";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  orders: Order[] = ORDERS;
  products: any[] = PRODUCTS;
  customers: any[] = CUSTOMERS;

  constructor() {}

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(id: string): Observable<Order> {
    return of(
      this.orders.filter((order: Order) => order.orderId === id)?.[0] || {}
    );
  }

  getProducts(): Observable<any[]> {
    return of(this.products);
  }

  getCustomers(): Observable<any[]> {
    return of(this.customers);
  }

  updateOrder(
    orderId: string,
    orderData: Order,
    isAddNewOrder = false
  ): Observable<any> {
    if (isAddNewOrder) {
      this.orders.push(orderData);
    } else {
      const orderIndex = this.orders.findIndex(
        (order) => order.orderId === orderId
      );
      this.orders.splice(orderIndex, 1, orderData);
    }
    return of({ status: 200 });
  }
}
