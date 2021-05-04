import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input() header = '';
  @Output() openSideNav = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
