import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CseYear2Component } from './cse-year2.component';

describe('CseYear2Component', () => {
  let component: CseYear2Component;
  let fixture: ComponentFixture<CseYear2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CseYear2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CseYear2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
