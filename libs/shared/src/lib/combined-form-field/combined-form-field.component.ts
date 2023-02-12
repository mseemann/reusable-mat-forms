import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective, NgControl } from '@angular/forms';
import { appendFormControlInputOutputTransformerProxy } from '../form-control-util';

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
      appendFormControlInputOutputTransformerProxy<string | null, string | null>(
         this.input,
         (inputValue) => inputValue + '.',
         (value) => value?.trim() ?? null
      );
   }
}
