import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthGuard} from '../../../guards/auth.guard';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {TokenConst} from '../../../const/const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @ViewChild('mn') menu!: MatMenu;
  @Input() header = '';
  username = '';
  @Output() openSideNav = new EventEmitter();

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await this.getUsername();
  }

  async getUsername(): Promise<void> {
    AuthGuard.getAuthUser().then((resp) => {
      // @ts-ignore
      this.username = resp.username;
    });

  }


  rotateOnOpen(): void {
    // @ts-ignore
    document.getElementById('button-icon').style.transform = 'rotate(-90deg)';
  }

  rotateOnClose(): void {
    // @ts-ignore
    document.getElementById('button-icon').style.transform = 'rotate(0deg)';
  }

  logout(): void {
    sessionStorage.removeItem(TokenConst.NAME);
    location.reload();
  }
}
