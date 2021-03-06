import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBook } from '../../shared/book.model';
import { BookService } from '..';

@Injectable({
  providedIn: 'root'
})

export class SearchResolver implements Resolve<IBook[]> {
  constructor(private bookService: BookService) { }

  resolve(): Observable<IBook[]> {
    return this.bookService.getBooks();
  }
}

