import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoceComponent } from './invoce.component';

describe('InvoceComponent', () => {
  let component: InvoceComponent;
  let fixture: ComponentFixture<InvoceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
