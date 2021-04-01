import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
    StaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [AddServiceDialogComponent, AddClientDialogComponent, ClientOverviewDialogComponent,
    FormBuilderComponent, OverviewComponent, StaffComponent, ServicesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
