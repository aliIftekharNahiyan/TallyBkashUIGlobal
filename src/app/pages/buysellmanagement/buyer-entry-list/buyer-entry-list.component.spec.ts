import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEntryListComponent } from './buyer-entry-list.component';

describe('BuyerEntryListComponent', () => {
  let component: BuyerEntryListComponent;
  let fixture: ComponentFixture<BuyerEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerEntryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
