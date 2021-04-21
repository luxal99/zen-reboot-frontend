import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Client} from '../../../../models/client';
import {ClientService} from '../../../../service/client.service';

@Component({
  selector: 'app-client-overview-dialog',
  templateUrl: './client-overview-dialog.component.html',
  styleUrls: ['./client-overview-dialog.component.sass']
})
export class ClientOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, public clientService: ClientService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

}
