import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulicLayoutComponent } from './pulic-layout.component';

describe('PulicLayoutComponent', () => {
  let component: PulicLayoutComponent;
  let fixture: ComponentFixture<PulicLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulicLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
