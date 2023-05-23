import { Injectable, OnDestroy } from '@angular/core';
import { ILogger, NamedLogger } from './logger';
import { getId } from './number-generator';

@Injectable()
export abstract class BaseService implements OnDestroy {
  readonly id = getId();

  get logger() {
    if (!this._logger) {
      this._logger = new NamedLogger(console, `[${this.name} | ${this.id}]:`);
    }
    return this._logger;
  }
  private _logger?: ILogger;

  constructor(protected readonly name: string) {
    this.logger.log('init');
  }

  ngOnDestroy(): void {
    this.logger.log('destroyed');
  }
}
