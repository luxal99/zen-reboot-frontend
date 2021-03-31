import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../../../service/client.service';
import {Client} from '../../../models/client';
import {DialogUtil} from '../../../util/dialog-util';
import {AddClientDialogComponent} from './add-client-dialog/add-client-dialog.component';
import {SpinnerService} from '../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FormControl, FormGroup} from '@angular/forms';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Message} from '../../../const/const';
import {ClientOverviewDialogComponent} from './client-overview-dialog/client-overview-dialog.component';

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
              private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
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

  openEditClientDialog(data: Client): void {
    DialogUtil.openDialog(AddClientDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllClients();
    });
  }

  openClientOverviewDialog(data: Client): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent, {
      position: {right: '0'},
      width: '95%',
      height: '100vh'
    }, this.dialog);
  }

  deleteClient(id: number): void {
    console.log(id);
    this.spinnerService.show(this.spinner);
    this.clientService.delete(id).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
      this.getAllClients();
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }
}
