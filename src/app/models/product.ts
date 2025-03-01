import { Injectable } from '@angular/core';

export class Product {

  id: string;
  name: string;
  species: string;
  image: string|undefined;
  types: string[]|undefined;
  qualities: string[]|undefined;

  constructor(json: any) { 
    this.id = json.id
    this.name = json.name
    this.species = json.species
    this.image = json.image
    this.types = json.types
    this.qualities = json.qualities
    
  }
}
