import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/util/base-service';

@Injectable({
  providedIn: 'root',
})
export class AppService extends BaseService {
  constructor() {
    super('AppService');
  }
}
