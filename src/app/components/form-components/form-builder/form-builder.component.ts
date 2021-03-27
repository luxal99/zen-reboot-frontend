import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GenericService} from '../../../service/generic.service';
import {FieldConfig} from '../../../models/FIeldConfig';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthGuard} from '../../../guards/auth.guard';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {SnackBarUtil} from '../../../util/snack-bar-uitl';
import {Message} from '../../../const/const';
import {SpinnerService} from '../../../service/spinner.service';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.sass']
})
export class FormBuilderComponent implements OnChanges, OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  form!: FormGroup;

  get controls(): any {
    return this.configData.formFields.filter(({type}) => type !== 'button');
  }

  get changes(): any {
    return this.form.valueChanges;
  }

  get valid(): any {
    return this.form.valid;
  }

  get value(): any {
    return this.form.value;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public configData: FormBuilderConfig, private fb: FormBuilder,
              private snackBar: MatSnackBar, private authGuard: AuthGuard, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.form = this.createGroup();
    this.setValue();
  }

  save(): any {
    this.spinnerService.show(this.spinner);
    if (!this.configData.formValues) {
      this.configData.service.save(this.form.getRawValue()).subscribe(() => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.spinnerService.hide(this.spinner);
      }, () => {
        this.spinnerService.hide(this.spinner);
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      });
    } else {
      const obj = this.form.getRawValue();
      obj.id = this.configData.formValues.id;
      this.configData.service.update(obj).subscribe(() => {
        this.spinnerService.hide(this.spinner);
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      }, () => {
        this.spinnerService.hide(this.spinner);
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      });
    }
  }

  ngOnChanges(): void {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item: any) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control: any) => !controls.includes(control))
        .forEach((name: any) => {
          const config: any = this.configData.formFields.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup(): any {
    const group = this.fb.group({});
    this.controls.forEach((control: any) => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig): any {
    const {disabled, validation, value} = config;
    return this.fb.control({disabled, value}, validation);
  }

  setValue(): void {
    if (this.configData.formValues) {
      for (const [k, v] of Object.entries(this.configData.formValues)) {
        if (k !== 'id') {
          this.form.controls[k].setValue(v, {emitEvent: true});
        }
      }
    }
  }
}
