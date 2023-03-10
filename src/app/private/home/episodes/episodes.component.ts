import iziToast from 'izitoast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Episodes } from 'src/app/interfaces/episodesResponse.interface';
import { RickAndMortyService } from 'src/app/utils/services/rick-and-morty.service';
import { CharactersComponent } from '../../components/characters/characters.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Episodes>;

  page: number = 1;
  totalPages: number = 1;
  nextPage: number = 0;
  prevPage: number = 0;
  loading = false;
  episodes: Episodes[] = [];
  displayedColumns: string[] = ['name', 'episode', 'air_date', 'actions'];

  constructor(
    private ramSvc: RickAndMortyService,
    private dialog: MatDialog
  ){
  }

  ngOnInit(): void {
    this.getEpisodes();

  }

  ngOnDestroy(): void {
  }

  getPageUrl(url: string | null): number
  {
    if (url) {
      const result: string = url.split('=').pop() as string;
      return parseInt(result, 10);
    }else {
      return 0
    }
  }

  getEpisodes(): void
  {
    this.loading = true;

    const sub = this.ramSvc.getEspisodes(this.page).subscribe({
      next: (res) => {
        this.episodes = [...res.results];
        this.nextPage = this.getPageUrl(res.info.next);
        this.prevPage = this.getPageUrl(res.info.prev);
        this.totalPages = res.info.pages;
        this.table?.renderRows();
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void
  {
    this.page = page;
    this.getEpisodes();
  }

  getCharacterIds(characters: string[]): string
  {
    const idsArray: number[] = characters.map(c => {
      const id: string = c.split('/').pop() as string;
      return parseInt(id, 10);
    });

    return idsArray.join(',')
  }

  openModalCharacters(episode: Episodes): void
  {
    if (episode.characters.length === 0) {
      iziToast.info({
        title: 'Lo sentimos',
        message: 'No hay personajes para mostrar'
      })
      return;
    }

    const characterIds = this.getCharacterIds(episode.characters);

    const dialog = this.dialog.open(CharactersComponent, {
      width: '1150px',
      height: '600px',
      data: {
        characterIds,
        episode
      }
    });
  }
}
