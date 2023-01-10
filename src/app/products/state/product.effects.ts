import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import * as ProductActions from './product.actions';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ProductEffects {
// The actions$ listens to all the actions dispatched by our application
  constructor(private actions$: Actions, private productService: ProductService) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      // To filter the actions we are not interested in except for the one we want to listen to
      ofType(ProductActions.loadProducts),
      // Merge maps over each emmitted action, calling an angular service which returns observables then merges these observables into a
      // single stream
      mergeMap(() => this.productService.getProducts().pipe(
        // Use map operator to return products
        // map operator maps over the emitted products array and return a load success action with the products array as it data
        map(products => ProductActions.loadProductsSuccess({products}))
      ))
    );
  });
}
