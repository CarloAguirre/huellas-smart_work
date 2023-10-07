import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppComponent } from './app.component';
import awsconfig from '../aws-exports';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FactoresDeEmisionComponent } from './factores-de-emision/factores-de-emision.component';
import { EmisionesComponent } from './emisiones/emisiones.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ReactiveFormsModule } from '@angular/forms';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    FactoresDeEmisionComponent,
    EmisionesComponent,
    ResultadosComponent
  ],
  imports: [
    BrowserModule,
    AmplifyAuthenticatorModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
