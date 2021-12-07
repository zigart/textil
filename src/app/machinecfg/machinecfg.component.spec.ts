import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinecfgComponent } from './machinecfg.component';

describe('MachinecfgComponent', () => {
  let component: MachinecfgComponent;
  let fixture: ComponentFixture<MachinecfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinecfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinecfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
