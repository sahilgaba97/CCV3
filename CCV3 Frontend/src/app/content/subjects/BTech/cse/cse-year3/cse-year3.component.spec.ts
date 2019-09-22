import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CseYear3Component } from './cse-year3.component';

describe('CseYear3Component', () => {
  let component: CseYear3Component;
  let fixture: ComponentFixture<CseYear3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CseYear3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CseYear3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
