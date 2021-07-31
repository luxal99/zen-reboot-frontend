import { TestBed } from '@angular/core/testing';

import { ExtraPaymentService } from './extra-payment.service';

describe('ExtraPaymentService', () => {
  let service: ExtraPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
