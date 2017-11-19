import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusLicenceEditComponent } from './antivirus-licence-edit.component';

describe('AntivirusLicenceEditComponent', () => {
  let component: AntivirusLicenceEditComponent;
  let fixture: ComponentFixture<AntivirusLicenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusLicenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusLicenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
