import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CseYear1Component } from './cse-year1.component';

describe('CseYear1Component', () => {
  let component: CseYear1Component;
  let fixture: ComponentFixture<CseYear1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CseYear1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CseYear1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
