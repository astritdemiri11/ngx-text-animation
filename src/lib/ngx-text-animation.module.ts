import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TextDisplayComponent } from './components/text-display/text-display.component';
import { TextReadComponent } from './components/text-read/text-read.component';
import { TextScrollDirective } from './directives/text-scroll/text-scroll.directive';



@NgModule({
  declarations: [
    TextDisplayComponent,
    TextReadComponent,
    TextScrollDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextDisplayComponent,
    TextReadComponent,
    TextScrollDirective
  ]
})
export class TextAnimationModule { }
