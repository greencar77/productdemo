import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, DEFAULT_PRODUCTS } from './products';

//don't use by now
interface FieldSpec {
  key: string;
  label: string;
  type: ['text', 'number', 'select', 'boolean'];
  required: boolean;
  options?: string[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('productdemo');
  selectedProduct = signal<Product | null>(null);
  editingProduct = signal<Product | null>(null);

  products: Product[] = this.loadProducts();

  private loadProducts(): Product[] {
    const saved = localStorage.getItem('products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading products from localStorage', e);
      }
    }
    return [...DEFAULT_PRODUCTS];
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  resetData() {
    this.products = [...DEFAULT_PRODUCTS];
    this.saveToLocalStorage();
    this.selectedProduct.set(null);
    this.editingProduct.set(null);
  }

  selectProduct(product: Product) {
    this.selectedProduct.set(product);
    this.editingProduct.set({ ...product });
  }

  addProduct() {
    const nextId = this.products.length > 0
      ? Math.max(...this.products.map(p => p.id)) + 1
      : 1;

    const newProduct: Product = {
      id: nextId,
      name: '',
      price: 0,
      category: 'Electronics',
      available: true
    };

    this.selectedProduct.set(null); // It's a new entry
    this.editingProduct.set(newProduct);
  }

  saveProduct() {
    const edited = this.editingProduct();
    if (!edited || !edited.name || edited.price === null || edited.price === undefined) return;

    const index = this.products.findIndex(p => p.id === edited.id);
    if (index !== -1) {
      // Update existing
      this.products[index] = { ...edited };
    } else {
      // Add new
      this.products.push({ ...edited });
    }
    this.selectedProduct.set({ ...edited });
    this.editingProduct.set(null);
    this.saveToLocalStorage();
  }

  cancelEdit() {
    this.editingProduct.set(null);
    this.selectedProduct.set(null);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    if (this.selectedProduct()?.id === id) {
      this.selectedProduct.set(null);
    }
    if (this.editingProduct()?.id === id) {
      this.editingProduct.set(null);
    }
    this.saveToLocalStorage();
  }
}
