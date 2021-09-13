import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs/index";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { catchError, retry , tap} from 'rxjs/operators';
import {WineItem} from "../app/core/wine-item";

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private wineHost =  'http://localhost:5000/embedded';

  constructor(private http: HttpClient) { }


  // standard error handling for all error calls
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



  wineList(page?: number, pageSize?: number, sortBy?: string, sortDir?: string): Observable<HttpResponse<any>> {
    if(!page || !pageSize){
      page = 1;
      pageSize = 25;
    }
    if(!sortBy || !sortDir){
      sortBy = 'points';
      sortDir = 'asc';
    }


    let pageSetup = '?_page='.concat(page.toString()).concat('&_limit=').concat(pageSize.toString());
    let pageSort =  '&_sort='.concat(sortBy).concat('&_order=').concat(sortDir);

    return this.http.get(this.wineHost + pageSetup + pageSort, {observe: 'response'})
      .pipe(catchError(this.handleError));

  }
}
