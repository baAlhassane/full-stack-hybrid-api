import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPicureComponent } from './job-picure.component';

describe('JobPicureComponent', () => {
  let component: JobPicureComponent;
  let fixture: ComponentFixture<JobPicureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPicureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPicureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
