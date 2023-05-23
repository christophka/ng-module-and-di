import { Injectable } from '@angular/core';
import { BaseService } from '../util/base-service';
import { Subject, Subscription, filter } from 'rxjs';

export interface Message<T> {
  target: unknown;
  sender: unknown;
  message: string;
  data?: T;
}

export interface IMessenger {
  receive(message: Message<unknown>): void;
}

const BROADCAST = Symbol('broadcast');

@Injectable({
  providedIn: 'platform',
})
export class MessageBusService extends BaseService {
  private _messengers = new Map<IMessenger, Subscription>();

  private _msg = new Subject<Message<unknown>>();

  constructor() {
    super('MessageBusService');
  }

  register(messenger: IMessenger): void {
    this._messengers.set(
      messenger,
      this._msg
        .pipe(
          filter(
            (msg) =>
              msg.target === messenger ||
              (msg.target === BROADCAST && msg.sender !== messenger)
          )
        )
        .subscribe((msg) => {
          messenger.receive(msg);
        })
    );
  }
  unregister(messenger: IMessenger): void {
    this._messengers.get(messenger)?.unsubscribe();
    this._messengers.delete(messenger);
  }

  broadcast<T>(sender: unknown, message: string, data?: T): void {
    const msg: Message<T> = { target: BROADCAST, sender, message };
    if (data !== undefined) {
      msg.data = data;
    }
    this._msg.next(msg);
  }
}
