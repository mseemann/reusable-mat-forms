import { Component, ElementRef, HostBinding, Inject, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ON_CHANGE_DEFAULT = (_: any) => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ON_TOUCH_DEFAULT = () => {};

@Component({
   selector: 'app-number-control',
   templateUrl: './number-control.component.html',
   styleUrls: ['./number-control.component.scss'],
   providers: [{ provide: MatFormFieldControl, useExisting: NumberControlComponent }],
})
export class NumberControlComponent implements ControlValueAccessor, MatFormFieldControl<number> {
   autofilled = false;
   controlType = 'app-number';
   disabled = false;
   get empty(): boolean {
      return this.value == null;
   }
   get errorState(): boolean {
      return this.ngControl.touched == true && !this.ngControl.valid;
   }
   focused = false;
   id = 'TODO';
   @Input()
   placeholder = '';
   required = false;
   stateChanges = new Subject<void>();
   value: number | null = null;

   onChange = ON_CHANGE_DEFAULT;

   onTouched = ON_TOUCH_DEFAULT;

   @HostBinding('class.readonly')
   @Input()
   readonly = false;

   @HostBinding('class.floating')
   get shouldLabelFloat() {
      return this.focused || !this.empty;
   }

   @ViewChild('input') private inputEl: ElementRef | undefined;

   constructor(@Inject(NgControl) public ngControl: NgControl) {
      ngControl.valueAccessor = this;
   }
   registerOnChange(fn: never): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: never): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
      this.stateChanges.next();
   }

   writeValue(obj: number): void {
      this.value = obj;
      this.stateChanges.next();
   }

   onContainerClick(event: MouseEvent): void {
      this.inputEl?.nativeElement.focus();
      this.focused = true;
      this.stateChanges.next();
   }

   setDescribedByIds(ids: string[]): void {
      // maybe later implemented
   }

   valueChange(value: number) {
      this.value = value;
      this.onChange(value);
      this.stateChanges.next();
   }

   onBlur() {
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
   }
}
