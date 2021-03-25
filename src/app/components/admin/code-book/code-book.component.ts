import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddReferralSourceDialogComponent} from './add-referral-source-dialog/add-referral-source-dialog.component';
import {ReferralSourceService} from '../../../service/referral-source.service';
import {ReferralSource} from '../../../models/referral-source';
import {MatSpinner} from '@angular/material/progress-spinner';
import {SpinnerService} from '../../../service/spinner.service';

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfReferralSources: ReferralSource[] = [];

  constructor(private dialog: MatDialog, private spinnerService: SpinnerService,
              private referralSourceService: ReferralSourceService) {
  }

  ngOnInit(): void {
    this.getAllReferralSource();
  }

  getAllReferralSource(): void {
    this.referralSourceService.getAll().subscribe((resp) => {
      // @ts-ignore
      this.listOfReferralSources = resp.map((referralSource) => ({
        id: referralSource.id,
        value: referralSource.value,
        createdDate: new Date(referralSource.createdDate),
        lastModifiedDate: new Date(referralSource.lastModifiedDate)
      }));
      this.spinnerService.hide(this.spinner);
    });
  }

  openAddReferralSourceDialog(referralSource: ReferralSource): void {
    DialogUtil.openDialog(AddReferralSourceDialogComponent, {
      position: {top: '6%'},
      data: referralSource
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllReferralSource();
    });
  }
}
