import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {

  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();
  initGap = 0;
  isDisabledPrev10: any;
  isDisabledNext10: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
