import { TestBed } from '@angular/core/testing';

import { DocEventService } from './doc-event.service';

describe('DocEventService', () => {
  let service: DocEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
