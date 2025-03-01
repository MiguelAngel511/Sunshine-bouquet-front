import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sunshine-bouquet-front';
  products: Product[] = [];
  newProduct: Product = new Product({});

  selectedFile: any | undefined = undefined;
  previewUrl: ArrayBuffer | string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addProduct() {
    this.productService.saveProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        this.newProduct = new Product({});
      },
      error: (error) => {
        console.error('Error al crear producto', error);
      }
    });
  }

  uploadImage(){
    this.productService.uploadImageProduct(this.selectedFile)
  }
}
