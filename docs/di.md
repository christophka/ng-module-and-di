# Dependency Injection (DI)

Dependency Injection follows the Inversion of Control (IoC) design pattern.
By using abstractions this pattern allows software systems to be loosely coupled.

### DI in vanilla JS

To better understand DI, we can take a look at what an implementation in vanilla JS would look like

```typescript
class Injector {
  private providers = new Map<unknown, unknown>();
  register(token: unknown, provider: unknown) {
    this.providers.add(token, provider);
  }
  get(token: unknown): unknown | null {
    return this.providers.get(token) ?? null;
  }
}

abstract class Logger {
  abstract log(msg: string): void;
}

class Component() {
  constructor(private logger: Logger) {}
  // 👇 we will store the actual tokens statically here
  static dependencies = [Logger];
}

const injector = new Injector();
injector.register(Logger, console);
const component = new Component(
  ...Component.dependencies.map(dep => injector.get(dep))
);
```
