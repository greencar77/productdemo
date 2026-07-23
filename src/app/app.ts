import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//don't use by now
interface FieldSpec {
  key: string;
  label: string;
  type: ['text', 'number', 'select', 'boolean'];
  required: boolean;
  options?: string[];
}

interface Product {
  name: string;
  price: number;
  category: 'Electronics' | 'Food' | 'Clothing';
  available: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('productdemo');

  products: Product[] = [
    {
      name: 'Wireless Mouse',
      price: 29.99,
      category: 'Electronics',
      available: true,
    },
    {
      name: 'Bluetooth Speaker',
      price: 79.99,
      category: 'Electronics',
      available: false,
    },
    {
      name: 'Organic Apples',
      price: 4.99,
      category: 'Food',
      available: true,
    },
    {
      name: 'Whole Wheat Bread',
      price: 2.49,
      category: 'Food',
      available: true,
    },
    {
      name: 'Dark Chocolate',
      price: 5.99,
      category: 'Food',
      available: false,
    },
    {
      name: 'Cotton T-Shirt',
      price: 19.99,
      category: 'Clothing',
      available: true,
    },
    {
      name: 'Denim Jeans',
      price: 49.99,
      category: 'Clothing',
      available: true,
    },
    {
      name: 'Hooded Sweatshirt',
      price: 39.99,
      category: 'Clothing',
      available: false,
    },
    {
      name: 'Mechanical Keyboard',
      price: 99.99,
      category: 'Electronics',
      available: true,
    },
    {
      name: 'USB-C Charger',
      price: 24.99,
      category: 'Electronics',
      available: true,
    },
  ];
}
