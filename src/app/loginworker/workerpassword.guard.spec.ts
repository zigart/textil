import { TestBed } from '@angular/core/testing';

import { WorkerpasswordGuard } from './workerpassword.guard';

describe('WorkerpasswordGuard', () => {
  let guard: WorkerpasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WorkerpasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
