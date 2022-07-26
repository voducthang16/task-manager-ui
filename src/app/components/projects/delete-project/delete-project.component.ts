import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
@Component({
    selector: 'app-delete-project',
    templateUrl: './delete-project.component.html',
    styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {
    constructor(
        private ProjectsService: ProjectsService
    ) {}
    @Input() id: string | undefined;
    @Output() hideDelete = new EventEmitter<boolean>();
    ngOnInit(): void {
    }
    submitForm() {
        return this.ProjectsService.deleteProject(this.id!).subscribe(() => {
            alert('Delete project Successfully');
            this.hideDelete.emit(true);
        })
    }
}