import { Component, OnInit, Input } from '@angular/core';
import { Projects } from 'src/app/interfaces/projects';
import { Tasks } from 'src/app/interfaces/tasks';
import { Users } from 'src/app/interfaces/users';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';
@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
    @Input() id: string | undefined;
    leader: Users = <Users>{};
    members: Users[] = [];
    project: Projects = <Projects>{};
    task: Tasks[] = [];
    constructor(
        private TasksService: TasksService,
        private ProjectsService: ProjectsService
    ) {}
    
    ngOnInit(): void {
        this.ProjectsService.getOne(this.id!).subscribe((list: any) => {
            this.project = list[0];
            this.leader = list[0].leader;
            this.members = list[0].members;
        })
        this.TasksService.getTaskListByProjectId(this.id!).subscribe((list: any) => {
            this.task = list;
        })
    }
}
