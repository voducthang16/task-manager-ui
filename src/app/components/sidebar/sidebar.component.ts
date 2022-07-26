import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [LoginComponent]
})
export class SidebarComponent implements OnInit {
    constructor(private router: Router, private user: LoginComponent) {

    }
    userType: any = {};
    role: number = 0;
    href: string = '';
    ngOnInit(): void {
        this.href = this.router.url;
        this.user.userType.subscribe(value => this.userType = value)
        if (!this.userType) {
            this.router.navigate(['/login'])
        } else {
            this.role = this.userType.role;
        }
        this.divideRouterLink(this.role, this.href);
        setTimeout(() => {
            this.activeSidebarItem();
        }, 1)
    }
    @Output () componentActive = new EventEmitter<string>();
    activeSidebarItem() {
        let itemElements = document.querySelectorAll('.item');
        let defaultItem: HTMLElement;
        itemElements.forEach((item, index) => {
            item.addEventListener('click', () => {
                defaultItem = document.querySelector('.item.default-active')!;
                defaultItem.classList.remove('default-active');
                itemElements[index].classList.add('default-active');
                this.componentActive.emit(itemElements[index].getAttribute('data-component')!)
            })
        })
    }
    permissionElement(href: string) {
        return `
            <div style="
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity linear 0.2s;
                background-color: rgba(0, 0, 0, 0.3);
            ">
                <div style="
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: 600px;
                    padding: 32px;
                    background: var(--white-color);
                    border-radius: 8px;
                    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
                ">
                <h3 style="
                    align-self: center;
                    font-size: 2.2rem;
                    margin-bottom: 16px;
                ">
                You do not have permission to access this page</h3>
                <a href="${href}" style="align-self: center;" type="button" class="btn">OK</a>
                </div>
            </div>
        `
    }
    divideRouterLink(role: number, path: string) {
        let appElement = document.querySelector('.app')!;
        let directPath: string = '/';
        if (role === 1) {
            directPath = '/leader';
        } else if (role === 2) {
            directPath = '/member';
        }
        if (role !== 0 && path === '/') {
            appElement.innerHTML = this.permissionElement(directPath)
        }
        if (role !== 1 && path === '/leader') {
            appElement.innerHTML = this.permissionElement(directPath)
        }
        if (role !== 2 && path === '/member') {
            appElement.innerHTML = this.permissionElement(directPath)
        }
    }
}
