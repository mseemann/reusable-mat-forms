import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAsTooltipIfNotCompletelyVisibleDirective } from './show-as-tooltip-if-not-completely-visible.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormFieldComponent } from './form-field/form-field.component';
import { NumberControlComponent } from './number-control/number-control.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
   ShowAsTooltipIfNotCompletelyVisibleDirective,
   FormFieldComponent,
   NumberControlComponent,
];

@NgModule({
   imports: [CommonModule, MatTooltipModule, MatIconModule, MatInputModule, FormsModule],
   declarations: [...COMPONENTS],
   exports: [...COMPONENTS],
})
export class SharedModule {}
