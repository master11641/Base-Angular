import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSupportPopupComponent } from './chat-support-popup.component';

describe('ChatSupportPopupComponent', () => {
  let component: ChatSupportPopupComponent;
  let fixture: ComponentFixture<ChatSupportPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSupportPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSupportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
