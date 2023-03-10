import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() nextPage: number = 0;
  @Input() prevPage: number = 0;
  @Input() totalPages: number = 0;
  counterPages: number[] = [];

  constructor(){}

  ngOnInit(): void {
    this.setValues();
  }

  setValues(): void
  {
    for (let index = 0; index < this.totalPages; index++) {
      this.counterPages[index] = index + 1;
    }
  }

  goToPage(page: number): void
  {
    this.currentPage = page;
    this.changePage.emit(page);
  }

}
