import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/interfaces/projects';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
@Component({
    selector: 'app-update-project',
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
    constructor(
        private ProjectsService: ProjectsService,
        private UsersService: UsersService,
    ) {
    }
    submitForm() {
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
        this.ProjectsService.updateProject(`${this.id}`, {
            name: name.value,
            leader: leader.value,
            members: members,
            price: +price.value,
            startDate: startDate.value,
            endDate: endDate.value,
            status: +status.value
        }).subscribe(() => {
            alert('Update Project Successfully');
            this.hideUpdate.emit(true);
        })
    }
    @Output() hideUpdate = new EventEmitter<boolean>();
    @Input() id: string | undefined;
    ngOnInit(): void {
        this.getProject(this.id!);
        this.getUserList();
        setTimeout(() => {
            for (let value of this.listMember) {
                let newObj = {};
                if (this.check(value._id)) {
                    newObj = {
                        ...value,
                        isSelected: true
                    };
                    this.newArray.push(newObj);
                } else {
                    newObj = {
                        ...value,
                        isSelected: false
                    };
                    this.newArray.push(newObj);
                }
            }
        }, 1000)
    }
    project: Projects = <Projects>{};
    leader: Users = <Users>{};
    // member in project
    members: Users[] = [];

    // all leader
    listLeader: Users[] = [];

    // all member
    listMember: Users[] = [];

    newArray: any[] = [];
    getProject(id: string) {
        this.ProjectsService.getOne(id).subscribe((project: any) => {
            this.project = project[0];
            this.leader = project[0].leader;
            this.members = project[0].members;
        });
    }
    getUserList() {
        this.UsersService.getUserList().subscribe((users: any) => {
            this.listLeader = users.filter((user: any) => user.role === 1);
            this.listMember = users.filter((user: any) => user.role === 2);
        });
    }

    check(id: string) {
        if (this.members.some((e) => e._id == id)) {
            return true;
        } else {
            return false;
        }
    }
}
