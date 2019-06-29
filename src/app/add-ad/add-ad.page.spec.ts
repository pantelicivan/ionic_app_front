import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdPage } from './add-ad.page';

describe('AddAdPage', () => {
  let component: AddAdPage;
  let fixture: ComponentFixture<AddAdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
