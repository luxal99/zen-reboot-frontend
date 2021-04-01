import {Component, OnInit, ViewChild} from '@angular/core';
import {TreatmentService} from '../../../../service/treatment.service';
import {TreatmentCategory} from '../../../../models/treatment-category';
import {TreatmentCategoryService} from '../../../../service/treatment-category.service';
import {TreatmentDuration} from '../../../../models/treatment-duration';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes, Message} from '../../../../const/const';
import {Treatment} from '../../../../models/treatment';
import {SnackBarUtil} from '../../../../util/snack-bar-uitl';
import {Spinner} from '@angular/cli/utilities/spinner';
import {MatSpinner} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SpinnerService} from '../../../../service/spinner.service';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.sass']
})
export class AddServiceDialogComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
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

  constructor(private treatmentCategoryService: TreatmentCategoryService, private spinnerService: SpinnerService,
              private treatmentService: TreatmentService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  addDuration(): void {
    this.listOfDurations.push({
      // tslint:disable-next-line:radix
      price: Number.parseInt(this.durationForm.get(FormControlNames.PRICE_FORM_CONTROL)?.value),
      // tslint:disable-next-line:radix
      duration: Number.parseInt(this.durationForm.get(FormControlNames.DURATION_FORM_CONTROL)?.value),
    });
  }

  removeDuration(duration: TreatmentDuration): void {
    this.listOfDurations.splice(this.listOfDurations.indexOf(duration), 1);
  }

  getAllCategories(): void {
    this.treatmentCategoryService.getAll().subscribe((resp) => {
      this.listOfCategories = resp;
      this.categorySelectConfig.options = resp;
    });
  }

  save(): void {
    this.spinnerService.show(this.spinner);
    const treatment: Treatment = this.treatmentForm.getRawValue();
    treatment.durations = this.listOfDurations;
    treatment.category = {id: this.treatmentForm.get(FormControlNames.CATEGORY_FORM_CONTROL)?.value.id};

    console.log(treatment);
    this.treatmentService.save(treatment).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, (err) => {
      console.log(err);
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }
}
