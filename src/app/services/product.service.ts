import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  uploadImageProduct(selectedFile: any) {
    if (!selectedFile) {
      alert('Selecciona una imagen primero.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    this.http.post(this.apiUrl+"/upload", formData).subscribe({
      next: (response) => console.log('Imagen subida con éxito', response),
      error: (error) => console.error('Error al subir la imagen', error)
    });
  }
}
