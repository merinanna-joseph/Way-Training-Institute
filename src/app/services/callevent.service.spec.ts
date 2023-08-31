import { TestBed } from '@angular/core/testing';

import { CalleventService } from './callevent.service';

describe('CalleventService', () => {
  let service: CalleventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalleventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
