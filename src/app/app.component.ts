import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { Product } from './models/product';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sunshine-bouquet-front';
  products: Product[] = [];
  newProduct: Product = new Product({});
  tempProduct: Product = new Product({});
  types: string[]=[]
  qualities:string[]=[]
  newType:string=""
  newQualiti:string=""
  selectedFile: any | undefined = undefined;
  previewUrl: ArrayBuffer | string | null = null;
  successMessage: string = '';
  

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
  addType() {
    if (this.newType.trim()) { 
      this.types?.push(this.newType);
      this.newType = ''; 
    }
  }
  addQualiti(){
    if (this.newQualiti.trim()){
      this.qualities?.push(this.newQualiti);
      this.newQualiti = '';
        }
  }
  removeType(index: number) {
    this.types?.splice(index, 1);
  }
  removeQualiti(index:number){
    this.qualities?.splice(index,1);
  }

 onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addProduct() {
    this.uploadImage().subscribe({
      next: (imagenResponse:any) =>{
        
        
        this.productService.saveProduct(this.newProduct,imagenResponse.image,this.types,this.qualities).subscribe({
          next: (product) => {
            this.products.push(product);
            this.newProduct = new Product({});
            this.successMessage = "✅ ¡Producto agregado con éxito!";
            setTimeout(() => this.successMessage = '', 3000);
          },
          error: (error) => {
            console.error('Error al crear producto', error);
            if (error.status === 400 && error.error.detail.includes('ID ya existe')) {
              alert('⚠️ El ID del producto ya está en uso. Intenta con otro.');
            }else {
              alert('⚠️error creando el producto.');
            }
          }
        });
      },
      error: (error) => console.error('Error al subir la imagen', error)
  });
  }

  uploadImage(){
    return this.productService.uploadImageProduct(this.selectedFile)
  }
}
