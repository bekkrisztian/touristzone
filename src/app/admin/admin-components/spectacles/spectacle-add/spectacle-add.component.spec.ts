import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleAddComponent } from './spectacle-add.component';

describe('SpectacleAddComponent', () => {
  let component: SpectacleAddComponent;
  let fixture: ComponentFixture<SpectacleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectacleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectacleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
