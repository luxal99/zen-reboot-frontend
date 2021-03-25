import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddReferralSourceDialogComponent} from './add-referral-source-dialog/add-referral-source-dialog.component';

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openAddReferralSourceDialog(): void {
    DialogUtil.openDialog(AddReferralSourceDialogComponent, {
      position: {top: '6%'}
    }, this.dialog);
  }
}
