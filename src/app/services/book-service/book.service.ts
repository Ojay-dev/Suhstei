import { Injectable, EventEmitter } from '@angular/core';
import { IBook } from 'src/app/shared/book.model';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth/services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService extends AuthService {

  baseURL = 'http://localhost:8808/api';
  // baseURL = 'http://suhstei.herokuapp.com/api';

  constructor(private httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  getBooks(): Observable<any> {
    return this.httpClient.get<any>(this.baseURL)
      .pipe(catchError(this.handleError<any>('getBooks', [])));
    // return BOOKS;
  }

  getBook(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/${id}`)
      .pipe(catchError(this.handleError<any>('getBook', [])));
    // return BOOKS;
  }

  saveBook( title: string, author: string, review: string, avatar: File): Observable<HttpEvent<any>> {
    const formData: any = new FormData();
    // formData.append('id', id);
    formData.append('title', title);
    formData.append('avatar', avatar);
    formData.append('author', author);
    formData.append('review', review);

    return this.httpClient.post<any>(`${this.baseURL}/create-new-book`, formData, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError<HttpEvent<any>>('saveBook')));
  }

  updateBook( title: string, author: string, review: string, avatar: File, id: string): Observable<HttpEvent<any>> {
    const formData: any = new FormData();

    // formData.append('id', id);
    formData.append('title', title);
    if (!!avatar) {
      formData.append('avatar', avatar);
    }
    formData.append('author', author);
    formData.append('review', review);

    console.log(formData);


    return this.httpClient.post<any>(`${this.baseURL}/update-book/${id}`, formData, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError<HttpEvent<any>>('updateBook')));
  }

  searchBooks(searchTerm: string) {
    const term = searchTerm.toLocaleLowerCase();

    // BOOKS.forEach(book => {
      // let matchingBooks = [];
      // if (book.title.toLocaleLowerCase().indexOf(term) > -1) {
        // this.searchResults.push(book);
      // }
      // results.concat(matchingBooks);
      // console.log(results);
    // });

    // const emitter = new EventEmitter(true);
    // setTimeout(() => {
    //   emitter.emit(this.searchResults);
    // }, 100);

    // return emitter;

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}



