import { Endpoint } from 'src/app/shared/endpoints';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { FavoritesResponse, succesfulySaved } from 'src/app/interfaces/favorites.response';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private globalSvc: GlobalService
  ) { }

  getFavorites(): Observable<FavoritesResponse[]>
  {
    return this.globalSvc.get(Endpoint.FAVORITES.BASE).pipe(
      map((res: FavoritesResponse[]) => {
        return res;
      })
    );
  }

  setFavorite(data: FavoritesResponse): Observable<succesfulySaved>
  {
    return this.globalSvc.post(Endpoint.FAVORITES.BASE, data).pipe(
      map((res: succesfulySaved) => {
        return res;
      })
    );
  }

  removeFavorite(id_caracter: number): Observable<succesfulySaved>
  {
    return this.globalSvc.delete(Endpoint.FAVORITES.REMOVE(id_caracter)).pipe(
      map((res: succesfulySaved) => {
        return res;
      })
    );
  }
}
