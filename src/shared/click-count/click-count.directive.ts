import {
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  Output,
} from '@angular/core';
import { BehaviorSubject, skip } from 'rxjs';
import { BaseService } from '../util/base-service';

@Injectable()
class ClickCounter extends BaseService {
  private _clicks = new BehaviorSubject(0);

  public readonly clicks$ = this._clicks.asObservable();

  constructor() {
    super('ClickCounter');
    this.clicks$.pipe(skip(1)).subscribe((clicks) => {
      this.logger.log(clicks, 'clicks');
    });
  }

  override ngOnDestroy(): void {
    this._clicks.complete();
    super.ngOnDestroy();
  }

  public count() {
    this._clicks.next(this._clicks.value + 1);
  }
}

@Directive({
  standalone: true,
  selector: '[count-clicks]',
  providers: [ClickCounter],
})
export class ClickCountDirective {
  @Output() clicksChanged = new EventEmitter<number>();

  constructor(private clickCounter: ClickCounter) {
    this.clickCounter.clicks$.subscribe((clicks) =>
      this.clicksChanged.emit(clicks)
    );
  }

  @HostListener('click')
  protected _onClick() {
    this.clickCounter.count();
  }
}
