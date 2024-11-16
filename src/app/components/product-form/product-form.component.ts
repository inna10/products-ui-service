import {Component, Input, OnInit} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  tagCtrl = this.fb.control('');
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      image: [''],
      tags: [[]],
      price: ['', [Validators.required, Validators.min(0)]],
      rating: ['',  [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId = id;
      if (id) {
        this.productService.getProduct(id).subscribe(product => {
          this.productForm.patchValue(product);
        });
      }
    });
  }

  addTag(): void {
    const value = this.tagCtrl.value ? this.tagCtrl.value.trim() : '';
    if (value) {
      const tags = this.productForm.get('tags')!.value as string[];
      if (!tags.includes(value)) {
        tags.push(value);
        this.productForm.get('tags')!.setValue(tags);
        this.productForm.get('tags')!.updateValueAndValidity();
      }
    }
    this.tagCtrl.setValue('');
  }

  removeTag(index: number): void {
    const tags = this.productForm.get('tags')!.value as string[];
    if (index >= 0 && index < tags.length) {
      tags.splice(index, 1);
      this.productForm.get('tags')!.setValue(tags);
      this.productForm.get('tags')!.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        ...this.productForm.value,
        id: this.productId ? this.productId : null
      };

      if (this.productId) {
        this.productService.updateProduct(product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this.productService.addProduct(product).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }
}
