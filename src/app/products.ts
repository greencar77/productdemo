export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Electronics' | 'Food' | 'Clothing';
  available: boolean;
}

export const DEFAULT_PRODUCTS: Product[] = [
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
