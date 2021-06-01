import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Package} from '../../../../models/package';

@Component({
  selector: 'app-package-overview-dialog',
  templateUrl: './package-overview-dialog.component.html',
  styleUrls: ['./package-overview-dialog.component.sass']
})
export class PackageOverviewDialogComponent implements OnInit {

  @Input() pcg!: Package;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Package) {
  }

  ngOnInit(): void {
    if (this.pcg) {
      this.data = this.pcg;
    }
  }

}
