import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../../../service/client.service';
import {Client} from '../../../models/client';
import {DialogUtil} from '../../../util/dialog-util';
import {AddClientDialogComponent} from './add-client-dialog/add-client-dialog.component';
import {MatSpinner} from '@angular/material/progress-spinner';
import {FormControl, FormGroup} from '@angular/forms';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {FormControlNames, Message} from '../../../const/const';
import {ClientOverviewDialogComponent} from './client-overview-dialog/client-overview-dialog.component';
import {DefaultComponent} from '../../../util/default-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CriteriaBuilder} from '../../../util/criteria-builder';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent extends DefaultComponent<Client> implements OnInit {

  numberOfPage = 0;
  @ViewChild('spinner') spinner!: MatSpinner;

  searchForm = new FormGroup({
    search: new FormControl()
  });

  searchText = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private dialog: MatDialog, private clientService: ClientService, protected snackBar: MatSnackBar) {
    super(clientService, snackBar);
  }

  ngOnInit(): void {
    this.getClientWithPagination();
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.like('person.firstName', 'aleksa');
    console.log(queryBuilder.buildUrlEncoded());
  }

  getClientWithPagination(): void {
    this.clientService.getPaginationClients(this.numberOfPage).subscribe((clients) => {
      this.listOfItems = clients;
      this.spinnerService.hide(this.spinner);
    });
  }

  getNext(): void {

    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(++this.numberOfPage).subscribe((clients) => {
      this.listOfItems = clients;
      this.spinnerService.hide(this.spinner);
    });
  }

  getPrevious(): void {
    if (this.numberOfPage !== 0) {
      this.spinnerService.show(this.spinner);
      this.clientService.getPaginationClients(--this.numberOfPage).subscribe((clients) => {
        this.listOfItems = clients;
        this.spinnerService.hide(this.spinner);
      });
    }
  }

  openAddClientDialog(): void {
    DialogUtil.openDialog(AddClientDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    }, this.dialog).afterClosed().subscribe(() => {
      this.getCurrentPage();
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
      this.getCurrentPage();
    });
  }

  openClientOverviewDialog(data: Client): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent, {
      position: {right: '0'},
      width: '95%',
      height: '100vh'
    }, this.dialog);
  }

  getCurrentPage(): void {
    this.spinnerService.show(this.spinner);
    this.clientService.getPaginationClients(this.numberOfPage).subscribe((clients) => {
      this.listOfItems = clients;
      this.spinnerService.hide(this.spinner);
    });
  }

  deleteClient(id: number): void {
    console.log(id);
    this.spinnerService.show(this.spinner);
    this.clientService.delete(id).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
      this.getCurrentPage();
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }

  search(): void {
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith('person.firstName', this.searchForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value).or()
      .startsWith('person.contacts.value', this.searchForm.get(FormControlNames.SEARCH_FORM_CONTROL)?.value);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand);
    this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
      .pipe()
      .subscribe((resp) => {
        this.listOfItems = resp;
      });
  }
}
