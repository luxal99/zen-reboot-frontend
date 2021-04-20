import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {


  @Input() gap = 10;
  @Input() filteredList: any[] = [];
  @Input() response!: Observable<any[]>;
  @Output() output = new EventEmitter();
  initGap = 0;
  isDisabledPrev10: any;
  isDisabledNext10: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  nextStaffs(): void {
    this.response.subscribe((resp) => {
      if (this.initGap + 10 < resp.length) {
        this.initGap += 10;
        this.gap += 10;
        this.isDisabledPrev10 = false;
      } else {
        this.isDisabledNext10 = true;
      }
    });

    this.response.subscribe((resp) => {
      console.log(this.initGap);
      console.log(this.gap);
      this.filteredList = resp.slice(this.initGap, this.gap);
      this.output.emit(this.filteredList);

      console.log(this.filteredList);
    });
  }

  previousStaffs(): void {
    if (this.initGap - 10 >= 0) {
      this.initGap -= 10;
      this.isDisabledNext10 = false;
    } else {
      this.isDisabledPrev10 = true;
    }
    if (this.gap - 10 >= 10) {
      this.gap -= 10;
    }
    this.response.subscribe((resp) => {
      this.filteredList = resp.slice(this.initGap, this.gap);
      this.output.emit(resp.slice(this.initGap, this.gap));
    }).unsubscribe();
  }

}
