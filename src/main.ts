import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    ...appRouting,
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));
