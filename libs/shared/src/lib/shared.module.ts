import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAsTooltipIfNotCompletelyVisibleDirective } from './show-as-tooltip-if-not-completely-visible.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

const COMPONENTS = [ShowAsTooltipIfNotCompletelyVisibleDirective];

@NgModule({
  imports: [CommonModule, MatTooltipModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class SharedModule {}
