import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { MaterialModule } from "src/app/material.module";
import { ORDERS } from "../../data/data";
import { OrderService } from "../../services/orders.service";

import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let ordersSServiceSpyObj: OrderService;
  let routerSpyObj: Router;

  beforeEach(async () => {
    ordersSServiceSpyObj = jasmine.createSpyObj(OrderService, {
      getOrders: of(ORDERS),
    });
    routerSpyObj = jasmine.createSpyObj(Router, {
      navigate: () => {},
    });

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [BrowserAnimationsModule, MaterialModule, RouterTestingModule],
      providers: [
        { provide: OrderService, useValue: ordersSServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it("should call route navigate", () => {
    component.goToDetails(ORDERS[0]);
    expect(routerSpyObj.navigate).toHaveBeenCalled();
  });
});
