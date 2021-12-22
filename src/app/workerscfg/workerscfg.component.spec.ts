import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerscfgComponent } from './workerscfg.component';

describe('WorkerscfgComponent', () => {
  let component: WorkerscfgComponent;
  let fixture: ComponentFixture<WorkerscfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerscfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerscfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
