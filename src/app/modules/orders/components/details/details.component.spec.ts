import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { MaterialModule } from "src/app/material.module";
import { CUSTOMERS, ORDERS, PRODUCTS } from "../../data/data";
import { OrderService } from "../../services/orders.service";
import { DetailsComponent } from "./details.component";

describe("DetailsComponent", () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let ordersSServiceSpyObj: OrderService;
  let routerSpyObj: Router;

  beforeEach(async () => {
    ordersSServiceSpyObj = jasmine.createSpyObj(OrderService, {
      getCustomers: of(CUSTOMERS),
      getProducts: of(PRODUCTS),
      getOrderById: of(ORDERS[0]),
    });
    routerSpyObj = jasmine.createSpyObj(Router, {
      navigate: () => {},
    });
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: OrderService, useValue: ordersSServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              orderId: "d0d6f6fd-b14c-47d4-9d2e-ee69fa579aa1",
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call route navigate", () => {
    component.goBack();
    expect(routerSpyObj.navigate).toHaveBeenCalled();
  });
});
