import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDownloadsComponent } from './document-downloads.component';

describe('DocumentDownloadsComponent', () => {
  let component: DocumentDownloadsComponent;
  let fixture: ComponentFixture<DocumentDownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDownloadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
