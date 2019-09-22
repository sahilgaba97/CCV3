import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDocsComponent } from './auth-docs.component';

describe('AuthDocsComponent', () => {
  let component: AuthDocsComponent;
  let fixture: ComponentFixture<AuthDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
