import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodeCheckComponent } from './verify-code-check.component';

describe('VerifyCodeCheckComponent', () => {
  let component: VerifyCodeCheckComponent;
  let fixture: ComponentFixture<VerifyCodeCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCodeCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCodeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
