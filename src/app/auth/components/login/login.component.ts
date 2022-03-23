import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import AuthState from '../../auth.state';
import User from '../../models/user.model';
import * as AuthActions from '../../auth.action'
import { Router } from '@angular/router';
import { UserManager } from 'src/app/shared/services/usermanager.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public submitted: boolean = false;
  public email: AbstractControl | any = new FormControl();
  public password: AbstractControl | any = new FormControl();
  public loginForm!: FormGroup;

  auth$: Observable<AuthState>;
  authSubscription: Subscription;
  user: User = null;

  code: string = '';
  name: string = '';

  authError: Error = null;
  constructor(private fb: FormBuilder, private store: Store<{ auth: AuthState }>, private userManager: UserManager, private router: Router) {
    this.auth$ = store.pipe(select('auth'));
  }

  ngOnInit() {
    this.initLoginForm();
    this.userManager.checkLogin();
    this.userManager.getUser().subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/product')
      }
    })
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required/*, Validators.email*/]],
      password: ['', Validators.required]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  getErrorMessage(type: AbstractControl) {
    if (type.hasError('required')) {
      return 'You must enter a value';
    }

    return type.hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event event 
   * @param form  form value
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.BeginLoginAction({ payload: form }));
    }
  }
}