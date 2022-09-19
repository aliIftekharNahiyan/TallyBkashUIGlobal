import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEntryComponent } from './seller-entry.component';

describe('SellerEntryComponent', () => {
  let component: SellerEntryComponent;
  let fixture: ComponentFixture<SellerEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
