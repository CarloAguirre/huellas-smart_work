import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoresDeEmisionComponent } from './factores-de-emision.component';

describe('FactoresDeEmisionComponent', () => {
  let component: FactoresDeEmisionComponent;
  let fixture: ComponentFixture<FactoresDeEmisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoresDeEmisionComponent]
    });
    fixture = TestBed.createComponent(FactoresDeEmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
