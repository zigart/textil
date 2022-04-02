import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantcfgComponent } from './attendantcfg.component';

describe('AttendantcfgComponent', () => {
  let component: AttendantcfgComponent;
  let fixture: ComponentFixture<AttendantcfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendantcfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantcfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
