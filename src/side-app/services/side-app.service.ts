import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/shared/util/base-service';

@Injectable({
  providedIn: 'root',
})
export class SideAppService extends BaseService {
  private _hasContent = new BehaviorSubject(false);
  public readonly hasContent$ = this._hasContent.asObservable();

  constructor() {
    super('SideAppService');
  }

  public setHasContent(value: boolean) {
    this._hasContent.next(value);
  }
}
