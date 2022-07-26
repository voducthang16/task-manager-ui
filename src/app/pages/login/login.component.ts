import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    getUserType() {
        let data = localStorage.getItem('user')!;
        return JSON.parse(data);
    }
    constructor(private LoginService: LoginService, private router: Router) {

    }
    userType: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserType());
    ngOnInit(): void {
        if (this.getUserType()) {
            this.router.navigate(['/'])
        }
    }
    onLogin(e: any) {
        e.preventDefault();
        const email = <HTMLInputElement>document.querySelector('#email');
        const password = <HTMLInputElement>document.querySelector('#password');
        this.LoginService.login(`${email.value}`, `${password.value}`).subscribe((res: any) => {
            localStorage.setItem('user', JSON.stringify({
                role: res.role,
                id: res._id
            }))
            this.userType.next(res.role);
            if (res.role === 2) {
                this.router.navigate(['/member'])
            } else if (res.role === 1) {
                this.router.navigate(['/leader'])
            } else {
                this.router.navigate(['/'])
            }
        })
    }
}
