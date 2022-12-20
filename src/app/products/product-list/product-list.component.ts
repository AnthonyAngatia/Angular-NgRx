import {Component, OnInit, OnDestroy} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {Store} from '@ngrx/store';
import {getCurrentProduct, getError, getProducts, getShowProductCode, State} from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  // errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>, private productService: ProductService) {
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
    this.store.dispatch(ProductActions.loadProducts());

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

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id}));
  }

}
