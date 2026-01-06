import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTotalPriceComponent } from './job-total-price.component';

describe('JobTotalPriceComponent', () => {
  let component: JobTotalPriceComponent;
  let fixture: ComponentFixture<JobTotalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobTotalPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobTotalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
