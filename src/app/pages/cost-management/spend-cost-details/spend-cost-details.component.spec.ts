import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendCostDetailsComponent } from './spend-cost-details.component';

describe('SpendCostDetailsComponent', () => {
  let component: SpendCostDetailsComponent;
  let fixture: ComponentFixture<SpendCostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendCostDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendCostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
