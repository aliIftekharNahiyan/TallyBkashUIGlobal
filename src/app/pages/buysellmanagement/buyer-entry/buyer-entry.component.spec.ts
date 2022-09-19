import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEntryComponent } from './buyer-entry.component';

describe('BuyerEntryComponent', () => {
  let component: BuyerEntryComponent;
  let fixture: ComponentFixture<BuyerEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
