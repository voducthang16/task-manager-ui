import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Projects } from 'src/app/interfaces/projects';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService} from 'src/app/services/tasks.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
    constructor(
        private UsersService: UsersService,
        private ProjectsService: ProjectsService,
        private TasksService: TasksService,
        private fb: FormBuilder
    ) {
    }
    @Output () hideModal = new EventEmitter<boolean>();
    listProject: Projects[] = [];
    listMember: Users[] = [];
    ngOnInit(): void {
        this.UsersService.getUserList().subscribe((list: any) => {
            this.listMember = list.filter((user: any) => user.role == 2);
        })
        this.ProjectsService.getAllProject().subscribe((list: any) => {
            this.listProject = list;
        })
        this.addTaskForm = this.fb.group({
            name: '',
            describe: '',
            project: '',
            member: '',
            priority: '',
            status: ''
        })
    }
    // getValueForm() {
    //     this.addTaskForm = this.fb.group({
    //         name: ['', [Validators.required]],
    //         describe: ['', [Validators.required,]],
    //         project: ['', [Validators.required]],
    //         member: ['', [Validators.required]],
    //         priority: ['', [Validators.required]],
    //         status: ['0', [Validators.required]],
    //     })
    // }
    addTaskForm!: FormGroup;
    onSubmit() {
        const name = this.addTaskForm.value.name
        const describe = this.addTaskForm.value.describe
        const project =  this.addTaskForm.value.project
        const member =  this.addTaskForm.value.member
        const priority = this.addTaskForm.value.priority
        const status =  this.addTaskForm.value.status
        return this.TasksService.createTask(project, name, describe, member, +priority, +status)
        .subscribe(() => {
            alert('Create Task Successfully');
            this.hideModal.emit(true);
        })
    }
}
