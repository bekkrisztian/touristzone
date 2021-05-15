import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectacleEditComponent } from './spectacle-edit.component';

describe('SpectacleEditComponent', () => {
  let component: SpectacleEditComponent;
  let fixture: ComponentFixture<SpectacleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectacleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectacleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
