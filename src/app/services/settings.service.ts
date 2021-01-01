import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {BasicMeasurement} from "../models/basic-measurement";
import {catchError} from "rxjs/operators";
import {Cron} from "../models/cron";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl = `${environment.settingsURI}`;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getCurrentCron(): Observable<Cron> {
    return this.httpClient.get<BasicMeasurement>(this.baseUrl + '/cron', { withCredentials: true })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  updateCron(newCron :Cron): Observable<HttpResponse<Cron>> {
    return this.httpClient.put<number>(this.baseUrl + '/cron',  newCron,{ withCredentials: true, observe: 'response' })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.router.navigate(['/']);
          return of(err);
        }));
  }
}
