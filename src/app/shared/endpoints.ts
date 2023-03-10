import { environment } from '../../environments/environment';

export const Endpoint = {
  AUTH: {
    LOGIN: environment.api_url_auth + 'Security/api/SEG',
    REGISTER: environment.api_url_auth + 'Seleccion/api/SOL/RegistroInicialSolicitante',
  },
  RICK_AND_MORTY: {
    GET_EPISODES: (page: number) => environment.api_url + 'episode?page=' + page,
    GET_CHARACTERS: (charactersId: string) => environment.api_url + 'character/' + charactersId,
  },
  FAVORITES: {
    BASE: environment.api_url_auth + 'Seleccion/api/Favoritos',
    GET_BY_ID: environment.api_url_auth + 'Seleccion/api/Favoritos/FindById',
    REMOVE: (id: number) => environment.api_url_auth + 'Seleccion/api/Favoritos?id_caracter=' + id,
  }
};
