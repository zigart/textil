import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationComponent } from './configuration.component';
import {DatePipe} from '@angular/common';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[DatePipe],
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ ConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist the component', () => {
    const fixture = TestBed.createComponent(ConfigurationComponent);
    const configurationComponent = fixture.componentInstance
    expect(configurationComponent).toBeTruthy();
  });

  it('should be valid', () => {
    const fixture = TestBed.createComponent(ConfigurationComponent);
    const configurationComponent = fixture.componentInstance

    const password = configurationComponent.loginForm.controls['passwordTyped'];
    password.setValue('testing form validation');

    expect(configurationComponent.loginForm.invalid).toBeFalse();
  });

  it('should be valid', () => {
    const fixture = TestBed.createComponent(ConfigurationComponent);
    const configurationComponent = fixture.componentInstance

    const password = configurationComponent.loginForm.controls['passwordTyped'];
    password.setValue(23);

    expect(configurationComponent.loginForm.invalid).toBeFalse();
  });

  it('should be invalid', () => {
    const fixture = TestBed.createComponent(ConfigurationComponent);
    const configurationComponent = fixture.componentInstance

    const password = configurationComponent.loginForm.controls['passwordTyped'];
    password.setValue('');

    expect(configurationComponent.loginForm.invalid).toBeTrue();
  });

});
