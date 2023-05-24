# `NgModule` and ES modules

Modules are **independent** building blocks of a software program. They are basically a design pattern that implements features of modular design in programming languages.

Both, `NgModule` and ES modules are modules and provide modular design, but they differ in scale.

Probably one of the main reasons why something else than ES modules exists, is that many other solutions (like `NgModule`) needed some way to modularize software before ES modules were added to the ECMAScript standard.

### A quick intro to ES modules

QuickLinks:

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- https://www.youtube.com/watch?v=ntJ-P-Cvo7o

We use ES modules in our everyday life as developers. Every **_file_** that uses `import` or `export` can be considered an ES module.

```ts
// say-hi.ts
export function sayHi(name: string) {
  log(`Hi ${name}`);
}

// 👇 Since log is not exported it is "private" to this module
function log(text: string) {
  console.log(text);
  alert(text);
}

// index.ts
import { sayHi } from "./say-hi";
sayHi("Frantz Fanon");
```

You can think of ES modules being micro in nature - very small encapsulated blocks.

## What is a `NgModule`

QuickLinks:

- https://angular.io/api/core/NgModule

Compared with ES modules, a `NgModule` works rather on a **macro** level, because it bundles a bunch of (complementary) functionality.

### Declarations

When you write a Directive, Component or Pipe (which Angular calls "declarable") in Angular you'd like to be able to use it in some other place. Before you can use it, you must specify which `NgModule` declares it.

> There is one only one exception, and that is using the new `standalone: true` flag.
>
> https://angular.io/guide/standalone-components

Furthermore, it allows the `NgModule` itself to use the thing that is being declared.

```ts
// join.pipe.ts
@Pipe({ name: 'joinMembers' })
export class JoinMembersPipe { ... }

// team.component.ts
@Component({
  selector: 'my-team',
  // join is part of module so can be used 👇
  template: 'Team Members: {{ members | joinMembers }}'
})
export class MyTeamComponent {
  members: TeamMember[];
}

// team.module.ts
@NgModule({
  declarations: [JoinMembersPipe, MyTeamComponent],
  exports: [...],
  imports: [...],
})
export class TeamModule { ... }
```

Each declarable is only allowed in exactly one Module.

### Export and Import

Much like ES modules, `NgModule`s are building blocks that can **export** functionality for other `NgModule`s to be **import**ed.

```ts
// my.module.ts
@NgModule({
  imports: [...],
  // We declare both components as belonging to MyModule
  declaration: [SharedComponent, PrivateComponent],
  // 👇 PrivateComponent isn't exported, so it isn't usable outside of MyModule
  exports: [SharedComponent]
})
export class MyModule { ... }

// my-other.module.ts
@NgModule({
  // 👇 We import the functionality from MyModule
  imports: [MyModule]
})
export class MyOtherModule { ... }
```

Notice how each `NgModule` also exists inside an ES module.
