/* Routing for page navigation is defined here
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { AppTestComponent } from "./components/app-test/app-test.component";
import { AppProfileComponent } from "./components/app-profile/app-profile.component";
import { AppMainComponent } from "./app-main/app-main.component";
import { AuthGuard } from "./components/auth/auth.guard";
import { EventComponent } from "./components/event/event.component";
import { CreateComponent } from "./create/create.component";
import { PredictionComponent } from "./components/prediction/prediction.component";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: AppMainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "test", component: AppTestComponent },
      { path: "edit-profile", component: AppProfileComponent },
      { path: "event/:event_id", component: EventComponent },
      { path: "create", component: CreateComponent },
      {path: "home", component: HomeComponent},
      { path: "prediction/:event_id", component: PredictionComponent }
    ]
  },

  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
  // {path: 'event', component: AppTestComponent},

  // children: [
  //   { path: 'test', component: AppTestComponent },
  // ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
