import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Client} from '../../../../models/client';

@Component({
  selector: 'app-client-overview-dialog',
  templateUrl: './client-overview-dialog.component.html',
  styleUrls: ['./client-overview-dialog.component.sass']
})
export class ClientOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) {
  }

  ngOnInit(): void {
  }

}
