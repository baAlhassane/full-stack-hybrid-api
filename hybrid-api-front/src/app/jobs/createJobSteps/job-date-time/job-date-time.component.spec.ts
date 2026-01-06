import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDateTimeComponent } from './job-date-time.component';

describe('JobDateTimeComponent', () => {
  let component: JobDateTimeComponent;
  let fixture: ComponentFixture<JobDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDateTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
