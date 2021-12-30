import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutmachineComponent } from './layoutmachine.component';

describe('LayoutmachineComponent', () => {
  let component: LayoutmachineComponent;
  let fixture: ComponentFixture<LayoutmachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutmachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
