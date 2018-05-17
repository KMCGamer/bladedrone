import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { HomeComponent } from './components/home/home.component';
import { WeaponsService } from './services/weapons.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { TableComponent } from './components/table/table.component';
import { WeaponPageComponent } from './components/weapon-page/weapon-page.component';
import { UnCamelCasePipe } from './pipes/un-camel-case.pipe';
import { SkinsService } from './services/skins.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapons/:name', component: WeaponPageComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeaponsComponent,
    HomeComponent,
    EllipsisPipe,
    TableComponent,
    WeaponPageComponent,
    UnCamelCasePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeaponsService, SkinsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
