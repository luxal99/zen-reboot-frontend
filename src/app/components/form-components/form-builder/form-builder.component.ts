import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GenericService} from '../../../service/generic.service';
import {FieldConfig} from '../../../models/FIeldConfig';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthGuard} from '../../../guards/auth.guard';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.sass']
})
export class FormBuilderComponent implements OnChanges, OnInit {

  @Input()
  headerText = '';

  @Input()
  config: FieldConfig[] = [];

  @Input() public service!: GenericService<any>;
  // tslint:disable-next-line:no-output-native
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  formValues!: any;

  form!: FormGroup;

  get controls(): any {
    return this.config.filter(({type}) => type !== 'button');
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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authGuard: AuthGuard) {
  }

  ngOnInit(): void {
    this.form = this.createGroup();
    this.setValue();
  }

  save(): any {
    // if (!this.formValues) {
    //   this.authGuard.getAuthToken().subscribe((token) => {
    //     this.service.save(this.form.getRawValue(), token).subscribe(() => {
    //       SnackbarUtil.openSnackBar(this.snackBar, SnackBarMessages.SUCCESS_MESSAGE);
    //     }, () => {
    //       SnackbarUtil.openSnackBar(this.snackBar, SnackBarMessages.ERR_MESSAGE);
    //     });
    //   });
    // } else {
    //   const obj = this.form.getRawValue();
    //   obj.id = this.formValues.id;
    //   this.authGuard.getAuthToken().subscribe((token) => {
    //     this.service.update(obj, token).subscribe(() => {
    //       SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
    //     }, () => {
    //       SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
    //     });
    //   });
    // }
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
          const config: any = this.config.find((control) => control.name === name);
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
    if (this.formValues) {
      for (const [k, v] of Object.entries(this.formValues)) {
        if (k !== 'id') {
          this.form.controls[k].setValue(v, {emitEvent: true});
        }
      }
    }
  }
}
