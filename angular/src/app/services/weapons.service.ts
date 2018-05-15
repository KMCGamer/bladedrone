import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Weapon } from '../models/weapon.model';
import { Params } from '@angular/router';

const URL = 'http://localhost:3000/api/weapons';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(private http: HttpClient) { }

  public queryWeapons(params: Params): Observable<Weapon[]> {
    return this.http.get<Weapon[]>(URL, params).pipe(
      catchError(this.handleError('queryWeapons', [])),
    );
  }
  
  public getWeapon(name: string): Observable<Weapon> {
    return this.http.get<Weapon>(`${URL}/${name}`).pipe(
      tap((weapon)=> console.log(`Got weapon: ${weapon.name}`)),
      catchError(this.handleError('queryWeapons')),
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

  public getBaseSkinFileId(weapon: Weapon): string {
    const AB = weapon.category == "Primary" ? "00" : "01";
    return `${AB}_000${weapon.weaponId}`;
  }

}
