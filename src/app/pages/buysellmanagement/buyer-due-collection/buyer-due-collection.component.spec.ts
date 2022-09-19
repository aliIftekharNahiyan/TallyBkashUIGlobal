import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDueCollectionComponent } from './buyer-due-collection.component';

describe('BuyerDueCollectionComponent', () => {
  let component: BuyerDueCollectionComponent;
  let fixture: ComponentFixture<BuyerDueCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerDueCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDueCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
