import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../../../service/client.service';
import {Client} from '../../../models/client';
import {DialogUtil} from '../../../util/dialog-util';
import {AddClientDialogComponent} from './add-client-dialog/add-client-dialog.component';
import {SpinnerService} from '../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfClients: Client[] = [];

  searchForm = new FormGroup({
    search: new FormControl()
  });

  searchText = '';

  constructor(private dialog: MatDialog, private clientService: ClientService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.clientService.getAll().subscribe((resp) => {
      this.listOfClients = resp;
      this.spinnerService.hide(this.spinner);
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
