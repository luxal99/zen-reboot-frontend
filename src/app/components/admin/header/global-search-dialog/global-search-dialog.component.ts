import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ClientService} from '../../../../service/client.service';
import {AppointmentService} from '../../../../service/appointment.service';
import {Client} from '../../../../models/entity/client';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {FormControlNames} from '../../../../const/const';
import {Appointment} from '../../../../models/entity/appointment';
import {DialogUtil} from '../../../../util/dialog-util';
import {AppointmentOverviewDialogComponent} from '../../appointment/appointment-overview-dialog/appointment-overview-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {setDialogConfig} from '../../../../util/dialog-options';
import {ClientOverviewDialogComponent} from '../../client/client-overview-dialog/client-overview-dialog.component';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Spinner} from '@angular/cli/utilities/spinner';
import {SpinnerService} from '../../../../service/spinner.service';

@Component({
  selector: 'app-global-search-dialog',
  templateUrl: './global-search-dialog.component.html',
  styleUrls: ['./global-search-dialog.component.sass']
})
export class GlobalSearchDialogComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  searchText = '';
  listOfClients: Client[] = [];
  listOfAppointments: Appointment[] = [];

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private clientService: ClientService, private appointmentService: AppointmentService,
              private dialog: MatDialog, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
  }

  inputChange(): void {
    if (this.searchText.length === 0) {
      // @ts-ignore
      document.getElementById('search').style.display = 'none';
      // @ts-ignore
      document.getElementById('huge-label').style.display = 'block';

      // @ts-ignore
      document.getElementById('centered').style.minHeight = '70vh';
      this.listOfClients = [];
      this.listOfAppointments = [];
    } else if (this.searchText.length > 1) {
      // @ts-ignore
      document.getElementById('search').style.display = 'block';
      // @ts-ignore
      document.getElementById('huge-label').style.display = 'none';
      // @ts-ignore
      document.getElementById('centered').style.minHeight = '30vh';
      this.searchClient();
      this.searchAppointment();

    }
  }

  searchClient(): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    const search: string = this.searchText;
    queryBuilder.startsWith('person.firstName', search).or()
      .startsWith('person.contacts.value', search);
    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    if (search.length > 1) {
      this.clientService.getAllSearchByQueryParam(queryBuilder.buildUrlEncoded())
        .pipe()
        .subscribe((resp) => {
          this.listOfClients = resp;
          this.listOfClients = this.listOfClients.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

          this.spinnerService.hide(this.spinner);
        });
    } else if (search.length === 0) {

    }
  }

  searchAppointment(): void {
    this.spinnerService.show(this.spinner);
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith('staff.person.firstName', this.searchText).or()
      .startsWith('staff.person.lastName', this.searchText).or()
      .startsWith('clients.person.firstName', this.searchText).or()
      .startsWith('clients.person.lastName', this.searchText).or()
      .startsWith('treatmentDuration.treatment.name', this.searchText).or();

    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    this.appointmentService.getAll(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfAppointments = resp;
      this.listOfAppointments = this.listOfAppointments.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      this.spinnerService.hide(this.spinner);
    });
  }

  showSearch(): void {
    // @ts-ignore
    document.getElementById('search').style.display = 'block';
    // @ts-ignore
    document.getElementById('huge-label').style.display = 'none';
  }

  openAppointmentOverviewDialog(data: Appointment): void {
    DialogUtil.openDialog(AppointmentOverviewDialogComponent, setDialogConfig({
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data
    }), this.dialog);

  }

  openClientOverviewDialog(data: Client): void {
    DialogUtil.openDialog(ClientOverviewDialogComponent, setDialogConfig({
      position: {right: '0'},
      width: '95%',
      height: '100vh',
      data
    }), this.dialog);
  }
}
