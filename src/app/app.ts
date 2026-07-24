import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, DEFAULT_PRODUCTS, FIELDS, FieldSpec, PROD_GROUPS } from './products';

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

  getFieldValue(product: Product, key: string): any {
    const entry = product.values.find(v => v[0] === key);
    return entry ? entry[1] : undefined;
  }

  setFieldValue(product: Product, key: string, value: any) {
    const entry = product.values.find(v => v[0] === key);
    if (entry) {
      entry[1] = value;
    } else {
      product.values.push([key, value]);
    }
  }

  getFieldsForGroup(groupId: string): FieldSpec[] {
    const group = PROD_GROUPS.find(g => g.id === groupId);
    if (!group) return [];
    return FIELDS.filter(f => group.fields.includes(f.key));
  }

  getProductGroups() {
    return PROD_GROUPS;
  }

  onGroupChange() {
    const product = this.editingProduct();
    if (!product) return;

    // Initialize missing fields for the new group
    const fields = this.getFieldsForGroup(product.prodGroup);
    fields.forEach(field => {
      if (this.getFieldValue(product, field.key) === undefined) {
        let defaultValue: any = '';
        if (field.type === 'number') defaultValue = 0;
        if (field.type === 'boolean') defaultValue = false;
        this.setFieldValue(product, field.key, defaultValue);
      }
    });
  }

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
    this.editingProduct.set(JSON.parse(JSON.stringify(product)));
  }

  addProduct() {
    const nextId = this.products.length > 0
      ? Math.max(...this.products.map(p => p.id)) + 1
      : 1;

    const newProduct: Product = {
      id: nextId,
      prodGroup: 'default',
      values: [
        ['name', ''],
        ['price', 0],
        ['category', 'Electronics'],
        ['available', true]
      ]
    };

    this.selectedProduct.set(null); // It's a new entry
    this.editingProduct.set(newProduct);
  }

  saveProduct() {
    const edited = this.editingProduct();
    if (!edited) return;

    const name = this.getFieldValue(edited, 'name');
    const price = this.getFieldValue(edited, 'price');
    if (!name || price === null || price === undefined) return;

    const index = this.products.findIndex(p => p.id === edited.id);
    if (index !== -1) {
      // Update existing
      this.products[index] = JSON.parse(JSON.stringify(edited));
    } else {
      // Add new
      this.products.push(JSON.parse(JSON.stringify(edited)));
    }
    this.selectedProduct.set(JSON.parse(JSON.stringify(edited)));
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
