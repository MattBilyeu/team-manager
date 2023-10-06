import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { MgrDashComponent } from './mgr-dash/mgr-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { UpdatesComponent } from './updates/updates.component';
import { TipsComponent } from './tips/tips.component';
import { DailyTipComponent } from './user-dash/daily-tip/daily-tip.component';
import { NewUpdateComponent } from './user-dash/new-update/new-update.component';
import { AssignedTasksComponent } from './user-dash/assigned-tasks/assigned-tasks.component';
import { EscalationsComponent } from './escalations/escalations.component';
import { CreateUpdateComponent } from './mgr-dash/create-update/create-update.component';
import { CreateTipComponent } from './mgr-dash/create-tip/create-tip.component';
import { UserComponent } from './mgr-dash/user/user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TeamAdminComponent } from './admin-dash/team-admin/team-admin.component';
import { UserAdminComponent } from './admin-dash/user-admin/user-admin.component';
import { FormsModule } from '@angular/forms';
import { UserUpdateComponent } from './admin-dash/user-admin/user-update/user-update.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashComponent,
    MgrDashComponent,
    AdminDashComponent,
    UpdatesComponent,
    TipsComponent,
    DailyTipComponent,
    NewUpdateComponent,
    AssignedTasksComponent,
    EscalationsComponent,
    CreateUpdateComponent,
    CreateTipComponent,
    UserComponent,
    ChangePasswordComponent,
    TeamAdminComponent,
    UserAdminComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
