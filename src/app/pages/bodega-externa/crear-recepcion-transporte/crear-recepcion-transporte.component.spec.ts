import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecepcionTransporteComponent } from './crear-recepcion-transporte.component';

describe('CrearRecepcionTransporteComponent', () => {
  let component: CrearRecepcionTransporteComponent;
  let fixture: ComponentFixture<CrearRecepcionTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRecepcionTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRecepcionTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
