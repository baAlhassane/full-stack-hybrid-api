import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInfosComponent } from './provider-infos.component';

describe('ProviderInfosComponent', () => {
  let component: ProviderInfosComponent;
  let fixture: ComponentFixture<ProviderInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
