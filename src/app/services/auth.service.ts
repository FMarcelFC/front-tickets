import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Res } from '../interfaces/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiURL;
  private httpHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
        'accept': 'application/json',
        'Content-Type': 'application/json',
      })
  }

  loginRequest(params: any, route: String): Observable<Res> {
    return this.http.post<Res>(this.api + route, params, { headers: this.httpHeaders });
  }

}