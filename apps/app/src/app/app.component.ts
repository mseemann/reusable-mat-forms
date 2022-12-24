import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const toBigValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value > 5 ? { 'to-big': true } : null;
};
const toSmallValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value < 2 ? { 'to-small': true } : null;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  numberLabel = 'Give me a number - and the label may be very very long';
  nameControl = new FormControl<string | null>(null);
  numberControl = new FormControl<number | null>(null, [toBigValidator, toSmallValidator]);

  shortenTheLabel() {
    this.numberLabel = 'The Label';
  }
}
