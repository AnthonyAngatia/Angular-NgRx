import {createAction, props} from '@ngrx/store';
import {Product} from '../product';

/**
 * We need to name this actions in a concise and clear way such
 * that you cna tell which component is the action being dispathced from
 *
 * **/
export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction('[Product] Set Current Product', props<{ product: Product }>());

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

export const loadProducts = createAction('[Product] Load');

export const loadProductsSuccess = createAction('[Product] Load Success', props<{ products: Product[] }>());

export const loadProductsFailure = createAction('[Product] Load Fail', props<{ error: string }>());

