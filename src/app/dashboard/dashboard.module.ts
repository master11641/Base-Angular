import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardService } from "./dashboard.service";
import { ChartsModule } from "ng2-charts";

@NgModule({
  imports: [CommonModule, ChartsModule, RouterModule],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {}
