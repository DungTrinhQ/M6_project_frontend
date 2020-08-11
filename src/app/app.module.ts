import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './modelbook/layout/register/register.component';
import { LoginComponent } from './modelbook/layout/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MainwallComponent } from './modelbook/layout/mainwall/mainwall.component'
import {AuthInterceptor} from './helper/auth.interceptor';
import {EditInfoComponent} from './modelbook/account-infomation/edit-info/edit-info.component';
import {AccountInfomationModule} from './modelbook/account-infomation/account-infomation.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainwallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AccountInfomationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
