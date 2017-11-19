import { TestBed, inject } from '@angular/core/testing';

import { AntivirusLicenceService } from './antivirus-licence.service';

describe('AntivirusLicenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntivirusLicenceService]
    });
  });

  it('should be created', inject([AntivirusLicenceService], (service: AntivirusLicenceService) => {
    expect(service).toBeTruthy();
  }));
});
