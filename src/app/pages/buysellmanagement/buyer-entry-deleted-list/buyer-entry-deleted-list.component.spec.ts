import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerEntryDeletedListComponent } from './buyer-entry-deleted-list.component';

describe('BuyerEntryDeletedListComponent', () => {
  let component: BuyerEntryDeletedListComponent;
  let fixture: ComponentFixture<BuyerEntryDeletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerEntryDeletedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerEntryDeletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
