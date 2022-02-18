import { TestBed } from '@angular/core/testing';

import { RecepcionTransService } from './recepcion-trans.service';

describe('RecepcionTransService', () => {
  let service: RecepcionTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
