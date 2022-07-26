import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    constructor(private WebRequestService: WebRequestService) {

    }

    createUser(lastName: string, firstName: string, email: string, password: string, area: string, role: number = 2, status: number = 0) {
        return this.WebRequestService.post('users', {
            lastName,
            firstName,
            email,
            password,
            area,
            role,
            status
        })
    }
}
