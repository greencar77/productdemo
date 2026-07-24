export interface FieldSpec {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  required: boolean;
  options?: string[];
}

export const FIELDS: FieldSpec[] = [
  {
    key: 'name',
    label: 'Product name',
    type: 'text',
    required: true,
  },
  {
    key: 'price',
    label: 'Price',
    type: 'number',
    required: true,
  },
  {
    key: 'vat',
    label: 'VAT',
    type: 'number',
    required: false,
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    required: false,
    options: ['Electronics', 'Food', 'Clothing'],
  },
  {
    key: 'available',
    label: 'Available',
    type: 'boolean',
    required: false,
  },
  {
    key: 'origin',
    label: 'Origin',
    type: 'text',
    required: true,
  },
];

export interface ProductGroup {
  id: string;
  fields: string[];
}

export const PROD_GROUPS: ProductGroup[] = [
  {
    id: 'default',
    fields: ['name', 'price', 'category', 'available'],
  },
  {
    id: 'food',
    fields: ['name', 'price', 'vat', 'category', 'available', 'origin'],
  },
];

export interface Product {
  id: number;
  prodGroup: string;
  values: [string, any][];
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    prodGroup: 'default',
    values: [
      ['name', 'Wireless Mouse'],
      ['price', 29.99],
      ['category', 'Electronics'],
      ['available', true],
    ],
  },
  {
    id: 2,
    prodGroup: 'default',
    values: [
      ['name', 'Bluetooth Speaker'],
      ['price', 79.99],
      ['category', 'Electronics'],
      ['available', false],
    ],
  },
  {
    id: 3,
    prodGroup: 'food',
    values: [
      ['name', 'Organic Apples'],
      ['price', 4.99],
      ['category', 'Food'],
      ['available', true],
      ['vat', 3.7],
      ['origin', 'China'],
    ],
  },
  {
    id: 4,
    prodGroup: 'food',
    values: [
      ['name', 'Whole Wheat Bread'],
      ['price', 2.49],
      ['category', 'Food'],
      ['available', true],
      ['vat', 2.8],
      ['origin', 'Bulgaria'],
    ],
  },
  {
    id: 5,
    prodGroup: 'food',
    values: [
      ['name', 'Dark Chocolate'],
      ['price', 5.99],
      ['category', 'Food'],
      ['available', false],
      ['vat', 11.6],
      ['origin', 'UK'],
    ],
  },
  {
    id: 6,
    prodGroup: 'default',
    values: [
      ['name', 'Cotton T-Shirt'],
      ['price', 19.99],
      ['category', 'Clothing'],
      ['available', true],
    ],
  },
  {
    id: 7,
    prodGroup: 'default',
    values: [
      ['name', 'Denim Jeans'],
      ['price', 49.99],
      ['category', 'Clothing'],
      ['available', true],
    ],
  },
  {
    id: 8,
    prodGroup: 'default',
    values: [
      ['name', 'Hooded Sweatshirt'],
      ['price', 39.99],
      ['category', 'Clothing'],
      ['available', false],
    ],
  },
  {
    id: 9,
    prodGroup: 'default',
    values: [
      ['name', 'Mechanical Keyboard'],
      ['price', 99.99],
      ['category', 'Electronics'],
      ['available', true],
    ],
  },
  {
    id: 10,
    prodGroup: 'default',
    values: [
      ['name', 'USB-C Charger'],
      ['price', 24.99],
      ['category', 'Electronics'],
      ['available', true],
    ],
  },
];
