import { TestBed, inject } from '@angular/core/testing';

import { MemberShipService } from './member-ship.service';

describe('MemberShipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberShipService]
    });
  });

  it('should be created', inject([MemberShipService], (service: MemberShipService) => {
    expect(service).toBeTruthy();
  }));
});
