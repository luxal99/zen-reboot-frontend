import {Component, OnInit} from '@angular/core';
import {TreatmentService} from '../../../../service/treatment.service';
import {TreatmentCategory} from '../../../../models/treatment-category';
import {TreatmentCategoryService} from '../../../../service/treatment-category.service';
import {TreatmentDuration} from '../../../../models/treatment-duration';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.sass']
})
export class AddServiceDialogComponent implements OnInit {

  listOfCategories: TreatmentCategory[] = [];
  listOfDurations: TreatmentDuration[] = [];

  treatmentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  durationForm = new FormGroup({
    duration: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  nameInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.NAME_FORM_CONTROL};
  descriptionInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.DESCRIPTION_FORM_CONTROL};
  categorySelectConfig: FieldConfig = {type: InputTypes.SELECT_TYPE_NAME, name: FormControlNames.CATEGORY_FORM_CONTROL};

  durationInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.DURATION_FORM_CONTROL};
  priceInputConfig: FieldConfig = {type: InputTypes.INPUT_TYPE_NAME, name: FormControlNames.PRICE_FORM_CONTROL};

  constructor(private treatmentCategoryService: TreatmentCategoryService, private treatmentService: TreatmentService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.treatmentCategoryService.getAll().subscribe((resp) => {
      this.listOfCategories = resp;
      this.categorySelectConfig.options = resp;
    });
  }

  save(): void {

  }
}
