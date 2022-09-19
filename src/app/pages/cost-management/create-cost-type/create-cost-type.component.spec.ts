import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCostTypeComponent } from './create-cost-type.component';

describe('CreateCostTypeComponent', () => {
  let component: CreateCostTypeComponent;
  let fixture: ComponentFixture<CreateCostTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCostTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
