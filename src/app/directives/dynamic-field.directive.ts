import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef
} from "@angular/core";
import {Field} from "../models/util/Field";
import {FieldConfig} from "../models/util/FIeldConfig";
import {FormGroup} from "@angular/forms";
import {FormInputComponent} from "../components/form-components/form-input/form-input.component";
import {FormSelectComponent} from "../components/form-components/form-select/form-select.component";
import {FormDateComponent} from "../components/form-components/form-date/form-date.component";

// @ts-ignore
const components: { [type: string]: Type<Field> } = {
  input: FormInputComponent,
  select: FormSelectComponent,
  date: FormDateComponent
};

@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {

  // @ts-ignore
  @Input()
  config!: FieldConfig;

  // @ts-ignore
  @Input()
  group!: FormGroup;
  // @ts-ignore
  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
  }

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit(): void {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(", ");
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
