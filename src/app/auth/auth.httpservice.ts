import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Login from './models/login.model';
import Register from './models/register.model';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {
    private ApiURL: string = environment.apiUrl;
    constructor(private httpclient: HttpClient) { }

    login(payload: Login): Observable<any> {
        return this.httpclient.post<any>(`${this.ApiURL}/Auth/Login`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    register(payload: Register): Observable<any> {
        return this.httpclient.post<any>(`${this.ApiURL}/Auth/Register`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
