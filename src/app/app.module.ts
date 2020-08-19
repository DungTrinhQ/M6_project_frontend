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
import {AccountInfomationModule} from './modelbook/account-infomation/account-infomation.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { NavbarComponent } from './modelbook/layout/mainwall/navbar/navbar.component';
import { InputSearchComponent } from './modelbook/layout/mainwall/navbar/input-search/input-search.component';
import { ContentComponent } from './modelbook/layout/mainwall/content/content.component';
import { SideMenuComponent } from './modelbook/layout/mainwall/content/side-menu/side-menu.component';
import { StatusComponent } from './modelbook/layout/status/status.component';
import { CommentsZoneComponent } from './modelbook/layout/comments-zone/comments-zone.component';
import { StatusFormComponent } from './modelbook/layout/status-form/status-form.component';
import { StatusEditComponent } from './modelbook/layout/status-edit/status-edit.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        MainwallComponent,
        NavbarComponent,
        InputSearchComponent,
        ContentComponent,
        SideMenuComponent,
        StatusComponent,
        CommentsZoneComponent,
        StatusFormComponent,
        StatusEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        FormsModule,
        AccountInfomationModule,
        InfiniteScrollModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    exports: [
        StatusComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
