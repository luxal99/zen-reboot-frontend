import {Component, Input, OnInit} from "@angular/core";
import {Field} from "../../../models/util/Field";
import {FieldConfig} from "../../../models/util/FIeldConfig";
import {FormGroup} from "@angular/forms";

@Component({
  selector: "app-form-date",
  templateUrl: "./form-date.component.html",
  styleUrls: ["./form-date.component.sass"]
})
export class FormDateComponent implements OnInit, Field {

  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() value: any = "";

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.value !== "") {
        this.group.get(this.config.name)?.setValue(new Date(this.value));
      }
    }, 100);
  }

}
