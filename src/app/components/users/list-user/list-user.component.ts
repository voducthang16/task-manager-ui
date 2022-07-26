import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../../interfaces/users'
import { ShareDataService } from 'src/app/share-data.service';
@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
    listUser: Users[] = [];
    listUserTemp: Users[] = [];
    // receive component & data from header
    component: string | undefined;
    data: string = '';
    addStatusModal: boolean = false;
    updateModalStatus: boolean = false;
    deleteModalStatus: boolean = false;
    userId: string | undefined;
    constructor(private UsersService: UsersService, private Data: ShareDataService) {
    }
    area(value: string) {
        if (value == 'south') {
            return 'Nam';
        } else if (value == 'north') {
            return 'Bắc'
        } else {
            return 'Trung'
        }
    }
    role(value: number) {
        if (value == 0) {
            return 'Quản trị viên';
        } else if (value == 1) {
            return 'Nhóm trưởng'
        } else {
            return 'Nhân viên'
        }
    }
    changeStatus() {
        this.addStatusModal = !this.addStatusModal;
    }
    ngOnInit() {
        this.Data.currentComponent.subscribe(component => this.component = component);
        this.getAllUser();
        this.closeModalClick();
        this.updateAndDeleteUser();
        // this.filterRole();
    }
    getAllUser() {
        this.UsersService.getUserList().subscribe((list: any) => {
            this.listUser = list;
            this.listUserTemp = list;
        })
    }
    // run when value of component is changed
    ngDoCheck() {
        if (this.component == 'list-user') {
            this.Data.currentData.subscribe(data => this.data = data);
        }
        this.filterName()
    }
    filterName() {
        this.listUser = this.listUserTemp.filter(user => user.firstName.toLowerCase( ).includes(this.data.toLowerCase( )))
    }
    hideAddModal(status: boolean) {
        if (status) {
            this.changeStatus();
            this.getAllUser();
        }
    }
    closeModalClick() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('.add-user.overlay-close') || target.matches('.add-user.modal.overlay.active')) {
                this.changeStatus()
            }
            if (target.matches('.update-user.overlay-close') || target.matches('.update-user.modal.overlay.active')) {
                this.updateModalStatus = !this.updateModalStatus;
            }
            if (target.matches('.delete-user.overlay-close') || target.matches('.delete-user.modal.overlay.active') || target.matches('.btn.delete-user')) {
                this.deleteModalStatus = !this.deleteModalStatus;
            }
        })
    }
    updateAndDeleteUser() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.matches('.role-button')) {
                this.updateModalStatus = !this.updateModalStatus;
                this.userId = target.getAttribute('data-user-id')!;
            }
            if (target.matches('.delete-button')) {
                this.deleteModalStatus = !this.deleteModalStatus;
                this.userId = target.getAttribute('data-user-id')!;
            }
        })
    }
    hideUpdateModal(status: boolean) {
        if (status) {
            this.updateModalStatus = !this.updateModalStatus;
            this.getAllUser();
        }
    }
    hideDeleteModal(status: boolean) {
        if (status) {
            this.deleteModalStatus = !this.deleteModalStatus;
            this.getAllUser();
        }
    }
    // filterRole() {
    //     const nodeList = document.querySelectorAll('.role-tab');
    //     nodeList.forEach(node => {
    //         node.addEventListener('click', e => {
    //             const target = e.target as any;
    //             const role = target!.getAttribute('data-role')!; 
    //             if (Number(role) >= 0) {
    //                 this.listUser = this.listUserTemp.filter(user => user.role == role);
    //             } else {
    //                 this.listUser = this.listUserTemp;
    //             }
    //             console.log(this.listUser);
    //         })
    //     })
    // }
}
