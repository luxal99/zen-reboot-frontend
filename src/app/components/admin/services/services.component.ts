import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {

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
    });
  }

  openAddTreatmentCategoryDialog(): void {
    const configData: FormBuilderConfig = {
      service: this.treatmentCategoryService,
      headerText: 'Dodaj kategoriju tretmana',
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
}
