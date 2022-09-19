import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyermodificationComponent } from './buyermodification.component';

describe('BuyermodificationComponent', () => {
  let component: BuyermodificationComponent;
  let fixture: ComponentFixture<BuyermodificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyermodificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyermodificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
