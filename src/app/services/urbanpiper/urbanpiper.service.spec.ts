import { TestBed } from '@angular/core/testing';

import { UrbanpiperService } from './urbanpiper.service';

describe('UrbanpiperService', () => {
  let service: UrbanpiperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanpiperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
