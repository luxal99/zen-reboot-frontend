import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ClientService} from '../../../../service/client.service';
import {AppointmentService} from '../../../../service/appointment.service';
import {Client} from '../../../../models/client';
import {CriteriaBuilder} from '../../../../util/criteria-builder';
import {FormControlNames} from '../../../../const/const';

@Component({
  selector: 'app-global-search-dialog',
  templateUrl: './global-search-dialog.component.html',
  styleUrls: ['./global-search-dialog.component.sass']
})
export class GlobalSearchDialogComponent implements OnInit {

  searchText = '';
  listOfClients: Client[] = [];
  listOfAppointments: Client[] = [];

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private clientService: ClientService, private appointmentService: AppointmentService) {
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
        });
    } else if (search.length === 0) {

    }
  }

  searchAppointment(): void {
    const queryBuilder = new CriteriaBuilder();
    queryBuilder.startsWith('staff.person.firstName', this.searchText).or()
      .startsWith('staff.person.lastName', this.searchText).or()
      .startsWith('clients.person.firstName', this.searchText).or()
      .startsWith('clients.person.lastName', this.searchText).or()
      .startsWith('treatmentDuration.treatment.name', this.searchText).or();

    queryBuilder.criteriaList = queryBuilder.criteriaList.filter((searchCriteria) => searchCriteria.secondOperand !== '');
    this.appointmentService.getAll(queryBuilder.buildUrlEncoded()).subscribe((resp) => {
      this.listOfAppointments = resp;
    });
  }

  showSearch(): void {
    // @ts-ignore
    document.getElementById('search').style.display = 'block';
    // @ts-ignore
    document.getElementById('huge-label').style.display = 'none';


  }
}
