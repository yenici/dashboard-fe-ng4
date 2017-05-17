import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { TokenService } from './shared/services/token.service';
import { requestOptionsProvider } from './shared/services/default-request-options.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [
    requestOptionsProvider,
    AuthService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
