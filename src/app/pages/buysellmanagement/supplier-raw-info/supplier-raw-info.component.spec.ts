import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRawInfoComponent } from './supplier-raw-info.component';

describe('SupplierRawInfoComponent', () => {
  let component: SupplierRawInfoComponent;
  let fixture: ComponentFixture<SupplierRawInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierRawInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRawInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
