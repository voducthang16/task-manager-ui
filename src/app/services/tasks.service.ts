import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor(private WebRequestService: WebRequestService) {}

    getAllTasks() {
        return this.WebRequestService.get('tasks');
    }

    getTaskListByProjectId(id: string) {
        return this.WebRequestService.get(`tasks/${id}`);
    }

    getTaskDetail(id: string) {
        return this.WebRequestService.get(`tasks/detail/${id}`);
    }

    updateTask(id: string, payload: Object) {
        return this.WebRequestService.patch(`tasks/${id}`, payload);
    }

    deleteTask(id: string) {
        return this.WebRequestService.delete(`tasks/${id}`);
    }

    createTask(projectId: string, name: string, describe: string, memberId: string, 
        priority: number, status: number) {
        return this.WebRequestService.post('tasks', {
            projectId,
            name,
            describe,
            memberId,
            priority,
            status,
        })
    }
}