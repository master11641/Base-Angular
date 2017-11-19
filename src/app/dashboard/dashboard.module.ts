


import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
