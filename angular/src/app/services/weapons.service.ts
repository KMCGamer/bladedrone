import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Weapon } from '../weapon';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(private http: HttpClient) { }

  public queryWeapons(params: Params): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons', params).pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  public getAllWeapons(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
