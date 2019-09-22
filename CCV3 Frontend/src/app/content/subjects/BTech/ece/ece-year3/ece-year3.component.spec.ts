import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EceYear3Component } from './ece-year3.component';

describe('EceYear3Component', () => {
  let component: EceYear3Component;
  let fixture: ComponentFixture<EceYear3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EceYear3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EceYear3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
