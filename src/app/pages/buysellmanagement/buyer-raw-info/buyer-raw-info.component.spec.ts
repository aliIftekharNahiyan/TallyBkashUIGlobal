import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRawInfoComponent } from './buyer-raw-info.component';

describe('BuyerRawInfoComponent', () => {
  let component: BuyerRawInfoComponent;
  let fixture: ComponentFixture<BuyerRawInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerRawInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRawInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
