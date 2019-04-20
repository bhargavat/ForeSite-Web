//angular components and modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
//custom components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RootComponent } from './root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { AppTestComponent } from './components/app-test/app-test.component';
import { AppTopbarComponent } from './components/app-topbar/app-topbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatNativeDateModule, MatCheckboxModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {DemoMaterialModule} from './material-module';
import {MatIconModule} from '@angular/material/icon'
import { SidenavService } from './app-main/sidenav.service';
import { AppMainComponent } from './app-main/app-main.component';

// const routes: Routes = [
// ];
const routes: Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    AppTestComponent,
    AppTopbarComponent,
    AppMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
  ],
  // entryComponents: [AppSidebarComponent],
  entryComponents: [AppComponent],
  providers: [SidenavService],
  // bootstrap: [AppComponent, AppSidebarComponent]
  bootstrap: [AppComponent]
})
export class AppModule {}
