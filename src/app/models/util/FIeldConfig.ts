import {ValidatorFn} from "@angular/forms";

export interface FieldConfig {
  icon?: string;
  disabled?: boolean;
  label?: string;
  name: string;
  options?: any[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
}
