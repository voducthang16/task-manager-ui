import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LeaderComponent } from './pages/leader/leader.component';
import { MemberComponent } from './pages/member/member.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { ListProjectAdminComponent } from './components/projects/list-project-admin/list-project-admin.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { ListTaskAdminComponent } from './components/tasks/list-task-admin/list-task-admin.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { ProjectDetailComponent } from './components/projects/project-detail/project-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { InfoUserComponent } from './components/users/info-user/info-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { DeleteUserComponent } from './components/users/delete-user/delete-user.component';
import { UpdateProjectComponent } from './components/projects/update-project/update-project.component';
import { DeleteProjectComponent } from './components/projects/delete-project/delete-project.component';
import { UpdateTaskComponent } from './components/tasks/update-task/update-task.component';
import { DeleteTaskComponent } from './components/tasks/delete-task/delete-task.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        AdminComponent,
        LeaderComponent,
        MemberComponent,
        SidebarComponent,
        DashboardComponent,
        ListUserComponent,
        ListProjectAdminComponent,
        AddProjectComponent,
        ListTaskAdminComponent,
        AddTaskComponent,
        ProjectDetailComponent,
        HeaderComponent,
        AddUserComponent,
        InfoUserComponent,
        UpdateUserComponent,
        DeleteUserComponent,
        UpdateProjectComponent,
        DeleteProjectComponent,
        UpdateTaskComponent,
        DeleteTaskComponent,
    ],
    imports: [
        BrowserModule, 
        AppRoutingModule, 
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
