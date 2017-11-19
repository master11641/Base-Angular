import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusLicenceListComponent } from './antivirus-licence-list.component';

describe('AntivirusLicenceListComponent', () => {
  let component: AntivirusLicenceListComponent;
  let fixture: ComponentFixture<AntivirusLicenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusLicenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusLicenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
