import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'zen-frontend';

  ngOnInit(): void {
    AOS.init();
  }
}
