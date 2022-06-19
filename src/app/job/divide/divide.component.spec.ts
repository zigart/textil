import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { divide } from 'src/app/models/divide.model';
import { DecimalPipe } from '@angular/common';

import { DivideComponent } from './divide.component';


describe('DivideComponent', () => {
  let component: DivideComponent;
  let fixture: ComponentFixture<DivideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[DecimalPipe],
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ DivideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  
  it('should exist the component', () => {
    const fixture = TestBed.createComponent(DivideComponent);
    const divideComponent = fixture.componentInstance
    expect(divideComponent).toBeTruthy();
  });


  it('should be valid', ()=>{
    const fixture = TestBed.createComponent(DivideComponent);
    const divideComponent = fixture.componentInstance;
    fixture.detectChanges()
    
    const colth = divideComponent.divideDataForm.controls['colth']
    colth.setValue(200);
    const failed = divideComponent.divideDataForm.controls['failed']
    failed.setValue(100);
    expect(divideComponent.divideDataForm.invalid).toBeFalse();
    
  });

  it('should be invalid', ()=>{
    const fixture = TestBed.createComponent(DivideComponent);
    const divideComponent = fixture.componentInstance;
    fixture.detectChanges()
    const colth = divideComponent.divideDataForm.controls['colth']
    colth.setValue(200);
    expect(divideComponent.divideDataForm.invalid).toBeTrue();
    
  });

  it('should be invalid', ()=>{
    const fixture = TestBed.createComponent(DivideComponent);
    const divideComponent = fixture.componentInstance;
    fixture.detectChanges();
    const failed = divideComponent.divideDataForm.controls['failed']
    failed.setValue(100);
    expect(divideComponent.divideDataForm.invalid).toBeTrue();
    
  })

});
