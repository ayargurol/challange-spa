import {
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import AuthState from '../../auth.state';
import * as AuthActions from '../../auth.action'
import { ConfirmPasswordValidator } from 'src/app/shared/utils/confirmPasswordValidator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public submitted: boolean = false;
  public email: AbstractControl | any = new FormControl();
  public firstname: AbstractControl | any = new FormControl();
  public lastname: AbstractControl | any = new FormControl();
  public password: AbstractControl | any = new FormControl();
  public confirmPassword: AbstractControl | any = new FormControl();
  public role: AbstractControl | any = new FormControl();
  public registerForm!: FormGroup;

  types = ['Worker', 'Admin'];

  constructor(private fb: FormBuilder, private store: Store<{ auth: AuthState }>) {
    this.initRegisterForm();
  }

  ngOnInit() { }

  public initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['Worker', [Validators.required]]
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

    this.firstname = this.registerForm.controls['firstname'];
    this.lastname = this.registerForm.controls['lastname'];
    this.email = this.registerForm.controls['email'];
    this.password = this.registerForm.controls['password'];
    this.confirmPassword = this.registerForm.controls['confirmPassword'];
    this.role = this.registerForm.controls['role'];
  }

  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;

    if (this.registerForm.valid) this.store.dispatch(AuthActions.BeginRegisterAction({ payload: form }))
  }


  getErrorMessage(type: AbstractControl) {
    if (type.hasError('required')) {
      return 'You must enter a value';
    }
    if (type.hasError('minlength')) return 'Password too short.'
    if (type.hasError('confirmPassword')) return 'Doesn\'t match with password'

    return type.hasError('email') ? 'Not a valid email' : '';
  }
}