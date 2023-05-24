import { Injectable } from '@angular/core';
import { BaseService } from '../util/base-service';
import { IMessenger, Message, MessageBusService } from './message-bus.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessengerService extends BaseService implements IMessenger {
  private _msg = new Subject<Message<unknown>>();

  public readonly message$ = this._msg.asObservable();

  constructor(private _bus: MessageBusService) {
    super('MessengerService');
    this._bus.register(this);
    this._msg.subscribe((msg) => {
      const args: unknown[] = ['message received\n', msg.message];
      if ('data' in msg) {
        args.push(msg.data);
      }
      this.logger.log(...args);
    });
  }

  override ngOnDestroy(): void {
    this._bus.unregister(this);
    this._msg.complete();
  }

  broadcast(message: string): void;
  broadcast<T>(message: string, data?: T): void;
  broadcast<T>(message: string, data?: T) {
    this._bus.broadcast(this, message, data);
  }

  receive(message: Message<unknown>): void {
    this._msg.next(message);
  }
}
