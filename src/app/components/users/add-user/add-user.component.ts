import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Areas } from 'src/app/interfaces/areas';
import { RegisterService } from 'src/app/services/register.service';
@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    constructor(
        private RegisterService: RegisterService,
        private AppComponent: AppComponent
    ) {}

    ngOnInit(): void {}
    listAreas: Areas[] = this.AppComponent.listAreas;
    @Output () hideModal = new EventEmitter<boolean>();

    onSubmit(form: any) {
        this.RegisterService.createUser(form.lastName, form.firstName, form.email, 'default', form.area, +form.role, 1)
        .subscribe(() => {
            alert('Add User Successfully');
            this.hideModal.emit(true);
        })
    }
}
