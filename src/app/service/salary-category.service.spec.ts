import { TestBed } from '@angular/core/testing';

import { SalaryCategoryService } from './salary-category.service';

describe('SalaryCategoryService', () => {
  let service: SalaryCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
