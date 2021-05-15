import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleListComponent } from './spectacle-list.component';

describe('SpectacleListComponent', () => {
  let component: SpectacleListComponent;
  let fixture: ComponentFixture<SpectacleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectacleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectacleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
