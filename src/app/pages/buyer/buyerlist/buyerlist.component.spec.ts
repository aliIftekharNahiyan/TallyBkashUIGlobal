import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerlistComponent } from './buyerlist.component';

describe('BuyerlistComponent', () => {
  let component: BuyerlistComponent;
  let fixture: ComponentFixture<BuyerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
