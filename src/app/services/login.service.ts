import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private WebRequestService: WebRequestService) {

    }
    login(email: string, password: string) {
        return this.WebRequestService.login(email, password)
    }
}
