import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective, NgControl, ReactiveFormsModule } from '@angular/forms';
import { appendFormControlInputOutputTransformerProxy } from './form-control-util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';

@Component({
   selector: 'app-test',
   template: ` <input #input matInput [formControl]="control" /> `,
})
export class TestComponent implements OnInit {
   @Input()
   control = new FormControl<string | null>(null);

   @ViewChild(FormControlDirective, { static: true }) input: NgControl | undefined;

   ngOnInit() {
      appendFormControlInputOutputTransformerProxy<string | null, string | null>(
         this.input,
         (inputValue) => inputValue + '-test',
         (outgoingValue) => outgoingValue?.trim() ?? null
      );
   }
}

describe('createFormControlInputOutputTransformerProxy', () => {
   let component: TestComponent;
   let fixture: ComponentFixture<TestComponent>;
   let loader: HarnessLoader;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [TestComponent],
         imports: [MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should trasnform incomming values', async () => {
      component.control.setValue('xyz');

      const input = await loader.getHarness(MatInputHarness);
      expect(await input.getValue()).toEqual('xyz-test');
   });

   it('should trasnform outgoing values', async () => {
      const input = await loader.getHarness(MatInputHarness);
      await input.setValue('   xyz    ');
      expect(component.control.value).toEqual('xyz');
   });

   it('should throw an error if the ngControl is not present', () => {
      expect(() => {
         appendFormControlInputOutputTransformerProxy(
            undefined,
            (v) => v,
            (v) => v
         );
      }).toThrow('NgControl with valueAccessor is strongly needed to create a proxy');
   });

   it('should throw an error if the valueAccessor is not present', () => {
      const ngControl = {} as NgControl;
      expect(() => {
         appendFormControlInputOutputTransformerProxy(
            ngControl,
            (v) => v,
            (v) => v
         );
      }).toThrow('NgControl with valueAccessor is strongly needed to create a proxy');
   });
});
