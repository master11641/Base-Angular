import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusLicenceAddComponent } from './antivirus-licence-add.component';

describe('AntivirusLicenceAddComponent', () => {
  let component: AntivirusLicenceAddComponent;
  let fixture: ComponentFixture<AntivirusLicenceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusLicenceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusLicenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
