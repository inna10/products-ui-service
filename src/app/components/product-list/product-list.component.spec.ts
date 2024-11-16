import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: any;
  let routerMock: any;
  const mockProducts: Product[] = [
    { id: 1, barcode: '123', name: 'Product 1', image: '', tags: ['tag1'], price: 100, rating: 5 },
    { id: 2, barcode: '456', name: 'Product 2', image: '', tags: ['tag2'], price: 200, rating: 4 },
  ];

  beforeEach(async () => {
    productServiceMock = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of(mockProducts)),
      deleteProduct: jasmine.createSpy('deleteProduct').and.returnValue(of({}))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component.products.data.length).toBe(2);
  });

  it('should apply filter', () => {
    const inputEvent = { target: { value: 'Product 1' } } as unknown as Event;
    component.applyFilter(inputEvent);
    expect(component.products.filteredData.length).toBe(1);
    expect(component.products.filteredData[0].name).toBe('Product 1');
  });

  it('should navigate to edit product', () => {
    component.editProduct(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/products/edit', 1]);
  });

  it('should delete product', () => {
    component.deleteProduct(1);
    expect(productServiceMock.deleteProduct).toHaveBeenCalledWith(1);

    // Update the component's products data to simulate deletion
    component.products.data = component.products.data.filter(product => product.id !== 1);

    // Manually trigger change detection to update the view
    fixture.detectChanges();

    expect(component.products.data.length).toBe(1);
    expect(component.products.data[0].id).toBe(2);
  });

  it('should refresh the table', () => {
    component.products.data = [];
    component.refreshTable();
    expect(component.products.data).toEqual([]);
  });
});
