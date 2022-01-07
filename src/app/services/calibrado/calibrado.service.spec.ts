import { TestBed } from '@angular/core/testing';

import { CalibradoService } from './calibrado.service';

describe('CalibradoService', () => {
  let service: CalibradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalibradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
