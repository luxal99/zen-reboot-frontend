import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../../service/spinner.service';
import {TreatmentService} from '../../../service/treatment.service';
import {TreatmentCategoryService} from '../../../service/treatment-category.service';
import {TreatmentCategory} from '../../../models/treatment-category';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../const/const';
import {Validators} from '@angular/forms';
import {DialogUtil} from '../../../util/dialog-util';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {MatSpinner} from '@angular/material/progress-spinner';
import {AddServiceDialogComponent} from './add-service-dialog/add-service-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfTreatmentCategory: TreatmentCategory[] = [];

  constructor(private dialog: MatDialog, private spinnerService: SpinnerService,
              private treatmentService: TreatmentService, private treatmentCategoryService: TreatmentCategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.treatmentCategoryService.getAll().subscribe((resp) => {
      this.listOfTreatmentCategory = resp;
      this.spinnerService.hide(this.spinner);
    });
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

    DialogUtil.openDialog(FormBuilderComponent, {
      position: {top: '6%'},
      width: '30%',
      data: configData
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllCategories();
    });
  }

  openAddServiceDialog(): void {
    DialogUtil.openDialog(AddServiceDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    }, this.dialog).afterClosed().subscribe(() => {
      this.getAllCategories();
    });
  }

}
