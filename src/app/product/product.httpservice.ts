import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserManager } from '../shared/services/usermanager.service';
import Product from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductHttpService {
  private ApiURL: string = environment.apiUrl;

  private token: string = '';
  constructor(private httpclient: HttpClient, private userManager: UserManager) {
    userManager.getUser().subscribe(u => {
      if (u) {
        this.token = u.jwtToken;
      }
    })
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  get(): Observable<any> {
    let headers = this.getHeaders();
    return this.httpclient.get<any>(`${this.ApiURL}/Product`, { headers: headers });
  }

  create(payload: Product): Observable<any> {
    let headers = this.getHeaders();
    return this.httpclient.post<any>(`${this.ApiURL}/Product`, payload, { headers: headers });
  }

  update(payload: Product): Observable<any> {
    let headers = this.getHeaders();
    return this.httpclient.put<any>(`${this.ApiURL}/Product`, payload, { headers: headers });
  }


  delete(payload: string): Observable<any> {
    let headers = this.getHeaders();
    return this.httpclient.delete<any>(`${this.ApiURL}/Product/${payload}`, { headers: headers });
  }



}
