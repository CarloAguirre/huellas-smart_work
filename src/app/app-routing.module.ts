import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactoresDeEmisionComponent } from './factores-de-emision/factores-de-emision.component';
import { EmisionesComponent } from './emisiones/emisiones.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  { path: 'factores-de-emision', component: FactoresDeEmisionComponent },
  { path: 'datos-de-actividad', component: EmisionesComponent },
  { path: 'resultados', component: ResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
