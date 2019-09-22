import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EceYear1Component } from './ece-year1.component';

describe('EceYear1Component', () => {
  let component: EceYear1Component;
  let fixture: ComponentFixture<EceYear1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EceYear1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EceYear1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
