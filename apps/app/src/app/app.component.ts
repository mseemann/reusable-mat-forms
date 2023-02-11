import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   numberLabel = 'Give me a number - and the label may be very very long';
   nameControl = new FormControl<string | null>('xyz');
   numberControl = new FormControl<number | null>(null, [Validators.required]);

   form = new FormGroup({
      aName: this.nameControl,
      aNumber: this.numberControl,
   });

   shortenTheLabel() {
      this.numberLabel = 'The Label';
   }
}
