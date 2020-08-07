import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'shared-infinite-scroll',
  templateUrl: './infinite-scroll.component.html'
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() public options: IntersectionObserverInit;
  @Output() public scrolledToBottomEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('anchor', {static: true}) private _anchorElement: ElementRef<HTMLDivElement>;
  private observer: IntersectionObserver;

  ngOnInit(): void {

    this.observer = new IntersectionObserver((([entity]) => {
      if (entity.isIntersecting) {
        this.scrolledToBottomEvent.emit();
      }
    }), this.options);

    this.observer.observe(this._anchorElement.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }


}
