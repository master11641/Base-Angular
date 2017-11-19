import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRelationByRelationTagNamePipe } from './user-search-relation-by-relationtag.pipe';
import { UserRelationByNameSearchPipe } from './user-search-relation-byname.pipe';
import { UserSearchPipe } from './user-search.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxConfirmModule } from 'ngx-confirm/ngx-confirm.module';
import { UsernameValidator } from './../validators/username-email-validator';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserOperationsRoutingModule } from './user-operations-routing.module';

import { UsersService } from './users.service';




@NgModule({
  imports: [
    CommonModule,
    UserOperationsRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxConfirmModule,
    PaginationModule.forRoot(),
    FormsModule,
    TagInputModule, BrowserAnimationsModule,
  ],
  declarations: [ UserSearchPipe,UserRelationByNameSearchPipe,
    UserRelationByRelationTagNamePipe],
  providers: [UsersService, UsernameValidator],

})
export class UserOperationsModule { }
