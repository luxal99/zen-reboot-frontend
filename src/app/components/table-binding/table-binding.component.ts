import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-binding',
  templateUrl: './table-binding.component.html',
  styleUrls: ['./table-binding.component.sass']
})
export class TableBindingComponent implements OnInit {

  displayedColumns: string[] = ['client', 'billedClient', 'location', 'gross', 'option'];
  @Input() dataSource: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
