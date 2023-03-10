import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { EpisodeResponse } from 'src/app/interfaces/episodesResponse.interface';
import { Endpoint } from 'src/app/shared/endpoints';
import { CharacterResponse } from 'src/app/interfaces/charactersResponse.interface';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(
    private globalSvc: GlobalService
  ) { }

  getHeader(): any
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: ''
      })
    };

    return httpOptions;
  }

  getEspisodes(page: number = 1): Observable<EpisodeResponse>
  {
    return this.globalSvc.get(Endpoint.RICK_AND_MORTY.GET_EPISODES(page), this.getHeader()).pipe(
      map((res: EpisodeResponse) => {
        return res;
      })
    );
  }

  getCharactersByIds(ids: string): Observable<CharacterResponse[]>
  {
    return this.globalSvc.get(Endpoint.RICK_AND_MORTY.GET_CHARACTERS(ids),  this.getHeader()).pipe(
      map((res: CharacterResponse[]) => {
        return res;
      })
    );
  }
}
