import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {Store} from '@ngrx/store';
import {getCurrentProduct, getError, getProducts, getShowProductCode, State} from '../state/product.reducer';
import {ProductPageActions} from '../state/actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  products: Product[];
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.errorMessage$ = this.store.select(getError);

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });
    // Make the http call through NgRx effects
    this.store.dispatch(ProductPageActions.loadProducts());

    // Observing for the list of Products from the store
    this.products$ = this.store.select(getProducts);

    // this.store.select('products').subscribe(
    //   products => {
    //     this.displayCode = products.showProductCode;
    //   }
    // );
    // In case we ever modify the structure of the products slice, we don't have to modify this
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductPageActions.setCurrentProduct({currentProductId: product.id}));
  }
}
