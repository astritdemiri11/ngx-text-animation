import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.scss']
})
export class TextDisplayComponent {
  @Input() text?: string;
}
