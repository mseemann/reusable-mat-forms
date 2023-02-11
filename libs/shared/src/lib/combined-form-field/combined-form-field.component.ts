import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective, NgControl } from '@angular/forms';
import { createFormControlInputOutputTransformerProxy } from '../form-control-util';

@Component({
   selector: 'app-combined-form-field',
   templateUrl: './combined-form-field.component.html',
   styleUrls: ['./combined-form-field.component.scss'],
})
export class CombinedFormFieldComponent implements OnInit {
   @Input()
   control!: FormControl;

   @ViewChild(FormControlDirective, { static: true }) input: NgControl | undefined;

   ngOnInit() {
      if (this.input?.valueAccessor) {
         this.input.valueAccessor = createFormControlInputOutputTransformerProxy<
            string | null,
            string | null
         >(
            this.input.valueAccessor,
            (inputValue) => inputValue,
            (value) => value?.trim() ?? null
         );
      }
   }
}
