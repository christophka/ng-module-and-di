import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/util/base-service';

@Injectable({
  providedIn: 'root',
})
export class SideAppService extends BaseService {
  constructor() {
    super('SideAppService');
  }
}
