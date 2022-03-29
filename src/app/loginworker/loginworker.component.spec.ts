import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginworkerComponent } from './loginworker.component';

describe('LoginworkerComponent', () => {
  let component: LoginworkerComponent;
  let fixture: ComponentFixture<LoginworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginworkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
