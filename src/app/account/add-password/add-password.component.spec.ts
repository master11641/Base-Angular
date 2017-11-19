import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPasswordComponent } from './add-password.component';

describe('AddPasswordComponent', () => {
  let component: AddPasswordComponent;
  let fixture: ComponentFixture<AddPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
