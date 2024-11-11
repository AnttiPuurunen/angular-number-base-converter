import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NumberBaseConverter } from './app/number-base-converter';

bootstrapApplication(NumberBaseConverter, appConfig)
  .catch((err) => console.error(err));
