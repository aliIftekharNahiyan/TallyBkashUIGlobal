import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRawInfoDetailsComponent } from './buyer-raw-info-details.component';

describe('BuyerRawInfoDetailsComponent', () => {
  let component: BuyerRawInfoDetailsComponent;
  let fixture: ComponentFixture<BuyerRawInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerRawInfoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRawInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
