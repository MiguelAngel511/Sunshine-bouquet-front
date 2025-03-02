import { Component } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-list-product',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.css'],
    imports: [RouterOutlet, CommonModule, HttpClientModule],
  })
export class ListProductsComponent{
    products: Product[] = [];
    constructor(private productService: ProductService) {}
    ngOnInit() {
        this.loadProducts();
      }
    
      loadProducts() {
        this.productService.getProducts().subscribe({
          next: (data) => {
            console.log("Data cargada:", data)
            this.products = data;
          },
          error: (error) => {
            console.error('Error al obtener productos', error);
          }
        });
      }
    
}