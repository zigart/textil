import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, RouterTestingModule],
      declarations: [ ReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    const fixture = TestBed.createComponent(ReviewComponent);
    const reviewComponent = fixture.componentInstance;
    expect(reviewComponent).toBeTruthy();
  });

  it('should be valid', () => {
    const fixture = TestBed.createComponent(ReviewComponent);
    const reviewComponent = fixture.componentInstance;

    const problem = reviewComponent.reviewDataForm.controls['problem'];
    problem.setValue('its a test that should be valid');
    expect(reviewComponent.reviewDataForm.invalid).toBeFalse();
  });

  it('should be invalid',()=>{
    const fixture = TestBed.createComponent(ReviewComponent);
    const reviewComponent = fixture.componentInstance;
    const problem = reviewComponent.reviewDataForm.controls['problem'];
    problem.setValue('');
    expect(reviewComponent.reviewDataForm.invalid).toBeTrue();
  })
});
