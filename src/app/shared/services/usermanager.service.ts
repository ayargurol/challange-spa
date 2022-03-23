import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable } from 'rxjs';
import AuthState from 'src/app/auth/auth.state';
import User from '../../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserManager {

    constructor(store: Store<{ auth: AuthState }>, private router: Router) {
        store.pipe(select('auth')).pipe(
            map(x => {
                if (x.user) {
                    this.setUser(x.user);
                    setTimeout(() => {
                        this.router.navigateByUrl('/product')
                    }, 250);
                }
                if (x.error) {
                }
            })
        ).subscribe();

        let u = localStorage.getItem('user')
        if (u) {
            this.user = JSON.parse(u);
        }
    }

    private user: User;
    private userSubject$ = new BehaviorSubject<User>(null);

    setUser(user: User) {
        this.user = user;
        this.userSubject$.next(this.user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): Observable<User> {
        return this.userSubject$.asObservable();
    }

    checkLogin() {
        let u = localStorage.getItem('user')
        if (u) {
            this.user = JSON.parse(u);
            this.userSubject$.next(this.user);
        }
    }

    checkAuth() {
        return this.user ?? false;
    }

    logOut() {
        localStorage.removeItem('user');
        this.user = null;
        this.userSubject$.next(this.user);
        this.router.navigateByUrl('/login')
    }

}

