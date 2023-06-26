import { TestBed } from '@angular/core/testing';

import { ReportEventService } from './report-event.service';

describe('ReportEventService', () => {
  let service: ReportEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
