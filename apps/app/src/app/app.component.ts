import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   numberLabel = 'Give me a number - and the label may be very very long';
   nameControl = new FormControl<string | null>(null);
   numberControl = new FormControl<number | null>(null, [Validators.required]);

   shortenTheLabel() {
      this.numberLabel = 'The Label';
   }
}
