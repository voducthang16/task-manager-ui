import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LeaderComponent } from './pages/leader/leader.component';
import { MemberComponent } from './pages/member/member.component';
const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Đăng ký'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Đăng nhập'
        }
    },
    {
        path: 'leader',
        component: LeaderComponent,
        data: {
            title: 'Leader'
        }
    },
    {
        path: 'member',
        component: MemberComponent,
        data: {
            title: 'Member'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
