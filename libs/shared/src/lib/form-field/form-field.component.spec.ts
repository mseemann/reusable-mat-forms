import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldComponent } from './form-field.component';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
   selector: 'app-test',
   template: `
      <app-form-field>
         <input matInput />
      </app-form-field>
   `,
})
class TestComponent {}

describe('FormFieldComponent', () => {
   let component: TestComponent;
   let fixture: ComponentFixture<TestComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [TestComponent, FormFieldComponent],
         imports: [MatInputModule, NoopAnimationsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
