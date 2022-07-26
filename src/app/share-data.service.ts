import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ShareDataService {
    private data = new BehaviorSubject<string>('');
    currentData = this.data.asObservable();
    private component = new BehaviorSubject<string>('');
    currentComponent = this.component.asObservable();
    constructor() {}
    changeData(data: string) {
        this.data.next(data);
    }
    sendComponent(component: string) {
        this.component.next(component);
    }
}
