/* Routing for page navigation is defined here
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AppTestComponent } from './components/app-test/app-test.component';
import { AppProfileComponent } from './components/app-profile/app-profile.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'test', component: AppTestComponent },
      { path: 'edit-profile', component: AppProfileComponent },
    ]
  },

  {path: '', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'register',component: RegisterComponent},
  // {path: 'test', component: AppTestComponent},
  // {path: 'main', component: AppMainComponent,
  // children: [
  //   { path: 'test', component: AppTestComponent },
  // ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
