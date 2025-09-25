import { useState, useEffect } from 'react';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

const API_URL = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : 'http://localhost:3001';

// Utility function to generate slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Helper function to ensure products have slugs
function ensureProductHasSlug(product: Product): Product {
  console.log(`Processing product: "${product.name}" with slug: "${product.slug}"`);
  
  if (!product.slug || product.slug === 'null') {
    const generatedSlug = generateSlug(product.name);
    console.log(`Generated new slug for "${product.name}": "${generatedSlug}"`);
    return {
      ...product,
      slug: generatedSlug
    };
  }
  
  console.log(`Using existing slug for "${product.name}": "${product.slug}"`);
  return product;
}

// Helper function to make authenticated requests
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error('Session expired. Please login again.');
  }

  return response;
}

export function useProducts() {
  console.log('useProducts hook initialized');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    console.log('fetchProducts function called');
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching products from:', `${API_URL}/products`);
      console.log('API_URL value:', API_URL);
      
      // No authentication required for fetching products
      const res = await fetch(`${API_URL}/products`);
      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error response:', errorText);
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Raw products received from API:', data);
      console.log('Number of products:', data.length);
      
      // Ensure all products have slugs
      const productsWithSlugs = data.map(ensureProductHasSlug);
      console.log('Products after slug processing:', productsWithSlugs);
      console.log('Products with "black" in name:', productsWithSlugs.filter((p: Product) => p.name.toLowerCase().includes('black')));
      
      setProducts(productsWithSlugs);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useProducts useEffect - Starting to fetch products');
    try {
      fetchProducts();
    } catch (error) {
      console.error('useEffect error:', error);
    }
  }, []); // Empty dependency array

  const createProduct = async (product: CreateProductDto, imageFiles?: File[], imagesToDelete?: string[]) => {
    console.log('useProducts createProduct called with:', product);
    console.log('useProducts createProduct called with image files:', imageFiles);
    
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    console.log('Auth token exists:', !!token);
    if (token) {
      console.log('Auth token (first 20 chars):', token.substring(0, 20) + '...');
    }
    
    // Use FormData for file upload support
    const formData = new FormData();
    
    // Add all product fields to FormData
    Object.entries(product).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Send arrays as JSON strings (backend will parse them)
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        // Convert all values to strings (backend will parse them)
        formData.append(key, String(value));
      }
    });
    
    // Add image files if provided
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });
      console.log('Added', imageFiles.length, 'image files to FormData');
    }
    
    console.log('Sending create product request to:', `${API_URL}/products`);
    
    const res = await authenticatedFetch(`${API_URL}/products`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary for multipart
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Create product error response:', errorText);
      console.error('Response status:', res.status, res.statusText);
      console.error('Response headers:', [...res.headers.entries()]);
      throw new Error(`Failed to create product: ${res.status} ${res.statusText}`);
    }
    
    console.log('Product created successfully, refreshing products list');
    await fetchProducts();
  };

  const updateProduct = async (id: number, product: UpdateProductDto, imageFiles?: File[], imagesToDelete?: string[]) => {
    console.log('useProducts updateProduct called with:', id, product);
    console.log('useProducts updateProduct called with image files:', imageFiles);
    console.log('useProducts updateProduct called with images to delete:', imagesToDelete);
    
    const formData = new FormData();
    
    // Add all product fields to FormData
    Object.entries(product).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Send arrays as JSON strings (backend will parse them)
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    
    // Add images to delete
    if (imagesToDelete && imagesToDelete.length > 0) {
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
    }
    
    // Add new image files
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });
      console.log('Added', imageFiles.length, 'image files to FormData');
    }
    
    const res = await authenticatedFetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Update product error:', errorText);
      throw new Error(`Failed to update product: ${res.status} ${res.statusText}`);
    }
    
    await fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    console.log('useProducts deleteProduct called with:', id);
    const res = await authenticatedFetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Delete product error:', errorText);
      throw new Error(`Failed to delete product: ${res.status} ${res.statusText}`);
    }
    
    await fetchProducts();
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
}
