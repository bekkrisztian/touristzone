import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyAddComponent } from './county-add.component';

describe('CountyAddComponent', () => {
  let component: CountyAddComponent;
  let fixture: ComponentFixture<CountyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
