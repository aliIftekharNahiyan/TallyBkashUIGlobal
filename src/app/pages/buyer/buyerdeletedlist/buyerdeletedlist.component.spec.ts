import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerdeletedlistComponent } from './buyerdeletedlist.component';

describe('BuyerdeletedlistComponent', () => {
  let component: BuyerdeletedlistComponent;
  let fixture: ComponentFixture<BuyerdeletedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerdeletedlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerdeletedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
