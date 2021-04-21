import {Component, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {


  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
