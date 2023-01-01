import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberControlComponent } from './number-control.component';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
   selector: 'app-test',
   template: ` <app-number-control [formControl]="control"></app-number-control> `,
})
class TestComponent {
   control = new FormControl();
}

describe('NumberControlComponent', () => {
   let component: TestComponent;
   let fixture: ComponentFixture<TestComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [TestComponent, NumberControlComponent],
         imports: [ReactiveFormsModule, MatInputModule, FormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
