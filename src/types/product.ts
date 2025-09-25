// Product types matching backend entity and DTOs
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  materials: string[];
  isActive: boolean;
  inStock: boolean;
  imageUrl?: string;
  imageUrls?: string[];
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  slug: string; // Made required since all products now have slugs
  originalPrice?: number;
  // Optional fields for compatibility with collections/[slug]/page.tsx
  variant?: string;
  material?: string;
  color?: string;
  featured?: boolean;
  reviews?: number;
  rating?: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  materials: string[];
  isActive?: boolean;
  inStock?: boolean;
  featured?: boolean;
  imageUrl?: string;
  imageUrls?: string[];
  tags?: string[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  imagesToDelete?: string[];
}
