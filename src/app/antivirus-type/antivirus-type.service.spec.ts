import { TestBed, inject } from '@angular/core/testing';

import { AntivirusTypeService } from './antivirus-type.service';

describe('AntivirusTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntivirusTypeService]
    });
  });

  it('should be created', inject([AntivirusTypeService], (service: AntivirusTypeService) => {
    expect(service).toBeTruthy();
  }));
});
