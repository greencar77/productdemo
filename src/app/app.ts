import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, DEFAULT_PRODUCTS, FIELDS, FieldSpec, PROD_GROUPS } from './products';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('productdemo');
  selectedProduct = signal<Product | null>(null);
  editingProduct = signal<Product | null>(null);

  products: Product[] = this.loadProducts();

  getFieldValue(product: Product, key: string): any {
    const entry = product.values.find((v) => v[0] === key);
    return entry ? entry[1] : undefined;
  }

  setFieldValue(product: Product, key: string, value: any) {
    const entry = product.values.find((v) => v[0] === key);
    if (entry) {
      entry[1] = value;
    } else {
      product.values.push([key, value]);
    }
  }

  getFieldsForGroup(groupId: string): FieldSpec[] {
    const group = PROD_GROUPS.find((g) => g.id === groupId);
    if (!group) return [];
    //output fields in the order they appear in PROD_GROUPS definition
    return group.fields
      .map((key) => FIELDS.find((f) => f.key === key))
      .filter((f): f is FieldSpec => !!f);
  }

  getProductGroups() {
    return PROD_GROUPS;
  }

  onGroupChange() {
    const product = this.editingProduct();
    if (!product) return;

    // Initialize missing fields for the new group
    const fields = this.getFieldsForGroup(product.prodGroup);
    fields.forEach((field) => {
      if (this.getFieldValue(product, field.key) === undefined) {
        this.setFieldValue(product, field.key, this.getDefaultFieldValue(field));
      }
    });
  }

  private getDefaultFieldValue(field: FieldSpec): any {
    switch (field.type) {
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'date':
        return new Date().toISOString().split('T')[0];
      case 'select':
        return field.options && field.options.length > 0 ? field.options[0] : undefined;
      case 'text':
      default:
        return '';
    }
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
    const nextId = this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;

    const defaultGroupId = 'default';
    const fields = this.getFieldsForGroup(defaultGroupId);

    const newProduct: Product = {
      id: nextId,
      prodGroup: defaultGroupId,
      values: fields.map((field) => [field.key, this.getDefaultFieldValue(field)]),
    };

    this.selectedProduct.set(null); // It's a new entry
    this.editingProduct.set(newProduct);
  }

  isProductValid(): boolean {
    const edited = this.editingProduct();
    if (!edited) return false;

    const fields = this.getFieldsForGroup(edited.prodGroup);
    for (const field of fields) {
      const value = this.getFieldValue(edited, field.key);
      if (field.required) {
        if (
          value === undefined ||
          value === null ||
          (field.type !== 'number' && String(value).trim() === '')
        ) {
          return false;
        }
      }

      if (field.dependsOn) {
        const dependencyExists = fields.some((f) => f.key === field.dependsOn);
        if (
          dependencyExists &&
          (value === undefined ||
            value === null ||
            (field.type !== 'number' && String(value).trim() === ''))
        ) {
          return false;
        }
      }
    }
    return true;
  }

  saveProduct() {
    if (!this.isProductValid()) return;
    const edited = this.editingProduct()!;

    const index = this.products.findIndex((p) => p.id === edited.id);
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

  isFieldShown(field: FieldSpec, product: Product) {
    if (field.dependsOn == null) {
      return true;
    }
    const dependentValue = this.getFieldValue(product, field.dependsOn);
    return dependentValue != null;
  }

  cancelEdit() {
    this.editingProduct.set(null);
    this.selectedProduct.set(null);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
    if (this.selectedProduct()?.id === id) {
      this.selectedProduct.set(null);
    }
    if (this.editingProduct()?.id === id) {
      this.editingProduct.set(null);
    }
    this.saveToLocalStorage();
  }
}
