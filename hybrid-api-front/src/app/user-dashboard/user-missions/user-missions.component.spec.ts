import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMissionsComponent } from './user-missions.component';

describe('UserMissionsComponent', () => {
  let component: UserMissionsComponent;
  let fixture: ComponentFixture<UserMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
