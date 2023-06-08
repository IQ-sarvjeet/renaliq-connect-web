import { TestBed } from '@angular/core/testing';

import { AuthgaurdCanloadService } from './authgaurd-canload.service';

describe('AuthgaurdCanloadService', () => {
  let service: AuthgaurdCanloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthgaurdCanloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
