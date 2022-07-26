import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { ProjectsService } from 'src/app/services/projects.service';
@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
    constructor(
        private UsersService: UsersService,
        private ProjectsService: ProjectsService
    ) { }
    @Output () hideModal = new EventEmitter<boolean>();
    listLeader: Users[] = [];
    listMember: Users[] = [];
    ngOnInit(): void {
        this.UsersService.getUserList().subscribe((list: any) => {
            this.listLeader = list.filter((user: any) => user.role == 1);
            this.listMember = list.filter((user: any) => user.role == 2);
        })
    }
    createProject(e: any) {
        e.preventDefault();
        const name = <HTMLInputElement>document.querySelector('#name');
        const leader =  <HTMLSelectElement>document.querySelector('#leader');
        const memberSelected: any = document.querySelectorAll('input[type="checkbox"]:checked');
        let members: string[] = [];
        [...memberSelected].forEach((input: any) => {
            members.push(input.value);
        })
        const price = <HTMLInputElement>document.querySelector('#price');
        const startDate = <HTMLInputElement>document.querySelector('#start-date');
        const endDate = <HTMLInputElement>document.querySelector('#end-date');
        const status =  <HTMLInputElement>document.querySelector('input[name="status"]:checked');
        return this.ProjectsService.createProject(name.value, leader.value, members, +price.value, startDate.value, endDate.value, +status.value)
        .subscribe(() => {
            alert('Create Project Successfully');
            this.hideModal.emit(true);
        })
    }
}
