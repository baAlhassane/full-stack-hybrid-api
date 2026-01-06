import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTimeComponent } from './job-time.component';

describe('JobTimeComponent', () => {
  let component: JobTimeComponent;
  let fixture: ComponentFixture<JobTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
