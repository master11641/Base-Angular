import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusTypeAddComponent } from './antivirus-type-add.component';

describe('AntivirusTypeAddComponent', () => {
  let component: AntivirusTypeAddComponent;
  let fixture: ComponentFixture<AntivirusTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
