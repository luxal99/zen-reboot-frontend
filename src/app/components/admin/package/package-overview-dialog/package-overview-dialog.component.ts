import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Package} from '../../../../models/package';

@Component({
  selector: 'app-package-overview-dialog',
  templateUrl: './package-overview-dialog.component.html',
  styleUrls: ['./package-overview-dialog.component.sass']
})
export class PackageOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Package) {
  }

  ngOnInit(): void {
  }

}
