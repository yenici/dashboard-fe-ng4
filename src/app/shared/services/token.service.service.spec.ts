import { TestBed, inject } from '@angular/core/testing';

import { Token.ServiceService } from './token.service.service';

describe('Token.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Token.ServiceService]
    });
  });

  it('should ...', inject([Token.ServiceService], (service: Token.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
