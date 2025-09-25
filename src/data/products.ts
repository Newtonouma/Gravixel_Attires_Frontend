import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Navy Suit',
    slug: 'classic-navy-suit',
    description: 'A timeless navy blue suit perfect for business and formal occasions.',
    price: 35900,
    category: 'Suits',
    subcategory: 'Business Suits',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Dark Blue'],
    materials: ['100% Wool'],
    isActive: true,
    inStock: true,
    imageUrl: '/images/FeaturedProducts/1.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [],
  },
  {
    id: 2,
    name: 'Charcoal Grey Blazer',
    slug: 'charcoal-grey-blazer',
    description: 'Modern charcoal grey blazer with contemporary fit.',
    price: 25900,
    category: 'Blazers',
    subcategory: 'Casual Blazers',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal Grey'],
    materials: ['Wool Blend'],
    isActive: true,
    inStock: true,
    imageUrl: '/images/FeaturedProducts/2.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [],
  },
  {
    id: 3,
    name: 'Black Formal Shirt',
    slug: 'black-formal-shirt',
    description: 'Crisp black formal shirt with classic collar.',
    price: 8900,
    category: 'Shirts',
    subcategory: 'Formal Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    materials: ['Cotton'],
    isActive: true,
    inStock: true,
    imageUrl: '/images/FeaturedProducts/3.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [],
  },
  {
    id: 4,
    name: 'Brown Leather Shoes',
    slug: 'brown-leather-shoes',
    description: 'Premium brown leather oxford shoes.',
    price: 18900,
    category: 'Shoes',
    subcategory: 'Formal Shoes',
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['Brown'],
    materials: ['Genuine Leather'],
    isActive: true,
    inStock: true,
    imageUrl: '/images/FeaturedProducts/4.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [],
  },
  {
    id: 5,
    name: 'Silk Tie Collection',
    slug: 'silk-tie-collection',
    description: 'Premium silk ties in various patterns.',
    price: 4900,
    category: 'Accessories',
    subcategory: 'Ties',
    sizes: ['One Size'],
    colors: ['Red', 'Blue', 'Green', 'Gold'],
    materials: ['100% Silk'],
    isActive: true,
    inStock: true,
    imageUrl: '/images/FeaturedProducts/5.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    tags: [],
  },
  {
    id: 6,
    name: 'White Dress Shirt',
    slug: 'white-dress-shirt',
    description: 'Classic white dress shirt for formal occasions.',
    price: 7900,
    category: 'Shirts',
    subcategory: 'Formal Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White'],
    materials: ['Cotton'],
    isActive: true,
    inStock: false,
    tags: [],
    imageUrl: '/images/FeaturedProducts/6.jpg',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

// Derived filter data for UI
export const categories = [
  'Suits',
  'Blazers',
  'Shirts',
  'Shoes',
  'Accessories',
];

export const subcategories = [
  'Business Suits',
  'Casual Blazers',
  'Formal Shirts',
  'Formal Shoes',
  'Ties',
];

export const colors = [
  'Navy Blue', 'Dark Blue', 'Charcoal Grey', 'Black', 'Brown', 'Red', 'Blue', 'Green', 'Gold', 'White',
];

export const materials = [
  '100% Wool', 'Wool Blend', 'Cotton', 'Genuine Leather', '100% Silk',
];

export const sizes = [
  'S', 'M', 'L', 'XL', 'XXL', '39', '40', '41', '42', '43', '44', 'One Size',
];

export const variants = [];

export const priceRanges = [
  { label: 'Under $100', min: 0, max: 10000 },
  { label: '$100 - $200', min: 10000, max: 20000 },
  { label: '$200 - $300', min: 20000, max: 30000 },
  { label: 'Above $300', min: 30000, max: Infinity },
];
