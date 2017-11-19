import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVerifyComponent } from './mobile-verify.component';

describe('MobileVerifyComponent', () => {
  let component: MobileVerifyComponent;
  let fixture: ComponentFixture<MobileVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
