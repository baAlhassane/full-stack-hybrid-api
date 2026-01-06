import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootSeqStepComponent } from './foot-seq-step.component';

describe('FootSeqStepComponent', () => {
  let component: FootSeqStepComponent;
  let fixture: ComponentFixture<FootSeqStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootSeqStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FootSeqStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
