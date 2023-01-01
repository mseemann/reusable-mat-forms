import { ShowAsTooltipIfNotCompletelyVisibleDirective } from './show-as-tooltip-if-not-completely-visible.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: ``,
})
class TestComponent {}

describe('ShowAsTooltipIfNotCompletelyVisibleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAsTooltipIfNotCompletelyVisibleDirective],
      imports: [MatTooltipModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
