import { provideRouter, RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: '', redirectTo: '/empresas', pathMatch: 'full' }
];

export const appRouting = [
  provideRouter(routes),
  importProvidersFrom(RouterModule.forRoot(routes))
];
