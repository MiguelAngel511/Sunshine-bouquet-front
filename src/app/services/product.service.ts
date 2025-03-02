import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, race } from 'rxjs';
import { Product } from '../models/product';
import { error } from 'firebase-functions/logger';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  saveProduct(product: Product,imageUrl:string, types:string[],qualities:string[] ): Observable<Product> {
   if(product.id==undefined || product.id==""){
    alert("El ID es un campo obligatorio")
    throw new Error("El ID del producto es obligatorio.");
    
   }
   if(product.name==undefined || product.name==""){
    alert("El nombre del producto es obligatorio")
    throw new Error("El nombre del producto es obligatorio ");

  }
  if(product.species==undefined || product.species==""){
    alert("La especie del producto es obligatoria")
    throw new Error("La especie del producto es obligatoria");
  }
    console.log("Imagen URL antes de asignar:", imageUrl);
    product.image=imageUrl
    product.types=types
    product.qualities=qualities
    console.log(product)
    return this.http.post<Product>(this.apiUrl, product);
  }

  uploadImageProduct(selectedFile: any) {
    
    if(!selectedFile) {
      return of({ Image: "" }); 
  }

    const formData = new FormData();
    formData.append('file', selectedFile);

    return this.http.post(this.apiUrl+"/upload", formData)
  }
}
