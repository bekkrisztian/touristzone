import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleSourceComponent } from './spectacle-source.component';

describe('SpectacleSourceComponent', () => {
  let component: SpectacleSourceComponent;
  let fixture: ComponentFixture<SpectacleSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectacleSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectacleSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
