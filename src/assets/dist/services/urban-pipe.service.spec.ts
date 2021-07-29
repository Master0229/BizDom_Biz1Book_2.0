import { TestBed } from '@angular/core/testing';

import { UrbanPipeService } from './urban-pipe.service';

describe('UrbanPipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrbanPipeService = TestBed.get(UrbanPipeService);
    expect(service).toBeTruthy();
  });
});
