import { TestBed, inject } from '@angular/core/testing';

import { GunService } from './gun.service';

describe('GunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GunService]
    });
  });

  it('should be created', inject([GunService], (service: GunService) => {
    expect(service).toBeTruthy();
  }));
});
