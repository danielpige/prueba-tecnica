import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CharactersComponent } from './characters/characters.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { CharacterComponent } from './character/character.component';



@NgModule({
  declarations: [
    NavBarComponent,
    PaginationComponent,
    CharactersComponent,
    CharacterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavBarComponent,
    PaginationComponent,
    CharactersComponent,
    CharacterComponent
  ]
})
export class ComponentsModule { }
