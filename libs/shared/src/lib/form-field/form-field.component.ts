import { Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';

@Component({
   selector: 'app-form-field',
   templateUrl: './form-field.component.html',
   styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
   @Input()
   label: string | undefined;

   @Input()
   hint: string | undefined;

   @Input()
   icon: string | undefined;

   @ViewChild(MatFormField, { static: true })
   public matFormField: MatFormField | undefined;

   @ContentChild(MatFormFieldControl, { static: true })
   public formFieldControl: MatFormFieldControl<unknown> | undefined;

   public ngOnInit() {
      // this is required to tell the mat-form-field it has a mat control.
      if (!this.formFieldControl || !this.matFormField) {
         throw Error('A form-field must contain a MatFormFieldControl');
      }
      this.matFormField._control = this.formFieldControl;
   }
}
