import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tasks } from 'src/app/interfaces/tasks';
import { Users } from 'src/app/interfaces/users';
import { Projects } from 'src/app/interfaces/projects';
import { TasksService } from 'src/app/services/tasks.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
    selector: 'app-update-task',
    templateUrl: './update-task.component.html',
    styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
    constructor(
        private TasksService: TasksService,
        private UsersService: UsersService,
        private ProjectsService: ProjectsService
    ) {}
    @Input() taskId: string | undefined;
    @Output() hideUpdate = new EventEmitter<boolean>();
    task: Tasks = <Tasks>{};
    member: Users = <Users>{};
    project: Projects = <Projects>{};

    listMember: Users[] = [];
    listProject: Projects[] = [];
    ngOnInit(): void {
        this.getTask(this.taskId!);
        this.getListMember();
        this.getListProject();
    }
    getTask(id: string) {
        this.TasksService.getTaskDetail(id).subscribe((list: any) => {
            this.task = list[0];
            this.member = list[0].memberId;
            this.project = list[0].projectId;
        })
    }
    getListMember() {
        this.UsersService.getUserList().subscribe((list: any) => {
            this.listMember = list.filter((member: Users) => member.role == 2);
        })
    }
    getListProject() {
        this.ProjectsService.getAllProject().subscribe((list: any) => {
            this.listProject = list;
        })
    }
    submitForm() {
        const name = <HTMLInputElement>document.querySelector('#task-name');
        const describe = <HTMLInputElement>document.querySelector('#describe');
        const project =  <HTMLSelectElement>document.querySelector('#project');
        const member =  <HTMLSelectElement>document.querySelector('#member');
        const priority = <HTMLInputElement>document.querySelector('#priority');
        const status =  <HTMLInputElement>document.querySelector('input[name="status"]:checked');
        return this.TasksService.updateTask(this.taskId!, {
            name: name.value,
            describe: describe.value,
            projectId: project.value,
            memberId: member.value,
            priority: +priority.value,
            status: +status.value
        }).subscribe(() => {
            alert('Update Task Successfully');
            this.hideUpdate.emit(true);
        })
    }
}
