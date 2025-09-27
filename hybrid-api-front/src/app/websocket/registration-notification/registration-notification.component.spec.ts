import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationNotificationComponent } from './registration-notification.component';

describe('RegistrationNotificationComponent', () => {
  let component: RegistrationNotificationComponent;
  let fixture: ComponentFixture<RegistrationNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
