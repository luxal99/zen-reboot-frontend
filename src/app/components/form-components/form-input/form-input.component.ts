import {Component, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../../models/Field';
import {FieldConfig} from '../../../models/FIeldConfig';
import {FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.sass']
})
export class FormInputComponent implements OnInit, Field {


  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() label = 'Title';
  @Input() icon = 'format_align_right';
  @Input() isRequired!: boolean;
  @Input() appearance = 'fill';
  @Input() hint!: string;
  @Input() color!: string;
  @Input() model!: any;
  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
