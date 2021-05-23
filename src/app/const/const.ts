export class RestServices {
  static AUTH = 'http://api.reboot.zen.7aske.xyz/login';
}

export const SELECTED_CLASS_NAME = 'selected';

export class FormControlNames {
  static USERNAME_NAME_FORM_CONTROL = 'username';
  static PASSWORD_NAME_FORM_CONTROL = 'password';
  static COUNTRY_FORM_CONTROL = 'country';
  static VALUE_FORM_CONTROL = 'value';
  static NAME_FORM_CONTROL = 'name';
  static FIRST_NAME_FORM_CONTROL = 'firstName';
  static LAST_NAME_FORM_CONTROL = 'lastName';
  static CATEGORY_FORM_CONTROL = 'category';
  static DESCRIPTION_FORM_CONTROL = 'description';
  static DURATION_FORM_CONTROL = 'treatmentDuration';
  static PRICE_FORM_CONTROL = 'price';
  static NOTES_FORM_CONTROL = 'notes';
  static EMAIL_FORM_CONTROL = 'email';
  static LANGUAGE_FORM_CONTROL = 'language';
  static REFERRAL_SOURCE_FORM_CONTROL = 'referralSource';
  static STREET_FORM_CONTROL = 'street';
  static GENDER_FORM_CONTROL = 'gender';
  static NOTIFICATION_METHOD_FORM_CONTROL = 'notificationMethod';
  static NUMBER_FORM_CONTROL = 'number';
  static MOBILE_PHONE_FORM_CONTROL = 'mobilePhone';
  static OTHER_PHONE_FORM_CONTROL = 'otherPhone';
  static OTHER_PHONE_PREFIX_FORM_CONTROL = 'otherPhonePrefix';
  static MOBILE_PHONE_PREFIX_FORM_CONTROL = 'mobilePhonePrefix';
  static CITY_FORM_CONTROL = 'city';
  static COLOR_FORM_CONTROL = 'color';
  static SEARCH_FORM_CONTROL = 'search';
  static SEARCH_CLIENT_FORM_CONTROL = 'searchClient';
  static SEARCH_BILLED_CLIENT_FORM_CONTROL = 'searchBilledClient';
  static START_TIME_FORM_CONTROL = 'startTime';
  static END_TIME_FORM_CONTROL = 'endTime';
  static LOCATION_FORM_CONTROL = 'location';
  static REPEAT_TYPE = 'repeatType';
  static REPEAT_COUNT_FORM_CONTROL = 'repeatCount';
  static STAFF_FORM_CONTROL = 'staff';
  static CLIENT_FORM_CONTROL = 'client';
  static TREATMENT_FORM_CONTROL = 'treatment';
  static APPOINTMENT_STATUS_FORM_CONTROL = 'appointmentStatus';
  static ROOM_FORM_CONTROL = 'room';
  static INVOICE_STATUS_FORM_CONTROL = 'invoiceStatus';
  static START_DATE_FORM_CONTROL = 'startDate';
  static END_DATE_FORM_CONTROL = 'endDate';
  static COUNT_FORM_CONTROL = 'count';
  static DISCOUNT_FORM_CONTROL = 'discount';
  static PAYMENT_METHOD_FORM_CONTROL = 'paymentMethod';
  static TYPE_FORM_CONTROL = 'type';
}

export class InputTypes {
  static INPUT_TYPE_NAME = 'input';
  static SELECT_TYPE_NAME = 'select';
  static PASSWORD_TYPE_NAME = 'password';
  static TIME = 'time';
  static NUMBER = 'number';
}

export class Token {
  static HEADER_NAME = 'Authorization';
}

export class SpinnerOptions {
  static BLOCK = 'block';
  static NONE = 'none';
}

export class Pages {
  static LOGIN_PAGE_ROUTE = '/login';
}

export class Message {
  static SUCCESS = 'Uspešno';
  static ERR = 'Dogodila se greška';
}

export class RestRoutesConst {
  static API = 'http://api.reboot.zen.7aske.xyz/';
  //  static API = 'http://localhost:8080/zen/';
  static REFERRAL_SOURCES = 'referral-sources';
  static CLIENT = 'clients';
  static TREATMENT_CATEGORY = 'treatment-categories';
  static COUNTRY = 'countries';
  static CITY = 'cities';
  static TREATMENT = 'treatments';
  static STAFF = 'staffs';
  static LOCATION = 'locations';
  static ROOM = 'rooms';
  static SHIFT = 'shifts';
  static APPOINTMENT = 'appointments';
  static TREATMENT_DURATION = 'treatment-durations';
  static APPOINTMENT_STATUS = 'appointment-statuses';
  static INVOICE = 'invoices';
  static INVOICE_STATUS = 'invoice-statuses';
  static VOUCHER = 'vouchers';
  static PAYMENT_METHOD = 'payment-methods';
  static EXPENSE = 'expenses';
  static EXPENSE_TYPE = 'expense-types';
}

export class TokenConst {
}

export const EMAIL_REGEX = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';

export class AppointmentStatuses {
  static NEW = 'NEW';
  static CANCELED = 'CANCELED';
  static COMPLETED = 'COMPLETED';
}
