import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewBookComponent } from '../new-book/new-book.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';
import { Event } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  bookData: Books[] = [];
  desployColumns = ['title', 'description', 'autor', 'price'];
  dataSource = new MatTableDataSource<Books>();
  timeout: any = null;

  @ViewChild(MatSort) sortMaterial!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscription!: Subscription;

  totalBooks = 0;
  booksByPage = 2;
  pageCombo = [1, 2, 5, 10];
  actualPage = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  eventPaginator(event: PageEvent) {
    this.booksByPage = event.pageSize;
    this.actualPage = event.pageIndex + 1;
    this.booksService.getBooks(
      this.booksByPage,
      this.actualPage,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  sortColumns(event: { active: string; direction: string }) {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.getBooks(
      this.booksByPage,
      this.actualPage,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  filter(filter: any): void {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (filter.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'title',
          valor: filter.target.value,
        };
        $this.booksService.getBooks(
          $this.booksByPage,
          $this.actualPage,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );
      }
    }, 1000);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewBookComponent, { width: '550px' });
    dialogRef.afterClosed().subscribe(() => {
      this.booksService.getBooks(
        this.booksByPage,
        this.actualPage,
        this.sort,
        this.sortDirection,
        this.filterValue
      );
    });
  }

  ngOnInit(): void {
    this.booksService.getBooks(
      this.booksByPage,
      this.actualPage,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.subscription = this.booksService
      .getListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalBooks = pagination.totalRows;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sortMaterial;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
