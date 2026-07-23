import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

//don't use by now
interface FieldSpec {
  key: string;
  label: string;
  type: ['text', 'number', 'select', 'boolean'];
  required: boolean;
  options?: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Electronics' | 'Food' | 'Clothing';
  available: boolean;
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
  }

  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Mouse',
      price: 29.99,
      category: 'Electronics',
      available: true,
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      price: 79.99,
      category: 'Electronics',
      available: false,
    },
    {
      id: 3,
      name: 'Organic Apples',
      price: 4.99,
      category: 'Food',
      available: true,
    },
    {
      id: 4,
      name: 'Whole Wheat Bread',
      price: 2.49,
      category: 'Food',
      available: true,
    },
    {
      id: 5,
      name: 'Dark Chocolate',
      price: 5.99,
      category: 'Food',
      available: false,
    },
    {
      id: 6,
      name: 'Cotton T-Shirt',
      price: 19.99,
      category: 'Clothing',
      available: true,
    },
    {
      id: 7,
      name: 'Denim Jeans',
      price: 49.99,
      category: 'Clothing',
      available: true,
    },
    {
      id: 8,
      name: 'Hooded Sweatshirt',
      price: 39.99,
      category: 'Clothing',
      available: false,
    },
    {
      id: 9,
      name: 'Mechanical Keyboard',
      price: 99.99,
      category: 'Electronics',
      available: true,
    },
    {
      id: 10,
      name: 'USB-C Charger',
      price: 24.99,
      category: 'Electronics',
      available: true,
    },
  ];
}
