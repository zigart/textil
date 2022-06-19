import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LayoutworkersComponent } from './layoutworkers.component';
import {DatePipe} from '@angular/common'

describe('WorkerscfgComponent', () => {
  let component: LayoutworkersComponent;
  let fixture: ComponentFixture<LayoutworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[DatePipe],
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ LayoutworkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    const fixture = TestBed.createComponent(LayoutworkersComponent);
    const layoutworkersComponent = fixture.componentInstance;
    expect(layoutworkersComponent).toBeTruthy();
  });

  it('should be valid',()=>{
    const fixture = TestBed.createComponent(LayoutworkersComponent);
    const layoutworkersComponent = fixture.componentInstance;

    const form = layoutworkersComponent.newWorkerForm.controls['name'];
    form.setValue('mariano');
    expect(layoutworkersComponent.newWorkerForm.invalid).toBeFalse();
  });

  it('should be valid',()=>{
    const fixture = TestBed.createComponent(LayoutworkersComponent);
    const layoutworkersComponent = fixture.componentInstance;

    const form = layoutworkersComponent.newWorkerForm.controls['name'];
    form.setValue(1);
    expect(layoutworkersComponent.newWorkerForm.invalid).toBeFalse();
  });

  it('should be invalid',()=>{
    const fixture = TestBed.createComponent(LayoutworkersComponent);
    const layoutworkersComponent = fixture.componentInstance;

    const form = layoutworkersComponent.newWorkerForm.controls['name'];
    form.setValue('');
    expect(layoutworkersComponent.newWorkerForm.invalid).toBeTrue();
  });
});
