import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobberComponent } from './jobber.component';

describe('JobberComponent', () => {
  let component: JobberComponent;
  let fixture: ComponentFixture<JobberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
