import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {


    @Input() showNext = true;
    @Output() next = new EventEmitter();
    @Output() prev = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

}
