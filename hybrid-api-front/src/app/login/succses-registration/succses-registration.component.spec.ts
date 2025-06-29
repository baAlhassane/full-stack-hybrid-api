import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccsesRegistrationComponent } from './succses-registration.component';

describe('SuccsesRegistrationComponent', () => {
  let component: SuccsesRegistrationComponent;
  let fixture: ComponentFixture<SuccsesRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccsesRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccsesRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
