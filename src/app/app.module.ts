import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.reducer';
import { ProductEffects } from './product/product.effects';
import { ProductReducer } from './product/product.reducer';
import { ProductComponent } from './product/components/product.component';
import { AppComponent } from './app.component';
import { ProductAddDialog } from './product/components/product-add-dialog/product-add-dialog.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const COMPONENTS = [
  AppComponent,
  ProductComponent,
  ProductAddDialog,
  LoginComponent,
  RegisterComponent
]


@NgModule({
  declarations: [COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    StoreModule.forRoot({ products: ProductReducer, auth: AuthReducer }),
    EffectsModule.forRoot([ProductEffects, AuthEffects]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
