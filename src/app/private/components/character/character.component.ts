import { succesfulySaved } from './../../../interfaces/favorites.response';
import { Observable, Subscription } from 'rxjs';
import { FavoritesResponse } from 'src/app/interfaces/favorites.response';
import iziToast from 'izitoast';
import { CharacterResponse } from './../../../interfaces/charactersResponse.interface';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FavoritesService } from 'src/app/utils/services/favorites.service';
import { AuthService } from 'src/app/utils/services/auth.service';
import { UserR } from 'src/app/interfaces/userResponse.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  @Output() refresh = new EventEmitter<any>();
  @Input() character!: CharacterResponse;
  user!: UserR | null;
  loading = false;

  constructor(
    private favSvc: FavoritesService,
    private authSvc: AuthService
  ){
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  setFavorite(): void
  {

    if (this.loading) {
      return;
    }

    this.loading = true;

    let query: Observable<succesfulySaved>;

    if (this.character.favorite) {
      query = this.favSvc.removeFavorite(this.character.id);
    }else {
      const data: FavoritesResponse = {
        id_caracter: this.character.id,
        observaciones: 'string',
        usuario: this.user?.usuario || 'user'
      };
      query = this.favSvc.setFavorite(data);
    }

    query.subscribe({
      next: (res) => {
        iziToast.success({
          message: res.description
        });
        this.character.favorite = true;
        this.loading = false;
        this.refresh.emit();
      }, error: (error) => {
        console.log(error);
        iziToast.error({
          title: 'Ups',
          message: 'Ha ocurrido un error'
        })
      }
    });

  }

  getUser(): void
  {
    this.authSvc.user$.subscribe({
      next: (user) => {
        this.user = user;
      }
    });

  }

}
