import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastComponent } from './toast/toast.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AlertsComponent } from './alerts/alerts.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastComponent,
    AddUserComponent,
    AlertsComponent

  ],
  declarations: [
    ToastComponent,
    AddUserComponent,
    AlertsComponent
  ],
  providers: [
    ToastComponent,
    AddUserComponent,
    AlertsComponent

  ]
})
export class SharedModule { }
