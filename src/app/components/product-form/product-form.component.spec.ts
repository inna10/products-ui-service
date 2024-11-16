import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../services/product.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../../models/product.model';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    productServiceMock = {
      getProduct: jasmine.createSpy('getProduct').and.returnValue(of({
        id: '1',
        barcode: '123',
        name: 'Test Product',
        image: '',
        tags: ['tag1', 'tag2'],
        price: 100,
        rating: 5
      })),
      addProduct: jasmine.createSpy('addProduct').and.returnValue(of({})),
      updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of({}))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    activatedRouteMock = {
      paramMap: of({
        get: (key: string) => key === 'id' ? '1' : null
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with product data when id is provided', () => {
    expect(component.productForm.value).toEqual({
      barcode: '123',
      name: 'Test Product',
      image: '',
      tags: ['tag1', 'tag2'],
      price: 100,
      rating: 5
    });
  });

  it('should add a tag', () => {
    component.tagCtrl.setValue('newTag');
    component.addTag();
    expect(component.productForm.get('tags')!.value).toContain('newTag');
  });

  it('should remove a tag', () => {
    component.removeTag(0);
    expect(component.productForm.get('tags')!.value).not.toContain('tag1');
  });

  it('should navigate to products list on successful add', () => {
    // Set the productId to null to ensure add operation
    component.productId = null;

    component.productForm.setValue({
      barcode: '123',
      name: 'New Product',
      image: '',
      tags: [],
      price: 100,
      rating: 5
    });

    // Ensure the form is valid
    expect(component.productForm.valid).toBeTrue();

    component.onSubmit();

    expect(productServiceMock.addProduct).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });
});
