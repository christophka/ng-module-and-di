# Dependency Injection (DI)

- https://angular.io/guide/dependency-injection

Dependency Injection follows the Inversion of Control (IoC) design pattern.
By using abstractions this pattern allows software systems to be loosely coupled.

### DI in vanilla JS

To better understand DI, we can take a look at what an implementation in vanilla JS would look like.
You can find it in [`primitive-injector.ts`](../scripts/primitive-injector.ts).

## How it works in Angular

### Providing a dependency

- https://angular.io/guide/dependency-injection#providing-dependency

First we need to declare something that can act as a dependency.

```ts
@Injectable()
class HeroService {}
```

However, this alone does not make the dependency useable via DI.
For this to work, it must be **provided** somewhere.

There are several levels on which a dependency can be provided:

- At the component level via `providers: [...]`
- At the module level via `providers: [...]`
- At the `application` level via `providedIn: 'root'`
- At the `platform` level via `providedIn: 'platform'`

Which brings us to the point that there are levels of injectors.

### Hierarchical injectors

- https://angular.io/guide/hierarchical-dependency-injection

Angular differentiats between 2 Injector hierarchies:

**Element** Injector (the "component" level mentioned above)

```ts
@Component({
  // 👇 When definied as a provider in a Component or Directive
  providers: [ItemService]
})
export class TestComponent { ... }
```

**Module** Injector (everything else)

```ts
@Injectable({
  // 👇 When the module this dependency is provided in
  providedIn: MyModule,
  // or
  providedIn: 'root'
  // or
  providedIn: 'platform'
})
export class SomeService { ... }
```

Another way to provide a service in the Module Injector Hierarchy, is via `providers` in
a `NgModule`. However, the approach with `providedIn` is preferable, due to tree-shaking.

```ts
@NgModule({
  providers: [SomeService]
})
export class SomeModule { ... }
```

### Dependency resolution and modifiers

- https://angular.io/guide/hierarchical-dependency-injection#resolution-rules

When resolving a token for a component/directive, Angular resolves it in two phases:

1. Against its parents in the `ElementInjector` hierarchy.
2. Against its parents in the `ModuleInjector` hierarchy.

### Resolution modifiers

- https://angular.io/guide/hierarchical-dependency-injection#resolution-modifiers
- https://www.youtube.com/watch?v=uVGnsmm9g-I

Resolution modifiers define how a dependency should be resolved along the
injector hierarchy.

- What to do if Angular doesn't find what you're looking for, that is @Optional()
- Where to start looking, that is @SkipSelf()
- Where to stop looking, @Host() and @Self()
