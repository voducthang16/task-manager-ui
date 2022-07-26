import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
@Component({
    selector: 'app-delete-task',
    templateUrl: './delete-task.component.html',
    styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {
    constructor(private TasksService: TasksService) {}
    @Input() taskId: string | undefined;
    @Output() hideDelete = new EventEmitter<boolean>();
    ngOnInit(): void {}
    submitForm() {
        return this.TasksService.deleteTask(this.taskId!).subscribe(() => {
            alert('Delete task Successfully');
            this.hideDelete.emit(true);
        })
    }
}