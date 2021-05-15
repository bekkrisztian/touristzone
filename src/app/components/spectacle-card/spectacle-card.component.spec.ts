import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleCardComponent } from './spectacle-card.component';

describe('SpectacleCardComponent', () => {
  let component: SpectacleCardComponent;
  let fixture: ComponentFixture<SpectacleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectacleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectacleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
