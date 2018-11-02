import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SceneComponent } from './layout/scene/scene.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quiensoy/quiensoy.component';
import { TecnologiasComponent } from './pages/tecnologias/tecnologias.component';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    TopbarComponent,
    HomeComponent,
    QuienSoyComponent,
    TecnologiasComponent,
    TrabajosComponent,
    ContactoComponent
  ],
  imports: [
    
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
