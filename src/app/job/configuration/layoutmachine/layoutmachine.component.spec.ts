import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LayoutmachineComponent } from './layoutmachine.component';

describe('LayoutmachineComponent', () => {
  let component: LayoutmachineComponent;
  let fixture: ComponentFixture<LayoutmachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ LayoutmachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    const fixture = TestBed.createComponent(LayoutmachineComponent);
    const layoutmachineComponent = fixture.componentInstance;
    expect(layoutmachineComponent).toBeTruthy();
  });

  it('should be valid', ()=>{
    const fixture = TestBed.createComponent(LayoutmachineComponent);
    const layoutMachineComponent = fixture.componentInstance;

    const form = layoutMachineComponent.layoutMachineForm.controls['name'];
    form.setValue('maquina 2');
    expect(layoutMachineComponent.layoutMachineForm.invalid).toBeFalse();
  });

  it('should be valid', ()=>{
    const fixture = TestBed.createComponent(LayoutmachineComponent);
    const layoutMachineComponent = fixture.componentInstance;

    const form = layoutMachineComponent.layoutMachineForm.controls['name'];
    form.setValue(1);
    expect(layoutMachineComponent.layoutMachineForm.invalid).toBeFalse();
  });

  it('should be valid', ()=>{
    const fixture = TestBed.createComponent(LayoutmachineComponent);
    const layoutMachineComponent = fixture.componentInstance;

    const form = layoutMachineComponent.layoutMachineForm.controls['name'];
    form.setValue('');
    expect(layoutMachineComponent.layoutMachineForm.invalid).toBeTrue();
  })
});
