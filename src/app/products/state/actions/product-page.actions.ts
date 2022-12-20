import {createAction, props} from '@ngrx/store';
import {Product} from '../../product';

/**
 * We need to name this actions in a concise and clear way such
 * that you cna tell which component is the action being dispathced from
 *
 * **/
export const toggleProductCode = createAction('[Product Page] Toggle Product Code');

export const setCurrentProduct = createAction('[Product Page] Set Current Product', props<{ currentProductId: number }>());

export const clearCurrentProduct = createAction('[Product Page] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product Page] Initialize Current Product');

export const loadProducts = createAction('[Product Page] Load');

export const updateProduct = createAction('[Product Page] Update Product', props<{ product: Product }>());


