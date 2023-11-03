import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-angular';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

I18n.putVocabularies(translations);
I18n.setLanguage('es');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
