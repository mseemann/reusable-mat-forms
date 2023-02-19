import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

interface Item {
   description: FormControl<string | null>;
}

const createValidator = () => {
   return (arrayWithItems: FormArray<FormGroup<Item>>) => {
      return arrayWithItems.length >= 2 ? null : { min: 2, current: arrayWithItems.length };
   };
};

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   testData = {
      aName: 'a',
      aNumber: 1,
      anArray: [{ description: 'desc1' }, { description: 'desc2' }],
   };

   numberLabel = 'Give me a number - and the label may be very very long';
   nameControl = new FormControl<string | null>('xyz');
   numberControl = new FormControl<number | null>(null, [Validators.required]);

   form = new FormGroup({
      aName: this.nameControl,
      aNumber: this.numberControl,
      anArray: new FormArray<FormGroup<Item>>([], createValidator() as ValidatorFn),
   });

   shortenTheLabel() {
      this.numberLabel = 'The Label';
   }

   ngOnInit() {
      this.form.controls.anArray.clear({ emitEvent: false });
      this.testData.anArray.forEach(() =>
         this.form.controls.anArray.push(this.createItem(), { emitEvent: false })
      );
      this.form.patchValue(this.testData);
   }

   public trackBy(index: number) {
      return index;
   }

   private createItem() {
      return new FormGroup({
         description: new FormControl<string | null>(null, Validators.minLength(3)),
      });
   }
}
