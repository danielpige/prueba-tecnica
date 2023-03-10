import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterResponse } from 'src/app/interfaces/charactersResponse.interface';
import { FavoritesResponse } from 'src/app/interfaces/favorites.response';
import { FavoritesService } from 'src/app/utils/services/favorites.service';
import { RickAndMortyService } from 'src/app/utils/services/rick-and-morty.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  loading = false;
  favorites: FavoritesResponse[] = [];
  characters: CharacterResponse[] = [];
  characterIds: string = '';

  constructor(
    private favSvc: FavoritesService,
    private ramSvc: RickAndMortyService
  ){
  }

  ngOnInit(): void {
    this.getFavorites();
  }

  ngOnDestroy(): void {
  }

  getFavorites(): void
  {
    this.loading = true;

    this.favSvc.getFavorites().subscribe({
      next: (res) => {
        this.favorites = [...res];
        this.characterIds = this.getCharacterIds();
        this.getCharacters();
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  getCharacters(): void
  {
    // this.loading = true;

    this.ramSvc.getCharactersByIds(this.characterIds).subscribe({
      next: (res) => {
        this.characters = [...res].map(c => {
          const index: number = this.favorites.findIndex(f => f.id_caracter === c.id);
          if (index >= 0) {
            c.favorite = true;
          }else {
            c.favorite = false;
          }

          return c;
        })

        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  getCharacterIds(): string
  {
    const idsArray: number[] = this.favorites.map(f => {
      const id: number = f.id_caracter;
      return id;
    });

    return idsArray.join(',')
  }
}
