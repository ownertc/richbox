import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntergralDetailComponent } from './intergral-detail.component';

describe('IntergralDetailComponent', () => {
  let component: IntergralDetailComponent;
  let fixture: ComponentFixture<IntergralDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntergralDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntergralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
