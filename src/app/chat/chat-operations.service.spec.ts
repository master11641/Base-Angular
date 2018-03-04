import { TestBed, inject } from '@angular/core/testing';

import { ChatOperationsService } from './chat-operations.service';

describe('ChatOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatOperationsService]
    });
  });

  it('should be created', inject([ChatOperationsService], (service: ChatOperationsService) => {
    expect(service).toBeTruthy();
  }));
});
