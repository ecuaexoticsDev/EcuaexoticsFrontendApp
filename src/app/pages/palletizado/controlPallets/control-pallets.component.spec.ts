import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPalletsComponent } from './control-pallets.component';

describe('ControlPalletsComponent', () => {
  let component: ControlPalletsComponent;
  let fixture: ComponentFixture<ControlPalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPalletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
