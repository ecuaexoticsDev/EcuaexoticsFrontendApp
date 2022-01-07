import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBitacorasComponent } from './ver-bitacoras.component';

describe('VerBitacorasComponent', () => {
  let component: VerBitacorasComponent;
  let fixture: ComponentFixture<VerBitacorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerBitacorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerBitacorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
