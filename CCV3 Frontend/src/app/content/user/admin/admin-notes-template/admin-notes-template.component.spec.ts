import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotesTemplateComponent } from './admin-notes-template.component';

describe('AdminNotesTemplateComponent', () => {
  let component: AdminNotesTemplateComponent;
  let fixture: ComponentFixture<AdminNotesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
