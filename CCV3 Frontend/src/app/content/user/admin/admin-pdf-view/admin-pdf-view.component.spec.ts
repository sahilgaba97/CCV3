import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPdfViewComponent } from './admin-pdf-view.component';

describe('AdminPdfViewComponent', () => {
  let component: AdminPdfViewComponent;
  let fixture: ComponentFixture<AdminPdfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPdfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
