import {FormGroup} from '@angular/forms';
import {FieldConfig} from './FIeldConfig';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
}
