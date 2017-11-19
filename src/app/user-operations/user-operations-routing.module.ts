
import { AdminGuard } from './../account/admin.guard';

import { HeaderComponent } from './../core/header/header.component';

import { AuthGuard } from './../account/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [


      { path: '', component: HeaderComponent, outlet: 'header' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOperationsRoutingModule { }
