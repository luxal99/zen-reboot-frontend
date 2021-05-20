import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS} from '@angular-material-components/color-picker';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {LoginComponent} from './components/login/login.component';
import {FormInputComponent} from './components/form-components/form-input/form-input.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminComponent} from './components/admin/admin.component';
import {OverviewComponent} from './components/admin/overview/overview.component';
import {HeaderComponent} from './components/admin/header/header.component';
import {ClientComponent} from './components/admin/client/client.component';
import {CodeBookComponent} from './components/admin/code-book/code-book.component';
import {AddClientDialogComponent} from './components/admin/client/add-client-dialog/add-client-dialog.component';
import {FormSelectComponent} from './components/form-components/form-select/form-select.component';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {ServicesComponent} from './components/admin/services/services.component';
import {FormBuilderComponent} from './components/form-components/form-builder/form-builder.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import {ClientPipe} from './pipes/client.pipe';
import {ClientOverviewDialogComponent} from './components/admin/client/client-overview-dialog/client-overview-dialog.component';
import {AddServiceDialogComponent} from './components/admin/services/add-service-dialog/add-service-dialog.component';
import {StaffComponent} from './components/admin/staff/staff.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AddStaffDialogComponent} from './components/admin/staff/add-staff-dialog/add-staff-dialog.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {StaffPipe} from './pipes/staff.pipe';
import {StaffShiftsOverviewComponent} from './components/admin/staff/staff-shifts-overview/staff-shifts-overview.component';
import {StaffOverviewComponent} from './components/admin/staff/staff-overview/staff-overview.component';
import {ReferralSourceOverviewComponent} from './components/admin/code-book/referral-source-overview/referral-source-overview.component';
import {CountriesOverviewComponent} from './components/admin/code-book/countries-overview/countries-overview.component';
import {LocationOverviewComponent} from './components/admin/code-book/location-overview/location-overview.component';
import {AddLocationDialogComponent} from './components/admin/code-book/location-overview/add-location-dialog/add-location-dialog.component';
import {AddShiftDialogComponent} from './components/admin/staff/staff-shifts-overview/add-shift-dialog/add-shift-dialog.component';
import {AppointmentComponent} from './components/admin/appointment/appointment.component';
import {ComponentActivatorComponent} from './components/admin/component-activator/component-activator.component';
import {AddAppointmentDialogComponent} from './components/admin/appointment/add-appointment-dialog/add-appointment-dialog.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CheckIsAppointmentStartPipe} from './pipes/check-is-appointment-start.pipe';
import {CheckIsAppointmentBetweenPipe} from './pipes/check-is-appointment-between.pipe';
import {AppointmentOverviewDialogComponent} from './components/admin/appointment/appointment-overview-dialog/appointment-overview-dialog.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {CheckShiftPipe} from './pipes/chech-shift.pipe';
import {EmptyResultComponent} from './components/empty-result/empty-result.component';
import {InvoiceOverviewComponent} from './components/admin/invoice-overview/invoice-overview.component';
import {EditInvoiceDialogComponent} from './components/admin/appointment/appointment-overview-dialog/edit-invoice-dialog/edit-invoice-dialog.component';
import {FindClientPhoneNumberPipe} from './pipes/find-client-phone-number.pipe';
import {InvoiceTableBindingComponent} from './components/table-binding/invoice-table-binding.component';
import {SumGrossPipe} from './pipes/sum-gross.pipe';
import { InvoicesDialogOverviewComponent } from './components/table-binding/invoices-dialog-overview/invoices-dialog-overview.component';
import { VouchersComponent } from './vouchers/vouchers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormInputComponent,
    AdminComponent,
    OverviewComponent,
    HeaderComponent,
    ClientComponent,
    CodeBookComponent,
    AddClientDialogComponent,
    FormSelectComponent,
    CapitalizePipe,
    ServicesComponent,
    FormBuilderComponent,
    DynamicFieldDirective,
    ClientPipe,
    ClientOverviewDialogComponent,
    AddServiceDialogComponent,
    StaffComponent,
    AddStaffDialogComponent,
    StaffPipe,
    StaffShiftsOverviewComponent,
    StaffOverviewComponent,
    ReferralSourceOverviewComponent,
    CountriesOverviewComponent,
    LocationOverviewComponent,
    AddLocationDialogComponent,
    AddShiftDialogComponent,
    AppointmentComponent,
    ComponentActivatorComponent,
    AddAppointmentDialogComponent,
    CheckIsAppointmentStartPipe,
    CheckIsAppointmentBetweenPipe,
    AppointmentOverviewDialogComponent,
    PaginatorComponent,
    CheckShiftPipe,
    EmptyResultComponent,
    InvoiceOverviewComponent,
    EditInvoiceDialogComponent,
    FindClientPhoneNumberPipe,
    InvoiceTableBindingComponent,
    SumGrossPipe,
    InvoicesDialogOverviewComponent,
    VouchersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ColorPickerModule,
    MaterialModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CKEditorModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}

  ],
  entryComponents:
    [
      AddAppointmentDialogComponent, AddServiceDialogComponent,
      AddClientDialogComponent, AppointmentOverviewDialogComponent, ClientOverviewDialogComponent,
      FormBuilderComponent, OverviewComponent, StaffComponent,
      InvoiceOverviewComponent, EditInvoiceDialogComponent,
      ServicesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
