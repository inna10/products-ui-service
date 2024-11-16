import {Type} from "@angular/core";

export interface Product {
  id?: number;
  barcode?: string
  name?: string;
  image?: string;
  tags?: string[];
  rating?: number;
  price?: number;
}

