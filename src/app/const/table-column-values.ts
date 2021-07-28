import {Column} from '../models/util/column';

export const APPOINTMENT_ANALYTICS_COLUMNS: Column[] = [
  {name: 'date', displayedName: 'Datum', value: 'date'},
  {name: 'firstName', displayedName: 'Ime', value: 'staff.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'staff.person.lastName'},
  {name: 'treatment', displayedName: 'Tretman', value: 'treatment.name'},
  {name: 'total', displayedName: 'Total', value: 'treatment.price'},
];
export const TOP_CLIENTS_COLUMNS: Column[] = [
  {name: 'firstName', displayedName: 'Ime', value: 'client.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'client.person.lastName'},
  {name: 'visit', displayedName: 'Posete', value: 'visits'},
];

export const EXPIRED_PACKAGES_COLUMNS: Column[] = [
  {name: 'firstName', displayedName: 'Ime', value: 'client.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'client.person.lastName'},
  {name: 'price', displayedName: 'Vrednost', value: 'price'},
  {name: 'treatment', displayedName: 'Tretman', value: 'treatmentDuration.treatment.name'},
];

export const EXPIRED_VOUCHERS_COLUMNS: Column[] = [
  {name: 'code', displayedName: 'Kod', value: 'code'},
  {name: 'firstName', displayedName: 'Ime', value: 'client.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'client.person.lastName'},
  {name: 'price', displayedName: 'Vrednost', value: 'price'},
  {name: 'type', displayedName: 'Tip', value: 'type'},
  {name: 'start', displayedName: 'Početak', value: 'startDate'},
  {name: 'end', displayedName: 'Kraj', value: 'endDate'},
];
export const INVOICE_ITEMS_COLUMNS: Column[] = [
  {name: 'count', displayedName: 'Broj', value: 'count'},
  {name: 'start', displayedName: 'Početak', value: 'start'},
  {name: 'end', displayedName: 'Kraj', value: 'end'},
  {name: 'type', displayedName: 'Tip', value: 'type'},
  {name: 'value', displayedName: 'Vrednost', value: 'value'},

];
export const RETURNING_CLIENTS_COLUMNS: Column[] = [
  {name: 'firstName', displayedName: 'Ime', value: 'person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'person.lastName'},
  {name: 'referralSource', displayedName: 'Način dolaska', value: 'referralSource.value'},
];
export const STAFF_EARNED_COLUMNS: Column[] = [
  {name: 'firstName', displayedName: 'Ime', value: 'staff.person.firstName'},
  {name: 'lastName', displayedName: 'Prezime', value: 'staff.person.lastName'},
  {name: 'count', displayedName: 'Količina', value: 'count'},
  {name: 'earned', displayedName: 'Vrednost', value: 'earned'},
];

export const PROFIT_COLUMNS: Column[] = [
  {name: 'start', displayedName: 'Početak', value: 'start'},
  {name: 'end', displayedName: 'Kraj', value: 'end'},
  {name: 'expenseCount', displayedName: 'Broj troškova', value: 'expenseCount'},
  {name: 'invoiceCount', displayedName: 'Broj faktura', value: 'invoiceCount'},
  {name: 'profit', displayedName: 'Profit', value: 'profit'},
  {name: 'spent', displayedName: 'Potrošeno', value: 'spent'},
];
