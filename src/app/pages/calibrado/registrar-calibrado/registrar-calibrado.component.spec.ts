import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCalibradoComponent } from './registrar-calibrado.component';

describe('RegistrarCalibradoComponent', () => {
  let component: RegistrarCalibradoComponent;
  let fixture: ComponentFixture<RegistrarCalibradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCalibradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCalibradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
