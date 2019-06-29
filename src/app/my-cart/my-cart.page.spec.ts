import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartPage } from './my-cart.page';

describe('MyCartPage', () => {
  let component: MyCartPage;
  let fixture: ComponentFixture<MyCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
