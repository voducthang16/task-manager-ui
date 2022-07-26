import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AppComponent } from 'src/app/app.component';
import { Areas } from 'src/app/interfaces/areas';
import { Users } from 'src/app/interfaces/users';
@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss'],
    providers: [ AppComponent ]
})
export class UpdateUserComponent implements OnInit {
    constructor(
        private UsersService: UsersService,
        private AppComponent: AppComponent
    ) {}
    @Input() userId: string | undefined;
    listArea: Areas[] = [];
    user: Users = <Users>{};
    ngOnInit(): void {
        this.listArea = this.AppComponent.listAreas;
        this.UsersService.getOneUser(this.userId!).subscribe((list: any) => this.user = list[0]);
    }
    @Output() hideUpdate = new EventEmitter<boolean>();
    updateUser(e: any) {
        e.preventDefault()
        this.UsersService.updateUser(this.userId!, this.user)
        .subscribe(() => {
            alert('Update User Successfully');
            this.hideUpdate.emit(true);
        })
    }
}
