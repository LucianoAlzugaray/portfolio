import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SceneComponent } from './layout/scene/scene.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quiensoy/quiensoy.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    TopbarComponent,
    HomeComponent,
    QuienSoyComponent
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
