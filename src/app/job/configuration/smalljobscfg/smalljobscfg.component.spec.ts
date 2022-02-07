import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmalljobscfgComponent } from './smalljobscfg.component';

describe('SmalljobscfgComponent', () => {
  let component: SmalljobscfgComponent;
  let fixture: ComponentFixture<SmalljobscfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmalljobscfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmalljobscfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
