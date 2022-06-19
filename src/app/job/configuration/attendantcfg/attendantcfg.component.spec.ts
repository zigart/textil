import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendantcfgComponent } from './attendantcfg.component';

describe('AttendantcfgComponent', () => {
  let component: AttendantcfgComponent;
  let fixture: ComponentFixture<AttendantcfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ AttendantcfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendantcfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    const fixture = TestBed.createComponent(AttendantcfgComponent);
    const attendantcfgComponent = fixture.componentInstance;
    expect(attendantcfgComponent).toBeTruthy();
  });

  it('should be valid', ()=>{
    const fixture = TestBed.createComponent(AttendantcfgComponent);
    const attendantcfgComponent = fixture.componentInstance;

    const form = attendantcfgComponent.attendantForm.controls['password'];
    form.setValue('pepe');
    expect(attendantcfgComponent.attendantForm.invalid).toBeFalse();
  });

  it('should be valid', ()=>{
    const fixture = TestBed.createComponent(AttendantcfgComponent);
    const attendantcfgComponent = fixture.componentInstance;

    const form = attendantcfgComponent.attendantForm.controls['password'];
    form.setValue(23);
    expect(attendantcfgComponent.attendantForm.invalid).toBeFalse();
  });

  it('should be invalid', ()=>{
    const fixture = TestBed.createComponent(AttendantcfgComponent);
    const attendantcfgComponent = fixture.componentInstance;

    const form = attendantcfgComponent.attendantForm.controls['password'];
    form.setValue('');
    expect(attendantcfgComponent.attendantForm.invalid).toBeTrue();
  });
});
