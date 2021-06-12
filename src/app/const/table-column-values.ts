import {Column} from '../models/column';

export const APPOINTMENT_ANALYTICS_COLUMNS: Column[] = [
  {name: 'date', displayedName: 'Datum', value: 'date'},
  {name: 'firstName', displayedName: 'Ime', value: 'staff.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'staff.person.lastName'},
  {name: 'treatment', displayedName: 'Tretman', value: 'treatment.name'},
  {name: 'total', displayedName: 'Total', value: 'treatment.price'},
];
export const TOP_CLIENT_COLUMNS: Column[] = [
  {name: 'firstName', displayedName: 'Ime', value: 'client.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'client.person.lastname'},
  {name: 'visit', displayedName: 'Posete', value: 'visits'},
];

export const EXPIRED_PACKAGES_COLUMNS: Column[] = [
  {name: 'firstName', displayedName: 'Ime', value: 'client.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'client.person.lastname'},
  {name: 'price', displayedName: 'Vrednost', value: 'price'},
  {name: 'treatment', displayedName: 'Tretman', value: 'treatmentDuration.treatment.name'},
];
export const INVOICE_ITEMS_COLUMNS: Column[] = [
  {name: 'count', displayedName: 'Broj', value: 'count'},
  {name: 'start', displayedName: 'Početak', value: 'start'},
  {name: 'end', displayedName: 'Kraj', value: 'end'},
  {name: 'type', displayedName: 'Tip', value: 'type'},
  {name: 'value', displayedName: 'Vrednost', value: 'value'},

];
