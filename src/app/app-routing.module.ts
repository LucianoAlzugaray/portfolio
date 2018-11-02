import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { HomeComponent }   from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quiensoy/quiensoy.component' 
import { TecnologiasComponent } from './pages/tecnologias/tecnologias.component' 
import { TrabajosComponent } from './pages/trabajos/trabajos.component' 
import { ContactoComponent } from './pages/contacto/contacto.component' 

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiensoy', component: QuienSoyComponent},
  { path: 'tecnologias', component: TecnologiasComponent},
  { path: 'trabajos', component: TrabajosComponent},
  { path: 'contacto', component: ContactoComponent},
  
  { path: '**',   redirectTo: '', pathMatch: 'full' }
  
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}