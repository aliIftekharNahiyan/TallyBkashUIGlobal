import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEntryListComponent } from './seller-entry-list.component';

describe('SellerEntryListComponent', () => {
  let component: SellerEntryListComponent;
  let fixture: ComponentFixture<SellerEntryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerEntryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
