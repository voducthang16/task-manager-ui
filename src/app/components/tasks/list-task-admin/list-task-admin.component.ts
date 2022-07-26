import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/interfaces/tasks';
import { ShareDataService } from 'src/app/share-data.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
    selector: 'app-list-task-admin',
    templateUrl: './list-task-admin.component.html',
    styleUrls: ['./list-task-admin.component.scss'],
})
export class ListTaskAdminComponent implements OnInit {
    // receive component & data from header
    data: string = '';
    component: string | undefined;
    constructor(
        private Data: ShareDataService,
        private TasksService: TasksService
    ) {
    }
    listTaskTemp: Tasks[] = [];
    listTask: Tasks[] = []
    addTaskStatus: boolean = false;
    updateTaskStatus: boolean = false;
    deleteTaskStatus: boolean = false;
    taskId: string | undefined;
    changeTaskStatus() {
        this.addTaskStatus = !this.addTaskStatus;
    }
    hideModal(status: boolean) {
        if (status) {
            this.changeTaskStatus();
            this.getAllTasks();
        }
    }
    ngOnInit(): void {
        this.listTaskTemp = this.listTask;
        // receive component from header
        this.Data.currentComponent.subscribe(component => this.component = component);

        this.getAllTasks();
        this.closeTaskClick();
        this.updateAndDeleteTask();
    }
    // run when value of component is changed
    ngDoCheck() {
        if (this.component == 'list-task-admin') {
            this.Data.currentData.subscribe(data => this.data = data);
        }
        this.filterTask()
    }

    getAllTasks() {
        this.TasksService.getAllTasks().subscribe((list: any) => {
            this.listTask = list.sort((a: any, b: any) => {
                return (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0);
            });
            this.listTaskTemp = this.listTask;
        })
    }
    filterTask() {
        this.listTask = this.listTaskTemp.filter(task => task.name.toLowerCase( ).includes(this.data.toLowerCase( )))
    }
    // need fix
    closeTaskClick() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('.add-task.overlay-close') || target.matches('.add-task.modal.overlay.active')) {
                this.changeTaskStatus()
            }
            if (target.matches('.update-task.overlay-close') || target.matches('.update-task.modal.overlay.active')) {
                this.updateTaskStatus = !this.updateTaskStatus;
            }
            if (target.matches('.delete-task.overlay-close') || target.matches('.delete-task.modal.overlay.active') || target.matches('.btn.delete-task')) {
                this.deleteTaskStatus = !this.deleteTaskStatus;
            }
        })
    }
    updateAndDeleteTask() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('.role-button')) {
                this.updateTaskStatus = !this.updateTaskStatus;
                this.taskId = target.getAttribute('data-task-id')!;
            }
            if (target.matches('.delete-button')) {
                this.deleteTaskStatus = !this.deleteTaskStatus;
                this.taskId = target.getAttribute('data-task-id')!;
            }
        })
    }
    hideUpdateModal(status: boolean) {
        if (status) {
            this.updateTaskStatus = !this.updateTaskStatus;
            this.getAllTasks();
        }
    }
    hideDeleteModal(status: boolean) {
        if (status) {
            this.deleteTaskStatus = !this.deleteTaskStatus;
            this.getAllTasks();
        }
    }
}
