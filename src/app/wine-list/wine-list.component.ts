import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {WineService} from "../../api/wine.service";
import {first} from "rxjs/operators";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WineItem} from '../core/wine-item';

import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  encapsulation: ViewEncapsulation.Emulated
})


export class WineListComponent implements OnInit {

  constructor(private wineService: WineService) { }
  public columnsToDisplay = ['points', 'variety', 'title', 'price', 'country'];
  public expandedElement: WineItem | undefined;


  public wine: WineItem[] = [];

 // pagination
  public currentPage = 0;
  public pageSize: number = 25;
  public maxTotal = 0;
  public sortCol = 'points';
  public sortDir = 'asc';

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public setupDataSource(data) {
    this.wine = data.body;
    this.maxTotal = data.headers.get('X-Total-Count');
  }


  ngOnInit(): void {

    this.wineService.wineList().pipe(first()).subscribe({
      next: (data) => {
        this.setupDataSource(data);
      },
      error: () => {console.log('set up error handling here')}
    });

  }

  changePage($pageEvt?: PageEvent, ): void {

    this.currentPage = $pageEvt.pageIndex;
    this.pageSize = $pageEvt.pageSize;
    this.updateDataSet();


  };

  sortColumn($sortEvt?: any): void {

    this.sortCol = $sortEvt.active;
    this.sortDir = $sortEvt.direction;
    this.updateDataSet();
  }


  updateDataSet() {
    this.wineService.wineList(this.currentPage, this.pageSize, this.sortCol, this.sortDir).pipe(first()).subscribe({
      next: (data) => {
        this.setupDataSource(data);
      },
      error: () => {console.log('set up error handling here')}
    });

  }

}
