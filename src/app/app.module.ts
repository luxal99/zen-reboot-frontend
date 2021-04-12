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
import {CalendarModule} from 'angular-calendar';
import {SchedulerModule} from 'angular-calendar-scheduler';
import { ReferralSourceOverviewComponent } from './components/admin/code-book/referral-source-overview/referral-source-overview.component';
import { CountriesOverviewComponent } from './components/admin/code-book/countries-overview/countries-overview.component';
import { LocationOverviewComponent } from './components/admin/code-book/location-overview/location-overview.component';
import { AddLocationDialogComponent } from './components/admin/code-book/location-overview/add-location-dialog/add-location-dialog.component';

// @ts-ignore
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
    AddLocationDialogComponent
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

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}

  ],
  entryComponents: [AddServiceDialogComponent, AddClientDialogComponent, ClientOverviewDialogComponent,
    FormBuilderComponent, OverviewComponent, StaffComponent, ServicesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
