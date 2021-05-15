import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleDetailsComponent } from './spectacle-details.component';

describe('SpectacleDetailsComponent', () => {
  let component: SpectacleDetailsComponent;
  let fixture: ComponentFixture<SpectacleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectacleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectacleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
