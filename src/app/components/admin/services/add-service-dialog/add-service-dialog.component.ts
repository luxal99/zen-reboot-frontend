import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TreatmentService} from '../../../../service/treatment.service';
import {TreatmentCategory} from '../../../../models/treatment-category';
import {TreatmentCategoryService} from '../../../../service/treatment-category.service';
import {TreatmentDuration} from '../../../../models/treatment-duration';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FIeldConfig';
import {FormControlNames, InputTypes} from '../../../../const/const';
import {Treatment} from '../../../../models/treatment';
import {MatSpinner} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DefaultComponent} from '../../../../util/default-component';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.sass']
})
export class AddServiceDialogComponent extends DefaultComponent<Treatment> implements OnInit, AfterViewChecked {

  @ViewChild('spinner') spinner!: MatSpinner;
  listOfCategories: TreatmentCategory[] = [];
  listOfDurations: TreatmentDuration[] = [];

  isMobile = false;
  durationBeforeEdit!: TreatmentDuration;

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Treatment, private treatmentCategoryService: TreatmentCategoryService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private treatmentService: TreatmentService, protected snackBar: MatSnackBar) {
    super(treatmentService, snackBar);
  }

  ngOnInit(): void {
    this.getAllCategories().then(() => {
      this.setDataToForm();
    });
    this.setIsMobile();
  }

  setIsMobile(): void {
    if (window.screen.width <= 570) {
      this.isMobile = true;
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  addDuration(): void {
    this.listOfDurations.push({
      // tslint:disable-next-line:radix
      price: Number.parseInt(this.durationForm.get(FormControlNames.PRICE_FORM_CONTROL)?.value),
      // tslint:disable-next-line:radix
      duration: Number.parseInt(this.durationForm.get(FormControlNames.DURATION_FORM_CONTROL)?.value),
    });

    this.durationForm.reset();
  }

  removeDuration(duration: TreatmentDuration): void {
    this.listOfDurations.splice(this.listOfDurations.indexOf(duration), 1);
  }

  async getAllCategories(): Promise<void> {
    this.treatmentCategoryService.getAll().subscribe((resp) => {
      this.listOfCategories = resp;
      this.categorySelectConfig.options = resp.map((category) => ({
        id: category.id,
        name: category.name
      }));
      // @ts-ignore
      this.data.category = this.listOfCategories.find((category) => category.id = this.data.category);
      delete this.data.category?.treatments;
    });
  }

  save(): void {
    this.spinnerService.show(this.spinner);
    const treatment: Treatment = this.treatmentForm.getRawValue();
    treatment.durations = this.listOfDurations;
    if (this.data) {
      treatment.id = this.data.id;
      super.subscribeUpdate(treatment);
    } else {
      super.subscribeSave(treatment);
    }
  }

  editDuration(): void {
    const index: number = this.listOfDurations.findIndex((item) =>
      item.duration === this.durationBeforeEdit.duration && item.price === this.durationBeforeEdit.price);
    // tslint:disable-next-line:radix
    this.listOfDurations[index].duration = Number.parseInt(this.durationForm.get(FormControlNames.DURATION_FORM_CONTROL)?.value);
    // tslint:disable-next-line:radix
    this.listOfDurations[index].price = Number.parseInt(this.durationForm.get(FormControlNames.PRICE_FORM_CONTROL)?.value);
  }

  selectDuration(duration: TreatmentDuration): void {
    this.durationForm.setValue({
      duration: duration.duration,
      price: duration.price
    });

    this.durationBeforeEdit = duration;
  }

  setDataToForm(): void {
    if (this.data) {
      delete this.data.category?.treatments;
      // @ts-ignore
      this.listOfDurations = this.data.durations?.map((duration) => ({
        id: duration.id,
        duration: duration.duration,
        price: duration.price
      }));
    } else {
      this.data = {};
    }
  }
}
