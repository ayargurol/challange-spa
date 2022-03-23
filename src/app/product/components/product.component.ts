import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import ProductState from '../Product.state';
import * as ProductActions from '../product.action'
import Product from '../product.model';
import ErrorModel from 'src/app/shared/models/error.model';
import { UserManager } from 'src/app/shared/services/usermanager.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import AuthState from 'src/app/auth/auth.state';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddDialog } from './product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductComponent implements OnInit {

  productSubscription: Subscription[] = [];
  user: any;

  code: string = '';
  name: string = '';

  productError: ErrorModel = null;

  dataSource;
  columnsToDisplay = ['code', 'name', 'price', 'description', 'actions'];
  expandedElement: Product | null;

  constructor(private store: Store<{ products: ProductState }>, private auth: Store<{ auth: AuthState }>,
    private userManager: UserManager, private dialog: MatDialog) { }

  ngOnInit() {
    this.productSubscription.push(this.store.pipe(select('products'))
      .pipe(
        map(x => {
          this.dataSource = x.products;
          this.productError = x.error;
          if (x.error && x.error.status == 401) {
            if (x.errorCount > 2) {
              this.userManager.logOut()
            } else {
              this.store.dispatch(ProductActions.BeginGetProductAction());
            }
          }
        })
      )
      .subscribe(),
      this.auth.pipe(select('auth')).pipe(
        map(x => {
          if (x.user) {
            this.user = x.user;
          }
        })
      ).subscribe()
    )

    this.store.dispatch(ProductActions.BeginGetProductAction());
  }

  logOut() {
    this.userManager.logOut();
  }

  edit(data) {
    console.log('edit', data);
    const ref = this.dialog.open(ProductAddDialog, {
      width: '500px',
      data: { ...data },
    })

    ref.afterClosed().subscribe(result => {
      debugger;
      this.store.dispatch(ProductActions.BeginUpdateProductAction({ payload: result }));
    });
  }

  onAddClick(): void {
    const ref = this.dialog.open(ProductAddDialog, {
      width: '500px',
      data: {},
    })

    ref.afterClosed().subscribe(result => {
      debugger;
      this.store.dispatch(ProductActions.BeginCreateProductAction({ payload: result }));
    });
  }


  delete(data) {
    this.store.dispatch(ProductActions.BeginDeleteProductAction({ payload: data }));
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.forEach(sub => sub.unsubscribe());
    }
  }
}
