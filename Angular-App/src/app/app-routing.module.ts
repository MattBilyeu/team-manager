import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { MgrDashComponent } from './mgr-dash/mgr-dash.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UpdatesComponent } from './updates/updates.component';
import { TipsComponent } from './tips/tips.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},

  {path: "admin-dash", component: AdminDashComponent},
  {path: "mgr-dash", component: MgrDashComponent},
  {path: "user-dash", component: UserDashComponent},

  {path: "updates", component: UpdatesComponent},
  {path: "tips", component: TipsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
