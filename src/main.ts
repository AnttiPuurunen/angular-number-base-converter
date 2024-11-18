import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { NumberBaseConverter } from './app/components/number-base-converter';

bootstrapApplication(NumberBaseConverter, appConfig)
  .catch((err) => console.error(err));
