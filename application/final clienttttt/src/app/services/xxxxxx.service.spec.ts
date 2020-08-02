import { TestBed } from '@angular/core/testing';

import { XxxxxxService } from './xxxxxx.service';

describe('XxxxxxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XxxxxxService = TestBed.get(XxxxxxService);
    expect(service).toBeTruthy();
  });
});
