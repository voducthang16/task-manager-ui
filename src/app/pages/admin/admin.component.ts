import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    component: string = '';
    constructor() {}

    ngOnInit(): void {}
    componentActive(component: string) {
        this.component = component;
    }
}
