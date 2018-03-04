import { TestBed, inject } from '@angular/core/testing';

import { CarouselsService } from './carousels.service';

describe('CarouselsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselsService]
    });
  });

  it('should be created', inject([CarouselsService], (service: CarouselsService) => {
    expect(service).toBeTruthy();
  }));
});
