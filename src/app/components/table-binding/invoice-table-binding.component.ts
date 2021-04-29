import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-binding',
  templateUrl: './invoice-table-binding.component.html',
  styleUrls: ['./invoice-table-binding.component.sass']
})
export class InvoiceTableBindingComponent implements OnInit {

  displayedColumns: string[] = ['client', 'billedClient', 'location', 'gross', 'option'];
  @Input() dataSource: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
