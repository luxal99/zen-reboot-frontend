import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../../../service/client.service';
import {Client} from '../../../models/client';
import {DialogUtil} from '../../../util/dialog-util';
import {AddClientDialogComponent} from './add-client-dialog/add-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  listOfClients: Client[] = [];

  constructor(private dialog: MatDialog, private clientService: ClientService) {
  }

  ngOnInit(): void {
  }

  getAllClients(): void {
    this.clientService.getAll().subscribe((resp) => {
      this.listOfClients = resp;
    });
  }

  openAddClientDialog(): void {
    DialogUtil.openDialog(AddClientDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllClients();
    });
  }
}
