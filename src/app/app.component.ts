import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { Areas } from './interfaces/areas';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor (
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['title']) {
                        return child.snapshot.data['title'];
                    } else {
                        return null;
                    }
                }
                return null;
            })
        ).subscribe((data: any) => {
            if (data) {
                this.title.setTitle(data + ' - Vo Duc Thang');
            }
        });
    }
    listAreas: Areas[] = [
        {
            value: 'north',
            name: 'Bắc'
        },
        {
            value: 'central',
            name: 'Trung'
        },
        {
            value: 'south',
            name: 'Nam'
        },
    ]
}
