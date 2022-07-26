import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(
        private ProjectsService: ProjectsService,
        private TasksService: TasksService,
        private UsersService: UsersService
    ) {}
    projectQuantity: number | undefined;
    taskQuantity: number | undefined;
    userQuantity: number | undefined;
    totalMoney: number = 0;
    ngOnInit(): void {
        this.ProjectsService.getAllProject().subscribe((list: any) => {
            this.projectQuantity = list.length;
            list.forEach((project: any) => {
                this.totalMoney += +project.price;
            })
        })
        this.TasksService.getAllTasks().subscribe((list: any) => {
            this.taskQuantity = list.length;
        })
        this.UsersService.getUserList().subscribe((list: any) => {
            this.userQuantity = list.length;
        })
    }
}
