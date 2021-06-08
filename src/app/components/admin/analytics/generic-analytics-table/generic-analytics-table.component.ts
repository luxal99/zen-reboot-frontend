import {Component, Input, OnInit, Output} from '@angular/core';
import {Column} from '../../../../models/column';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-generic-analytics-table',
  templateUrl: './generic-analytics-table.component.html',
  styleUrls: ['./generic-analytics-table.component.sass']
})
export class GenericAnalyticsTableComponent implements OnInit {

  @Input() dataSource: any[] = [];
  @Input() displayedColumns: Column[] = [];
  @Input() elementBindingValues: string[] = [];

  @Output() openOverview = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  test(): void {
    this.openOverview.emit();
  }

  openDialog(el: any): void {
    this.openOverview.emit(el);
  }
}
