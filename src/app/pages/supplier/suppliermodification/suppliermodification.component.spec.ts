import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliermodificationComponent } from './suppliermodification.component';

describe('SuppliermodificationComponent', () => {
  let component: SuppliermodificationComponent;
  let fixture: ComponentFixture<SuppliermodificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliermodificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliermodificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
