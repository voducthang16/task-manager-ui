import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/interfaces/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { ShareDataService } from 'src/app/share-data.service';
import { Users } from 'src/app/interfaces/users';
@Component({
    selector: 'app-list-project-admin',
    templateUrl: './list-project-admin.component.html',
    styleUrls: ['./list-project-admin.component.scss']
})
export class ListProjectAdminComponent implements OnInit {
    constructor(
        private ProjectsService: ProjectsService, 
        private Data: ShareDataService) 
    {}
    // receive component & data from header
    data: string = '';
    component: string | undefined;
    addProjectStatus: boolean = false;
    projectDetailStatus: boolean = false;
    projectId: string = '';
    // list project
    listProject: Projects[] = [];
    listProjectTemp: Projects[] = [];
    updateModalStatus: boolean = false;
    deleteModalStatus: boolean = false;
    ngOnInit(): void {
        this.closeProjectClick();
        this.getAllProject();
        this.updateAndDeleteProject();
        this.Data.currentComponent.subscribe(component => this.component = component);
    };
    // run when value of component is changed
    ngDoCheck() {
        if (this.component == 'list-project-admin') {
            this.Data.currentData.subscribe(data => this.data = data);
        }
        this.filterTask()
    }
    filterTask() {
        this.listProject = this.listProjectTemp.filter(project => project.name.toLowerCase( ).includes(this.data.toLowerCase( )))
    }
    getAllProject() {
        this.ProjectsService.getAllProject().subscribe((list: any) => {
            this.listProject = list;
            this.listProjectTemp = list;
        })
    }
    hideModal(status: boolean) {
        if (status) {
            this.addProjectClick();
            this.getAllProject();
        }
    }
    // show modal add project
    addProjectClick() {
        this.addProjectStatus = !this.addProjectStatus;
    }
    renderMembers(members: Users[]) {
        let html: string = '';
        members.forEach((member) => {
            html += `<h2>${member.lastName} ${member.firstName}</h2>`
        })
        return html;
    }
    // close modal add project
    closeProjectClick() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('.overlay-close.add') || target.matches('.modal.overlay.active.add')) {
                this.addProjectClick();
            }
            if (target.matches('.overlay-close.detail') || target.matches('.modal.overlay.active.detail')) {
                this.projectDetailStatus = !this.projectDetailStatus;
            }
            if (target.matches('.overlay-close.update-project') || target.matches('.modal.overlay.active.update-project')) {
                this.updateModalStatus = !this.updateModalStatus;
            }
            if (target.matches('.overlay-close.delete-project') || target.matches('.modal.overlay.active.delete-project') || target.matches('.btn.delete-project')) {
                this.deleteModalStatus = !this.deleteModalStatus;
            }
        })
    }

    // pass project id to child components
    getProjectId(e: any) {
        this.projectDetailStatus = !this.projectDetailStatus;
        this.projectId = e.target.attributes.id.nodeValue;
    }
    updateAndDeleteProject() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('.role-button')) {
                this.updateModalStatus = !this.updateModalStatus;
                this.projectId = target.getAttribute('data-project-id')!;
            }
            if (target.matches('.delete-button')) {
                this.deleteModalStatus = !this.deleteModalStatus;
                this.projectId = target.getAttribute('data-project-id')!;
            }
        })
    }
    hideUpdateModal(status: boolean) {
        if (status) {
            this.updateModalStatus = !this.updateModalStatus;
            this.getAllProject()
        }
    }
    hideDeleteModal(status: boolean) {
        if (status) {
            this.deleteModalStatus = !this.deleteModalStatus;
            this.getAllProject()
        }
    }
}
