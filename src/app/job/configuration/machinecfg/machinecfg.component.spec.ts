import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MachinecfgComponent } from './machinecfg.component';

describe('MachinecfgComponent', () => {
  let component: MachinecfgComponent;
  let fixture: ComponentFixture<MachinecfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ MachinecfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinecfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    const fixture = TestBed.createComponent(MachinecfgComponent);
    const machinecfgComponent = fixture.componentInstance;
    expect(machinecfgComponent).toBeTruthy();
  });

  //TODO: make it well
  it('should be valid',()=>{
    const fixture = TestBed.createComponent(MachinecfgComponent);
    const machinecfgComponent = fixture.componentInstance;

    const form = machinecfgComponent.editFormValues.controls['newDate'];
    form.setValue('mariano');
    expect(machinecfgComponent.editFormValues.invalid).toBeFalse();
  });

  it('should be invalid',()=>{
    const fixture = TestBed.createComponent(MachinecfgComponent);
    const machinecfgComponent = fixture.componentInstance;

    const form = machinecfgComponent.editFormValues.controls['newDate'];
    form.setValue('');
    expect(machinecfgComponent.editFormValues.invalid).toBeTrue();
  });

});
