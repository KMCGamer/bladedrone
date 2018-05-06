import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GunsComponent } from './components/guns/guns.component';
import { HomeComponent } from './components/home/home.component';
import { GunService } from './services/gun.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

const appRoutes: Routes = [
  { path: 'weapons', component: GunsComponent },
  { path: 'home', component: HomeComponent }, 
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GunsComponent,
    HomeComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    GunService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
