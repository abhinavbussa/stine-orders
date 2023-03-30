import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./components/list/list.component";
import { DetailsComponent } from "./components/details/details.component";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { MaterialModule } from "src/app/material.module";
import { OrderService } from "./services/orders.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ListComponent, DetailsComponent, OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [OrderService],
})
export class OrdersModule {}
