import { Component, Host, Optional, Self, SkipSelf } from '@angular/core';
import { AnimalService, FlowerService } from 'src/shared/garden/garden.service';

@Component({
  selector: 'app-garden',
  template: `
    <div>Flower: {{ flower.emoji }}</div>
    <div>Animal: {{ animal.emoji }}</div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 0.5rem;
        margin: 0.5rem;
        border: 1px solid brown;
      }
    `,
  ],
})
export class GardenComponent {
  constructor(
    protected flower: FlowerService,
    protected animal: AnimalService
  ) {}
}

@Component({
  selector: 'app-secret-garden',
  template: `
    <div>Secret garden</div>
    <app-garden></app-garden>

    <div>Public garden</div>
    <ng-content></ng-content>
  `,
  providers: [{ provide: FlowerService, useValue: { emoji: '💮' } }],
  viewProviders: [{ provide: AnimalService, useValue: { emoji: '🦄' } }],
})
export class SecretGardenComponent {
  constructor(
    protected flower: FlowerService,
    protected animal: AnimalService
  ) {}
}

@Component({
  selector: 'app-skip-self-garden',
  template: `
    <div>@SkipSelf garden</div>
    <div>Flower: {{ flower.emoji }}</div>
    <div>Animal: {{ animal.emoji }}</div>
    <app-garden></app-garden>
  `,
  providers: [
    {
      provide: AnimalService,
      useValue: { emoji: '🙈' },
    },
  ],
})
export class SkipSelfGardenComponent {
  constructor(
    protected flower: FlowerService,
    @SkipSelf()
    protected animal: AnimalService
  ) {}
}

@Component({
  selector: 'app-host-garden',
  template: `
    <div>Flower: {{ flower?.emoji }}</div>
    <div>Animal: {{ animal?.emoji }}</div>
  `,
})
export class HostGardenComponent {
  constructor(
    @Optional() @Host() protected flower: FlowerService | null,
    @Optional() @Host() protected animal: AnimalService | null
  ) {}
}

@Component({
  selector: 'app-host-parent-garden',
  template: ` <app-host-garden></app-host-garden> `,
  viewProviders: [
    {
      provide: AnimalService,
      useValue: { emoji: '🐿️' },
    },
  ],
})
export class HostParentGardenComponent {
  constructor(
    protected flower: FlowerService | null,
    protected animal: AnimalService | null
  ) {}
}

@Component({
  selector: 'app-self-garden',
  template: `
    <div>@Self garden</div>
    <app-garden></app-garden>
    <ng-content></ng-content>
  `,
  providers: [
    {
      provide: AnimalService,
      useValue: { emoji: '🦖' },
    },
  ],
})
export class SelfGardenComponent {
  constructor(
    protected flower: FlowerService,
    @Self()
    protected animal: AnimalService
  ) {}
}

@Component({
  template: `
    <app-garden></app-garden>

    <hr />

    <app-secret-garden>
      <app-garden></app-garden>
    </app-secret-garden>

    <hr />

    <app-self-garden></app-self-garden>

    <hr />

    <app-skip-self-garden>
      <app-garden></app-garden>
    </app-skip-self-garden>

    <hr />

    <app-host-parent-garden></app-host-parent-garden>
  `,
})
export class GardenPageComponent {
  constructor(
    protected flower: FlowerService,
    protected animal: AnimalService
  ) {}
}
