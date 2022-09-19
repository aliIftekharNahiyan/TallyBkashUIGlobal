import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEntryDeletedListComponent } from './seller-entry-deleted-list.component';

describe('SellerEntryDeletedListComponent', () => {
  let component: SellerEntryDeletedListComponent;
  let fixture: ComponentFixture<SellerEntryDeletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerEntryDeletedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEntryDeletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
