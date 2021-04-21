import {ChangeDetectorRef, Injector, Pipe, PipeTransform} from '@angular/core';
import {Staff} from '../models/staff';
import {observable, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Pipe({
  name: 'staff',
  pure: false
})
export class StaffPipe implements PipeTransform {

  asyncPipe: AsyncPipe;

  constructor(private inject: Injector) {
    this.asyncPipe = new AsyncPipe(this.inject.get(ChangeDetectorRef));
  }

  // @ts-ignore
  transform(listOfStaff: Observable<Staff[]>, searchText: string): any {

  }

}
