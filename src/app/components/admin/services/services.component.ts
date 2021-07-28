import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TreatmentService} from '../../../service/treatment.service';
import {TreatmentCategoryService} from '../../../service/treatment-category.service';
import {TreatmentCategory} from '../../../models/entity/treatment-category';
import {FormBuilderConfig} from '../../../models/util/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../const/const';
import { Validators} from '@angular/forms';
import {DialogUtil} from '../../../util/dialog-util';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {MatSpinner} from '@angular/material/progress-spinner';
import {AddServiceDialogComponent} from './add-service-dialog/add-service-dialog.component';
import {Treatment} from '../../../models/entity/treatment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DefaultComponent} from '../../../util/default-component';
import { setDialogConfig} from '../../../util/dialog-options';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent extends DefaultComponent<TreatmentCategory> implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfTreatments: Treatment[] = [];

  constructor(private dialog: MatDialog, private treatmentService: TreatmentService,
              private treatmentCategoryService: TreatmentCategoryService, protected snackBar: MatSnackBar) {
    super(treatmentCategoryService, snackBar);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddTreatmentCategoryDialog(formValues?: any): void {
    const configData: FormBuilderConfig = {
      service: this.treatmentCategoryService,
      headerText: 'Dodaj kategoriju tretmana',
      formValues,
      formFields: [
        {
          label: 'Naziv kategorije',
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT_TYPE_NAME,
          validation: [Validators.required]
        }
      ]
    };

    DialogUtil.openDialog(FormBuilderComponent, setDialogConfig(
      {
        position: {top: '6%'},
        width: '30%',
        data: configData
      }
    ), this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  openAddServiceDialog(treatment?: Treatment): void {
    DialogUtil.openDialog(AddServiceDialogComponent,       {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: treatment
    }, this.dialog).afterClosed().subscribe(() => {
      this.getItems();
    });
  }

  deleteTreatment(id: number): void {
    super.subscribeDelete(id, this.treatmentService);
  }
}
