import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EceYear4Component } from './ece-year4.component';

describe('EceYear4Component', () => {
  let component: EceYear4Component;
  let fixture: ComponentFixture<EceYear4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EceYear4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EceYear4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
