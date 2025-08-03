export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string; // Main/primary image for listings
  images: string[]; // Array of all product images for detail view
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  color: string;
  size: string[];
  material: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  description: string;
  tags: string[];
  variant: string;
}

export const products: Product[] = [
  // Featured Products (from the existing Featured section)
  {
    id: 1,
    name: 'Classic Navy Suit',
    slug: 'classic-navy-suit',
    image: '/images/FeaturedProducts/1.jpg',
    images: [
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/3.jpg',
      '/images/FeaturedProducts/6.jpg'
    ],
    price: 35900,
    category: 'Suits',
    subcategory: 'Business',
    color: 'Navy',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    description: 'Timeless navy suit perfect for business and formal occasions. Crafted from premium wool with modern tailoring.',
    tags: ['business', 'formal', 'classic', 'wool'],
    variant: 'Two Piece'
  },
  {
    id: 2,
    name: 'Charcoal Slim Fit',
    slug: 'charcoal-slim-fit',
    image: '/images/FeaturedProducts/2.jpg',
    images: [
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/6.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 38900,
    category: 'Suits',
    subcategory: 'Slim Fit',
    color: 'Charcoal',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    material: 'Wool Blend',
    brand: 'Gravixel',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    description: 'Contemporary slim fit suit in sophisticated charcoal. Features a modern silhouette with premium construction.',
    tags: ['slim-fit', 'modern', 'charcoal', 'contemporary'],
    variant: 'Two Piece'
  },
  {
    id: 3,
    name: 'Ivory Wedding Tux',
    slug: 'ivory-wedding-tux',
    image: '/images/FeaturedProducts/3.jpg',
    images: [
      '/images/FeaturedProducts/3.jpg',
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/4.jpg'
    ],
    price: 49900,
    category: 'Tuxedos',
    subcategory: 'Wedding',
    color: 'Ivory',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Silk Blend',
    brand: 'Gravixel',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: true,
    description: 'Elegant ivory tuxedo designed for weddings and special occasions. Features silk lapels and premium buttons.',
    tags: ['wedding', 'tuxedo', 'ivory', 'special-occasion'],
    variant: 'Two Piece'
  },
  {
    id: 4,
    name: 'Olive Green Suit',
    slug: 'olive-green-suit',
    image: '/images/FeaturedProducts/4.jpg',
    images: [
      '/images/FeaturedProducts/4.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/6.jpg',
      '/images/FeaturedProducts/5.jpg'
    ],
    price: 41900,
    category: 'Suits',
    subcategory: 'Casual',
    color: 'Olive',
    size: ['M', 'L', 'XL'],
    material: 'Cotton Blend',
    brand: 'Gravixel',
    rating: 4.6,
    reviews: 73,
    inStock: true,
    featured: true,
    description: 'Unique olive green suit that stands out from the crowd. Perfect for creative professionals and special events.',
    tags: ['unique', 'olive', 'creative', 'standout'],
    variant: 'Two Piece'
  },
  {
    id: 5,
    name: 'Classic Black Suit',
    slug: 'classic-black-suit',
    image: '/images/FeaturedProducts/5.jpg',
    images: [
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/4.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 34900,
    category: 'Suits',
    subcategory: 'Classic',
    color: 'Black',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.8,
    reviews: 201,
    inStock: true,
    featured: true,
    description: 'Essential black suit for any wardrobe. Versatile design suitable for business, formal events, and evening wear.',
    tags: ['classic', 'black', 'versatile', 'essential'],
    variant: 'Two Piece'
  },

  // Additional Products
  {
    id: 6,
    name: 'Light Grey Three Piece',
    slug: 'light-grey-three-piece',
    image: '/images/FeaturedProducts/6.jpg',
    images: [
      '/images/FeaturedProducts/6.jpg',
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/4.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 54900,
    category: 'Suits',
    subcategory: 'Three Piece',
    color: 'Light Grey',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    featured: false,
    description: 'Sophisticated three-piece suit in light grey. Includes jacket, trousers, and matching vest for a complete look.',
    tags: ['three-piece', 'vest', 'sophisticated', 'complete'],
    variant: 'Three Piece'
  },
  {
    id: 7,
    name: 'Midnight Blue Tuxedo',
    slug: 'midnight-blue-tuxedo',
    image: '/images/FeaturedProducts/1.jpg',
    images: [
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/3.jpg',
      '/images/FeaturedProducts/4.jpg'
    ],
    price: 59900,
    category: 'Tuxedos',
    subcategory: 'Formal',
    color: 'Midnight Blue',
    size: ['M', 'L', 'XL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    featured: false,
    description: 'Luxurious midnight blue tuxedo for black-tie events. Features satin lapels and premium craftsmanship.',
    tags: ['tuxedo', 'black-tie', 'luxury', 'midnight-blue'],
    variant: 'Two Piece'
  },
  {
    id: 8,
    name: 'Brown Tweed Suit',
    slug: 'brown-tweed-suit',
    image: '/images/FeaturedProducts/2.jpg',
    images: [
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 45900,
    category: 'Suits',
    subcategory: 'Casual',
    color: 'Brown',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Tweed',
    brand: 'Gravixel',
    rating: 4.5,
    reviews: 38,
    inStock: true,
    featured: false,
    description: 'Classic brown tweed suit with traditional patterns. Perfect for autumn and winter occasions.',
    tags: ['tweed', 'brown', 'traditional', 'autumn'],
    variant: 'Two Piece'
  },
  {
    id: 9,
    name: 'Pin Stripe Navy',
    slug: 'pin-stripe-navy',
    image: '/images/FeaturedProducts/3.jpg',
    images: [
      '/images/FeaturedProducts/3.jpg',
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/4.jpg'
    ],
    price: 47900,
    category: 'Suits',
    subcategory: 'Business',
    color: 'Navy',
    size: ['M', 'L', 'XL', 'XXL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.7,
    reviews: 92,
    inStock: false,
    featured: false,
    description: 'Elegant navy suit with subtle pinstripes. A timeless choice for business professionals.',
    tags: ['pinstripe', 'navy', 'business', 'professional'],
    variant: 'Two Piece'
  },
  {
    id: 10,
    name: 'Cream Linen Summer Suit',
    slug: 'cream-linen-summer-suit',
    image: '/images/FeaturedProducts/4.jpg',
    images: [
      '/images/FeaturedProducts/4.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/3.jpg',
      '/images/FeaturedProducts/6.jpg'
    ],
    price: 32900,
    originalPrice: 42900,
    category: 'Suits',
    subcategory: 'Summer',
    color: 'Cream',
    size: ['S', 'M', 'L'],
    material: 'Linen',
    brand: 'Gravixel',
    rating: 4.4,
    reviews: 56,
    inStock: true,
    featured: false,
    description: 'Lightweight cream linen suit perfect for summer events and warm weather occasions.',
    tags: ['linen', 'summer', 'lightweight', 'cream'],
    variant: 'Two Piece'
  },
  {
    id: 11,
    name: 'Burgundy Velvet Blazer',
    slug: 'burgundy-velvet-blazer',
    image: '/images/FeaturedProducts/5.jpg',
    images: [
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/6.jpg',
      '/images/FeaturedProducts/4.jpg'
    ],
    price: 29900,
    category: 'Blazers',
    subcategory: 'Evening',
    color: 'Burgundy',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Velvet',
    brand: 'Gravixel',
    rating: 4.6,
    reviews: 34,
    inStock: true,
    featured: false,
    description: 'Luxurious burgundy velvet blazer for evening events and special occasions.',
    tags: ['velvet', 'burgundy', 'evening', 'luxury'],
    variant: 'Single Piece'
  },
  {
    id: 12,
    name: 'Double Breasted Grey',
    slug: 'double-breasted-grey',
    image: '/images/FeaturedProducts/6.jpg',
    images: [
      '/images/FeaturedProducts/6.jpg',
      '/images/FeaturedProducts/3.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/1.jpg'
    ],
    price: 51900,
    category: 'Suits',
    subcategory: 'Double Breasted',
    color: 'Grey',
    size: ['M', 'L', 'XL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.8,
    reviews: 41,
    inStock: true,
    featured: false,
    description: 'Classic double-breasted suit in sophisticated grey. Features traditional styling with modern fit.',
    tags: ['double-breasted', 'grey', 'traditional', 'classic'],
    variant: 'Two Piece'
  },
  // Additional Three Piece Variants
  {
    id: 13,
    name: 'Classic Navy Three Piece',
    slug: 'classic-navy-three-piece',
    image: '/images/FeaturedProducts/1.jpg',
    images: [
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/4.jpg',
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 45900,
    category: 'Suits',
    subcategory: 'Business',
    color: 'Navy',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.9,
    reviews: 78,
    inStock: true,
    featured: false,
    description: 'Complete three-piece navy suit with matching vest. Perfect for formal business occasions and special events.',
    tags: ['business', 'formal', 'classic', 'wool', 'three-piece'],
    variant: 'Three Piece'
  },
  {
    id: 14,
    name: 'Charcoal Three Piece Slim Fit',
    slug: 'charcoal-three-piece-slim-fit',
    image: '/images/FeaturedProducts/2.jpg',
    images: [
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/4.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 48900,
    category: 'Suits',
    subcategory: 'Slim Fit',
    color: 'Charcoal',
    size: ['S', 'M', 'L', 'XL'],
    material: 'Wool Blend',
    brand: 'Gravixel',
    rating: 4.8,
    reviews: 56,
    inStock: true,
    featured: false,
    description: 'Modern three-piece charcoal suit with slim fit design. Includes jacket, trousers, and fitted vest.',
    tags: ['slim-fit', 'modern', 'charcoal', 'three-piece'],
    variant: 'Three Piece'
  },
  {
    id: 15,
    name: 'Black Three Piece Classic',
    slug: 'black-three-piece-classic',
    image: '/images/FeaturedProducts/5.jpg',
    images: [
      '/images/FeaturedProducts/5.jpg',
      '/images/FeaturedProducts/1.jpg',
      '/images/FeaturedProducts/2.jpg',
      '/images/FeaturedProducts/3.jpg'
    ],
    price: 44900,
    category: 'Suits',
    subcategory: 'Classic',
    color: 'Black',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    material: 'Wool',
    brand: 'Gravixel',
    rating: 4.7,
    reviews: 112,
    inStock: true,
    featured: false,
    description: 'Timeless black three-piece suit. Essential formal wear with jacket, trousers, and matching waistcoat.',
    tags: ['classic', 'black', 'versatile', 'essential', 'three-piece'],
    variant: 'Three Piece'
  }
];

export const categories = ['All', 'Suits', 'Tuxedos', 'Blazers'];
export const subcategories = ['All', 'Business', 'Casual', 'Slim Fit', 'Classic', 'Wedding', 'Formal', 'Evening', 'Three Piece', 'Summer', 'Double Breasted'];
export const colors = ['All', 'Navy', 'Black', 'Grey', 'Charcoal', 'Brown', 'Ivory', 'Cream', 'Olive', 'Burgundy', 'Midnight Blue', 'Light Grey'];
export const materials = ['All', 'Wool', 'Cotton Blend', 'Silk Blend', 'Wool Blend', 'Tweed', 'Linen', 'Velvet'];
export const sizes = ['All', 'S', 'M', 'L', 'XL', 'XXL'];
export const variants = ['All', 'Two Piece', 'Three Piece', 'Single Piece'];

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'KES 25,000 - 35,000', min: 25000, max: 35000 },
  { label: 'KES 35,001 - 45,000', min: 35001, max: 45000 },
  { label: 'KES 45,001 - 55,000', min: 45001, max: 55000 },
  { label: 'KES 55,001 and above', min: 55001, max: Infinity }
];
