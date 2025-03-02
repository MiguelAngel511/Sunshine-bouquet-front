import { Routes } from '@angular/router';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';

export const routes: Routes = [
  { path: 'create-product', component: CreateProductComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: '', redirectTo: 'list-products', pathMatch: 'full' } // Redirigir a la lista de productos por defecto
];
