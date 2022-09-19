import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRawInfoDetailsComponent } from './supplier-raw-info-details.component';

describe('SupplierRawInfoDetailsComponent', () => {
  let component: SupplierRawInfoDetailsComponent;
  let fixture: ComponentFixture<SupplierRawInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierRawInfoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRawInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
