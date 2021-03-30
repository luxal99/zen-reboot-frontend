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
  @Input() bindValue = '';
  @Input() isRequired!: boolean;
  @Output() clickOnSelect = new EventEmitter();
  @Input() width = '100%';

  ngOnInit(): void {
  }

  onOptionClick(): void {
    this.clickOnSelect.emit(true);
  }
}
