import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EceYear2Component } from './ece-year2.component';

describe('EceYear2Component', () => {
  let component: EceYear2Component;
  let fixture: ComponentFixture<EceYear2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EceYear2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EceYear2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
