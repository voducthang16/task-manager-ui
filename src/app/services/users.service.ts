import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private WebRequestService: WebRequestService) {

    }
    getUserList() {
        return this.WebRequestService.get('users');
    }

    getOneUser(id: string) {
        return this.WebRequestService.get(`users/${id}`)
    }

    deleteUser(id: string) {
        return this.WebRequestService.delete(`users/${id}`)
    }

    updateUser(id: string, payload: Object) {
        return this.WebRequestService.patch(`users/${id}`, payload)
    }
}