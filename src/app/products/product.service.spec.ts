import {ProductService} from './product.service';
import {Injector} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import {Product} from './product';

const productsUrl = 'api/products';

describe('ProductService', () => {

  /**
   * For simple service without dependencies
   * you can create a new instance as follows
   * */
    // let productService: ProductService;
    // beforeEach(() => {
    //     productService = new ProductService();
    //   }
    // );
  let productService: ProductService;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductService]
    });
    productService = TestBed.inject(ProductService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('returns a list of products', () => {
    let actualProducts: Product[] | undefined;
    productService.getProducts().subscribe(products => {
      actualProducts = products;
    });
    const request = controller.expectOne(productsUrl, 'URL fetching products');
    expect(request.request.method).toEqual('GET');
    request.flush([
      {
        id: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        description: 'Leaf rake with 48-inch wooden handle',
        starRating: 3.2
      }
    ]);
    expect(actualProducts).toEqual([{
      id: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      description: 'Leaf rake with 48-inch wooden handle',
      starRating: 3.2
    }]);


  });
  it('creates a new product', () => {
  });
  it('deletes a product', () => {
  });
  it('updates a product', () => {
  });


});
