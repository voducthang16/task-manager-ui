import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
    constructor(private UsersService: UsersService) {}
    @Input() userId: string | undefined;
    @Output() hideDelete = new EventEmitter<boolean>();
    ngOnInit(): void {
        console.log(this.userId)
    }
    deleteUser(e: any) {
        e.preventDefault();
        this.UsersService.deleteUser(this.userId!).subscribe(() => {
            alert('Delete user successfully')
            this.hideDelete.emit(true);
        })
    }
}
