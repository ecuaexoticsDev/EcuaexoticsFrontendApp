import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRecepcionTransporteComponent } from './ver-recepcion-transporte.component';

describe('VerRecepcionTransporteComponent', () => {
  let component: VerRecepcionTransporteComponent;
  let fixture: ComponentFixture<VerRecepcionTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerRecepcionTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRecepcionTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
