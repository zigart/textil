/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DivideService } from './divide.service';

describe('Service: Divide', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DivideService]
    });
  });

  it('should ...', inject([DivideService], (service: DivideService) => {
    expect(service).toBeTruthy();
  }));
});
