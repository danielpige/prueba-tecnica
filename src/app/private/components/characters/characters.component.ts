
import { CharacterResponse } from './../../../interfaces/charactersResponse.interface';
import { Episodes } from './../../../interfaces/episodesResponse.interface';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RickAndMortyService } from 'src/app/utils/services/rick-and-morty.service';
import { FavoritesService } from 'src/app/utils/services/favorites.service';
import { FavoritesResponse } from 'src/app/interfaces/favorites.response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {

  loading = false;
  characters: CharacterResponse[] = [];
  favorites: FavoritesResponse[] = [];

  constructor(
    private ramSvc: RickAndMortyService,
    public dialogRef: MatDialogRef<CharactersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { characterIds: string, episode: Episodes },
    private favSvc: FavoritesService
  ){
  }

  ngOnInit(): void {
    this.getFavorites();
  }

  ngOnDestroy(): void {
  }

  getCharacters(): void
  {
    // this.loading = true;

    this.ramSvc.getCharactersByIds(this.data.characterIds).subscribe({
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

  getFavorites(): void
  {
    this.loading = true;

    this.favSvc.getFavorites().subscribe({
      next: (res) => {
        this.favorites = [...res];

        this.getCharacters();
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  closeModal(): void
  {
    this.dialogRef.close();
  }
}
