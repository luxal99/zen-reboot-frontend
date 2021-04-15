import {Component, Input, OnInit, Output} from '@angular/core';
import {Field} from '../../../models/Field';
import {FieldConfig} from '../../../models/FIeldConfig';
import {FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.sass']
})
export class FormSelectComponent implements Field, OnInit {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() label = 'Izaberi opciju';
  @Input() bindValue = 'name';
  @Input() isRequired!: boolean;
  @Output() clickOnSelect = new EventEmitter();
  @Input() width = '100%';
  @Input() model: any;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter();
  @Input() isDisabled = false;

  compareObjects(o1: any, o2: any): boolean {
    if (o2 !== null && o2 !== undefined) {
      return o1.name === o2.name && o1.id === o2.id;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

  onOptionClick(): void {
    this.onChange.emit(true);
  }

  onSelectionChange(): void {
  }
}
