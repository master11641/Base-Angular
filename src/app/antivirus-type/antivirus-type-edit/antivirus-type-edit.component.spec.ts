import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusTypeEditComponent } from './antivirus-type-edit.component';

describe('AntivirusTypeEditComponent', () => {
  let component: AntivirusTypeEditComponent;
  let fixture: ComponentFixture<AntivirusTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
