import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.sass']
})
export class FormInputComponent implements OnInit {

  @Input() label = 'Title';
  @Input() type = 'text';
  @Input() icon = 'format_align_right';
  @Input() isRequired!: boolean;
  @Input() appearance = 'fill';
  @Input() hint!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
