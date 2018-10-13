import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasumDetaiComponent } from './casum-detai.component';

describe('CasumDetaiComponent', () => {
  let component: CasumDetaiComponent;
  let fixture: ComponentFixture<CasumDetaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasumDetaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasumDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
