import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Res } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public api = environment.apiURL;
  private httpHeaders: HttpHeaders;
  private token: string;
  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token') ?? 'No token available';

    this.httpHeaders = new HttpHeaders({
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      })
  }

  getRequest(params: any, route: String): Observable<Res> {
    return this.http.get<Res>(this.api + route, { params: params, headers: this.httpHeaders });
  }
  postRequest(params: any, route: String): Observable<Res> {
    return this.http.post<Res>(this.api + route, params, { headers: this.httpHeaders });
  }
  putRequest(params: any, route: String): Observable<Res> {
    return this.http.put<Res>(this.api + route, params, { headers: this.httpHeaders });
  }
  deleteRequest(params: any, route: String): Observable<Res> {
    return this.http.delete<Res>(this.api + route, { params: params, headers: this.httpHeaders });
  }
}
