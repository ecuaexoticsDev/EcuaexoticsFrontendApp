import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerItemsComponent } from './ver-items.component';

describe('VerItemsComponent', () => {
  let component: VerItemsComponent;
  let fixture: ComponentFixture<VerItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
