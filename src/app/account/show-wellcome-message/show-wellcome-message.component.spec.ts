import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWellcomeMessageComponent } from './show-wellcome-message.component';

describe('ShowWellcomeMessageComponent', () => {
  let component: ShowWellcomeMessageComponent;
  let fixture: ComponentFixture<ShowWellcomeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWellcomeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWellcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
