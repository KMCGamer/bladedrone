import { TestBed, inject } from '@angular/core/testing';

import { SkinsService } from './skins.service';

describe('SkinsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkinsService]
    });
  });

  it(
    'should be created',
    inject([SkinsService], (service: SkinsService) => {
      expect(service).toBeTruthy();
    })
  );
});
