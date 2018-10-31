import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
 
import { HomeComponent }   from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quiensoy/quiensoy.component' 

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiensoy', component: QuienSoyComponent},
  { path: '**',   redirectTo: '', pathMatch: 'full' }
  
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}