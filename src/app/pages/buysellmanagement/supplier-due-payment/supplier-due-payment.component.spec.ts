import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDuePaymentComponent } from './supplier-due-payment.component';

describe('SupplierDuePaymentComponent', () => {
  let component: SupplierDuePaymentComponent;
  let fixture: ComponentFixture<SupplierDuePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDuePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDuePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
