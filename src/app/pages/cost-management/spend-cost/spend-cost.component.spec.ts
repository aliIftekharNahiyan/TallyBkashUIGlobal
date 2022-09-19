import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendCostComponent } from './spend-cost.component';

describe('SpendCostComponent', () => {
  let component: SpendCostComponent;
  let fixture: ComponentFixture<SpendCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
