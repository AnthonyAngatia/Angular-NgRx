import {ProductState} from '../products/state/product.reducer';

export interface State {
  // products: ProductState;// We shouldn't pput product state here coz the product module is lazyloaded
  user: any;
}
