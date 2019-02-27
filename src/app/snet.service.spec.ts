import { TestBed } from '@angular/core/testing';

import { SnetService } from './snet.service';

describe('SnetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnetService = TestBed.get(SnetService);
    expect(service).toBeTruthy();
  });
});
