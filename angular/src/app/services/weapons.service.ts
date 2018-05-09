import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { Weapon } from '../weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(private http: HttpClient) { }

  public queryWeapons(query: string): Observable<Weapon[]> {
    console.log(query);
    switch (query) {
      case "Assault+Rifles":
        return this.getAssaultRifles();
      case "Secondary":
        return this.getSidearms();
      case "Submachine+Guns":
        return this.getSubmachineGuns();
      case "Light+Machine+Guns":
        return this.getLightMachineGuns();
      case "Sniper+Rifles":
        return this.getSniperRifles();
      default:
        return this.getAllWeapons();
    }
  }

  private getAssaultRifles(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons?filter=Assault+Rifles').pipe(
      catchError(this.handleError('blah', [])),
    );
  }
  
  private getSidearms(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons?filter=Secondary').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  private getSubmachineGuns(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons?filter=Submachine+Guns').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  private getLightMachineGuns(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons?filter=Light+Machine+Guns').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  private getSniperRifles(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://localhost:3000/api/weapons?filter=Sniper+Rifles').pipe(
      catchError(this.handleError('blah', [])),
    );
  }

  private getAllWeapons(): Observable<Weapon[]> {
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
