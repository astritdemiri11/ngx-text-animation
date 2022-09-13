import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'text-read',
  templateUrl: './text-read.component.html',
  styleUrls: ['./text-read.component.scss']
})
export class TextReadComponent implements OnInit, AfterViewInit {
  @Input() hideCursor?: boolean;
  @Input() cursorClass?: string;
  @Input() overlayClass?: string;
  @Input() relativeTo?: HTMLElement;
  @Input() rowHeight?: number;
  @Input() speed?: number;
  @Input() textLength?: number;

  @ViewChild('overlay', { static: false }) overlay?: ElementRef<HTMLDivElement>;

  reading: boolean;
  revealed: boolean;
  rows: number[];

  private timerSubscription: Subscription | null;

  constructor(
    public elementRef: ElementRef,
    private renderer2: Renderer2) {
    this.rows = [];
    this.reading = false;
    this.revealed = true;
    this.timerSubscription = null;
  }

  start() {
    this.refresh();

    this.revealed = false;

    timer(0).subscribe(() => {
      if (this.overlay) {
        this.renderer2.addClass(this.overlay.nativeElement, 'read');
        this.renderer2.removeClass(this.overlay.nativeElement, 'reveal');
        this.reading = true;
      }

      if(this.speed) {
        this.timerSubscription = timer(this.speed).subscribe(() => {
          this.reveal();
        });
      }
    })
  }

  reveal() {
    this.refresh();
    this.revealed = true;

    if (this.overlay) {
      this.renderer2.addClass(this.overlay.nativeElement, 'reveal');
      this.renderer2.removeClass(this.overlay.nativeElement, 'read');
      this.reading = false;
    }

    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  restart() {
    this.reveal();
    this.start();
  }

  ngOnInit() {
    if (!this.relativeTo) {
      throw new Error(`text-read component, [relativeTo] attribute is required`);
    }

    if (!this.rowHeight) {
      throw new Error(`text-read component, [rowHeight] attribute is required`);
    }

    if (!this.cursorClass) {
      this.cursorClass = 'cursor-white';
    }

    if (!this.overlayClass) {
      this.overlayClass = 'overlay-black';
    }

    if (!this.speed) {
      this.speed = 1000;
    }

    this.refresh();
  }

  ngAfterViewInit() {
    if (this.overlay && this.overlayClass) {
      this.renderer2.addClass(this.overlay.nativeElement, this.overlayClass);
    }
  }

  private refresh() {
    if (this.relativeTo && this.rowHeight) {
      const rowCount = Math.ceil(this.relativeTo.clientHeight / this.rowHeight);

      if(rowCount) {
        this.rows = Array(rowCount).fill(0).map((_x, i) => i);
      }
    }

    if (this.overlay && this.overlayClass) {
      this.renderer2.removeClass(this.overlay.nativeElement, this.overlayClass);
    }
  }
}
