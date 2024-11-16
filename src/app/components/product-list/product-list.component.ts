import {Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // @ts-ignore
  products: MatTableDataSource<Product>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['barcode', 'name', 'image', 'tags', 'rating', 'price', 'actions'];

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.products.filterPredicate = (product: Product, filter: string) => {
      return product!.barcode!.toLowerCase().includes(filter) ||
        product!.name!.toLowerCase().includes(filter);
    };
  }

  refreshTable() {
    // Updating data source with the same data to trigger view refresh
    this.products.data = [...this.products.data];
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      // @ts-ignore
      this.products = new MatTableDataSource(products);
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;

      this.refreshTable();
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    this.products.data = this.products.data.filter(product => product.id !== id);
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }
}
