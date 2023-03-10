import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    HomeComponent,
    EpisodesComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class HomeModule { }
