import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './modelbook/layout/register/register.component';
import { LoginComponent } from './modelbook/layout/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

import { authInterceptorProviders } from './helper/auth.interceptor';
import { MainwallComponent } from './modelbook/layout/mainwall/mainwall.component';
import {EditInfoComponent} from './modelbook/layout/edit-info/edit-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainwallComponent,
    EditInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
