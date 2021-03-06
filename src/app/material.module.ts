import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatDialogModule,
    DragDropModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatStepperModule,
    MatMenuModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    PortalModule,
    MatSnackBarModule,
    MatInputModule,
    ScrollingModule,
    DragDropModule,
    MatTabsModule
  ],
  declarations: []
})

export class MaterialModule {
}
