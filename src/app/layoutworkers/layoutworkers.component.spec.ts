import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutworkersComponent } from './layoutworkers.component';

describe('WorkerscfgComponent', () => {
  let component: LayoutworkersComponent;
  let fixture: ComponentFixture<LayoutworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutworkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
