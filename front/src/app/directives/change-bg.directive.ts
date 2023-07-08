import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {

  tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
  kirheading = '<h1>KIR</h1>'
  crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) {}
  @HostListener('click') answer() {
    if (this.isCorrect) {
      console.log("DOROSTE")
      this.render.addClass(this.el.nativeElement, 'correct');
      // this.render.appendChild(this.el.nativeElement, this.tickIconTag);
      this.render.addClass(this.el.nativeElement, 'disabled');

      // this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
    } else {
      console.log("GHALATE")
      this.render.addClass(this.el.nativeElement, 'incorrect');
      this.render.addClass(this.el.nativeElement, 'disabled');
      // this.render.appendChild(this.el.nativeElement, this.kirheading);

      // this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
    }
  }
}
