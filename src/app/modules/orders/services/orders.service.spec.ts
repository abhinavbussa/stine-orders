import { TestBed } from "@angular/core/testing";

import { OrderService } from "./orders.service";

describe("OrderService", () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
