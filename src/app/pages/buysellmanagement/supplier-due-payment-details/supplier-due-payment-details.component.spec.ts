import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDuePaymentDetailsComponent } from './supplier-due-payment-details.component';

describe('SupplierDuePaymentDetailsComponent', () => {
  let component: SupplierDuePaymentDetailsComponent;
  let fixture: ComponentFixture<SupplierDuePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDuePaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDuePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
