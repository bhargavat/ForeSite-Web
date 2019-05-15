//angular components and modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//custom components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RootComponent } from './root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { AppTestComponent } from './components/app-test/app-test.component';
import { AppProfileComponent } from './components/app-profile/app-profile.component';
import { AppTopbarComponent } from './components/app-topbar/app-topbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule,MatNativeDateModule, MatCheckboxModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {DemoMaterialModule} from './material-module';
import {MatIconModule} from '@angular/material/icon'
import { SidenavService } from './app-main/sidenav.service';
import { RightSidenavService } from './app-main/rightsidenav.service';
import { AppMainComponent } from './app-main/app-main.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthService } from './components/auth/auth.service';
'@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { EventComponent } from './components/event/event.component';

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
    AppProfileComponent,
    AppTopbarComponent,
    AppMainComponent,
    EventComponent
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
    SatPopoverModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    // ActivatedRoute,
    RouterModule.forRoot(routes),
  ],
  // entryComponents: [AppSidebarComponent],
  entryComponents: [AppComponent],
  providers: [SidenavService, RightSidenavService, AuthService, AuthGuard],
  // bootstrap: [AppComponent, AppSidebarComponent]
  bootstrap: [AppComponent]
})
export class AppModule {}
