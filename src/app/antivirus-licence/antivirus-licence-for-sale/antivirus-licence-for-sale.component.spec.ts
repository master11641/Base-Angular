import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusLicenceForSaleComponent } from './antivirus-licence-for-sale.component';

describe('AntivirusLicenceForSaleComponent', () => {
  let component: AntivirusLicenceForSaleComponent;
  let fixture: ComponentFixture<AntivirusLicenceForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusLicenceForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusLicenceForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
