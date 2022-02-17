import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTransporteComponent } from './ver-transporte.component';

describe('VerTransporteComponent', () => {
  let component: VerTransporteComponent;
  let fixture: ComponentFixture<VerTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTransporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
