import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierdeletedlistComponent } from './supplierdeletedlist.component';

describe('SupplierdeletedlistComponent', () => {
  let component: SupplierdeletedlistComponent;
  let fixture: ComponentFixture<SupplierdeletedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierdeletedlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierdeletedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
