import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../models/skin.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL = 'http://localhost:3000/api/skins';

@Injectable({
  providedIn: 'root'
})
export class SkinsService {
  constructor(private http: HttpClient) {}

  /* Get all skins */
  public getAllSkins(): Observable<Skin[]> {
    return this.http
      .get<Skin[]>(URL)
      .pipe(catchError(this.handleError('getAllSkins', [])));
  }

  /* Get all skins of a weapon using its generated ObjectId*/
  public getSkinsByWeaponObjectId(objectId: string): Observable<Skin[]> {
    return this.http
      .get<Skin[]>(`${URL}/${objectId}`)
      .pipe(catchError(this.handleError('getSkinsByWeaponObjectId', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
