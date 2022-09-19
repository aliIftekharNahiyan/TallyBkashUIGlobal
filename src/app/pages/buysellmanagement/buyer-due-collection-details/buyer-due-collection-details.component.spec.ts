import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDueCollectionDetailsComponent } from './buyer-due-collection-details.component';

describe('BuyerDueCollectionDetailsComponent', () => {
  let component: BuyerDueCollectionDetailsComponent;
  let fixture: ComponentFixture<BuyerDueCollectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerDueCollectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerDueCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
