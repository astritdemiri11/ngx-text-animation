import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[textScroll]'
})
export class TextScrollDirective {
  @Input() speed?: number;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef<HTMLElement>) { }

  @HostListener('mouseover') mouseenter() {
    this.scroll();
  }

  @HostListener('mouseleave') mouseleave() {
    this.unScroll();
  }

  ngOnInit() {
    if (!this.speed) {
      this.speed = 1000
    }

    const textScrollElement = this.elementRef.nativeElement;

    this.renderer2.setStyle(textScrollElement, 'whiteSpace', 'nowrap');
    this.renderer2.setStyle(textScrollElement, 'overflow', 'hidden');
    this.renderer2.setStyle(textScrollElement, 'textOverflow', 'ellipsis');
    this.renderer2.setStyle(textScrollElement, 'transition', `transform linear ${this.speed}ms`);

    this.renderer2.setStyle(textScrollElement.parentNode, 'overflow', 'hidden');
  }

  private scroll() {
    const textScrollElement = this.elementRef.nativeElement;
    const childElement = textScrollElement.children[0] as HTMLElement | null;

    if (childElement && childElement.offsetWidth >= textScrollElement.clientWidth) {
      this.renderer2.setStyle(textScrollElement, 'transform', `translateX(${textScrollElement.clientWidth - childElement.offsetWidth}px)`);
      this.renderer2.setStyle(textScrollElement, 'overflow', 'visible');
      this.renderer2.setStyle(textScrollElement, 'textOverflow', 'unset');
    }
  }

  private unScroll() {
    const textScrollElement = this.elementRef.nativeElement as HTMLElement | null;

    this.renderer2.setStyle(textScrollElement, 'transform', 'translateX(0)');
    this.renderer2.setStyle(textScrollElement, 'overflow', 'hidden');
    this.renderer2.setStyle(textScrollElement, 'textOverflow', 'ellipsis');
  }
}
