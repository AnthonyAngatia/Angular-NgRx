import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {Product} from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';
import {state} from '@angular/animations';

export interface State extends AppState.State {
  productState: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

// Define a feature-selector to define a feature slice of state
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// State selector
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId);

// Composition techniques
// Compose the selector from the getProductFeatureState which provide the state & getCurrentProductId provides currentId
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  });

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error);

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
      console.log('original state: ' + JSON.stringify(state));
      return {...state, showProductCode: !state.showProductCode};
    }),
    on(ProductActions.setCurrentProduct, (state, action) => {
      return {...state, currentProductId: action.currentProductId};
    }),
    on(ProductActions.clearCurrentProduct, (state) => {
      return {...state, currentProductId: null};

    }),
    on(ProductActions.initializeCurrentProduct, (state: ProductState) => {
      return {
        ...state, currentProductId: 0
      };
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
      return {...state, products: action.products, error: ''};
    }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    };
  })
  )
;
