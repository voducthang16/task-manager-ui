import { Component, OnInit, Input } from '@angular/core';
import { ShareDataService } from 'src/app/share-data.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    constructor(private Data: ShareDataService) {

    }
    data: string | undefined;
    keyword: string = '';
    @Input() component: string | undefined;
    getKeyword(keyword: string) {
        this.keyword = keyword;
        this.Data.changeData(this.keyword);
        this.Data.sendComponent(this.component!);
    }
    ngOnInit(): void {
        this.Data.currentData.subscribe(data => this.data = data);
    }
}
