import { AntivirusTypeAddComponent } from './antivirus-type-add/antivirus-type-add.component';
import { AntivirusTypeListComponent } from './antivirus-type-list/antivirus-type-list.component';

import { HeaderComponent } from './../core/header/header.component';

import { AuthGuard } from './../account/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'AntiViruses',
        component: AntivirusTypeListComponent
      },
      {
        path: 'AntiViruses/add',
        component: AntivirusTypeAddComponent
      },
      { path: '', component: HeaderComponent, outlet: 'header' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntiVirusTypeRoutingModule { }
