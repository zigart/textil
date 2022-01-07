import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmalljobsComponent } from './smalljobs.component';

describe('SmalljobsComponent', () => {
  let component: SmalljobsComponent;
  let fixture: ComponentFixture<SmalljobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmalljobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmalljobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
