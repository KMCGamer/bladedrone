import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { Gun } from '../Gun';

@Injectable({
  providedIn: 'root'
})
export class GunService {

  constructor(private http: HttpClient) { }

  public getAllWeapons(): Observable<Gun[]> {
    return this.http.get<Gun[]>('http://localhost:3000/api/weapons').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  public getSidearms(): Observable<Gun[]> {
    return this.http.get<Gun[]>('http://localhost:3000/api/weapons?filter=Secondary').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  public getAssaultRifles(): Observable<Gun[]> {
    return this.http.get<Gun[]>('http://localhost:3000/api/weapons?filter=Assault+Rifles').pipe(
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
