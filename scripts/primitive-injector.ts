// ==================================================================
// First we look at an implemention for an injection token
// and an injetor.
// ==================================================================
class InjectionToken<T> {
  declare _type: T;
  token: symbol;
  constructor(name: string) {
    this.token = Symbol(name);
  }
}

class Injector {
  // holds providers for each registered token
  private providers = new Map<InjectionToken<unknown>, unknown>();
  register<T>(token: InjectionToken<T>, provider: T) {
    this.providers.set(token, provider);
  }
  get<T>(token: InjectionToken<T>): T | null {
    return (this.providers.get(token) as T) ?? null;
  }
}

// This is a helper to create an instance of T.
function factory<T>(ctor: Creatable<T>, injector: Injector): T {
  return new ctor(...ctor.dependencies.map((dep) => injector.get(dep)));
}

// ==================================================================
// Next, we create some types that ensure that we correctly use
// everything.
// ==================================================================
type Ctor<T> = new (...args: any) => T;
type Dependencies<T extends Ctor<any>> = T extends new (...args: infer P) => any
  ? P
  : never;

type TokenMap<T> = {
  [P in keyof T]: InjectionToken<T[P]>;
};

// Helper type that maps list of constructor parameters to a list of
// injection tokens of the same type.
type DependencyTokens<T extends Ctor<any>> = TokenMap<Dependencies<T>>;

// This type defines something that can create an instance of T
// and that holds injection tokens.
interface Creatable<T> extends Ctor<T> {
  dependencies: InjectionToken<unknown>[];
}

// ==================================================================
// Now let's create similar to a service in Angular.
// ==================================================================
abstract class Logger {
  abstract log(msg: string): void;
  //    👇 This is analogous to what Injectable() does.
  static token = new InjectionToken<Logger>('logger');
}

// ==================================================================
// Next up we create something similar to a component in Angular.
// ==================================================================
class Component {
  //     👇 adding @Component(...) in Angular will create something similar
  static dependencies: DependencyTokens<typeof Component> = [Logger.token];

  constructor(private logger: Logger) {
    this.logger.log('constructor called');
  }

  test() {
    this.logger.log('test called');
  }
}

//   👇 Angular creates injectors internally and registers dependencies
const injector = new Injector();
injector.register(Logger.token, console);

//   👇 This is was Angular does when you use e.g. <component> in a template.
const component = factory(Component, injector);
component.test();
