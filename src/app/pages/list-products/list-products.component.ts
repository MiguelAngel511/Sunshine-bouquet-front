import { Component } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterOutlet } from "@angular/router";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-list-product',
    standalone: true, 
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.css'],
    imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule],
  })
export class ListProductsComponent{
    products: Product[] = [];
    filteredProducts: Product[] = [];
    nameFilter = new FormControl('');
    speciesFilter = new FormControl('');
    typesFilter = new FormControl('');
    qualitiesFilter = new FormControl('');
    constructor(private productService: ProductService) {}
    ngOnInit() {
        this.loadProducts();
        this.applyFilters();
      }
    
loadProducts() {
    this.productService.getProducts().subscribe({
        next: (data) => {
            console.log("Data cargada:", data);
            this.products = data;
            this.filteredProducts = data; // Inicializar con los productos cargados
            this.applyFilters(); // Ahora sí aplicamos filtros
        },
        error: (error) => {
            console.error('Error al obtener productos', error);
        }
    });
}
      applyFilters() {
        this.nameFilter.valueChanges.subscribe(() => this.filterTable());
        this.speciesFilter.valueChanges.subscribe(() => this.filterTable());
        this.typesFilter.valueChanges.subscribe(() => this.filterTable());
        this.qualitiesFilter.valueChanges.subscribe(() => this.filterTable());
    }

    filterTable() {
        this.filteredProducts = this.products.filter(product => {
            return (
              (this.nameFilter.value ? product.name?.toLowerCase().includes(this.nameFilter.value.toLowerCase()) : true) &&
              (this.speciesFilter.value ? product.species?.toLowerCase().includes(this.speciesFilter.value.toLowerCase()) : true) &&
              (this.typesFilter.value ? String(product.types || '').toLowerCase().includes(this.typesFilter.value.toLowerCase()) : true) &&
              (this.qualitiesFilter.value ? String(product.qualities || '').toLowerCase().includes(this.qualitiesFilter.value.toLowerCase()) : true)
            );
        });
    }
}
