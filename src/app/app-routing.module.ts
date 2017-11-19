import { DashboardComponent } from './dashboard/dashboard-component/dashboard.component';
import { AuthGuard } from './account/auth.guard';
import { FooterComponent } from './core/footer/footer.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { HeaderComponent } from './core/header/header.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: '', component: HeaderComponent, outlet: 'header' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
