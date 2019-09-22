import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CseYear4Component } from './cse-year4.component';

describe('CseYear4Component', () => {
  let component: CseYear4Component;
  let fixture: ComponentFixture<CseYear4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CseYear4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CseYear4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
