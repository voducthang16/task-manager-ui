import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private WebRequestService: WebRequestService) {}

    getAllProject() {
        return this.WebRequestService.get('projects');
    }

    getOne(id: string) {
        return this.WebRequestService.get(`projects/${id}`)
    }

    createProject(name: string, leader: string, members: string[], 
            price: number, startDate: string, endDate: string, status: number) {
        return this.WebRequestService.post('projects', {
            name,
            leader,
            members,
            price,
            startDate,
            endDate,
            status
        })
    }

    updateProject(id: string, payload: Object) {
        return this.WebRequestService.patch(`projects/${id}`, payload)
    }

    deleteProject(id: string) {
        return this.WebRequestService.delete(`projects/${id}`)
    }
}