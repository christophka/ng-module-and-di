import { AppModule } from './app/app.module';
import { SideAppModule } from './side-app/side-app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NamedLogger } from './shared/util/logger';

const platformRef = platformBrowserDynamic();

const mainLooger = new NamedLogger(console, '[main]');

platformRef
  .bootstrapModule(AppModule)
  .then(() => mainLooger.log('AppModule bootstrapped.'))
  .catch((err) => mainLooger.error('Error bootstrapping AppModule', err));

platformRef
  .bootstrapModule(SideAppModule)
  .then(() => mainLooger.log('SideAppModule bootstrapped.'))
  .catch((err) => mainLooger.error('Error bootstrapping AppModule', err));
