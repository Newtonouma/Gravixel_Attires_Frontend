import React from 'react';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import MultipleImageUpload from '../MultipleImageUpload/MultipleImageUpload';
import TagInput from '../TagInput/TagInput';
import { RichTextEditor } from '../RichTextEditor';

type ProductFormProps = {
  product?: Product;
  onSubmit: (productData: CreateProductDto | UpdateProductDto, imageFiles?: File[], imagesToDelete?: string[]) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
};


import { useState } from 'react';

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState<CreateProductDto | UpdateProductDto>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    subcategory: product?.subcategory || '',
    sizes: product?.sizes ?? [],
    colors: product?.colors ?? [],
    materials: product?.materials ?? [],
    tags: product?.tags ?? [],
    imageUrl: product?.imageUrl || '',
    isActive: product?.isActive ?? true,
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' || name === 'rating' ? Number(value) : value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayChange = (name: 'sizes' | 'colors' | 'materials' | 'tags', value: string) => {
    setForm((prev) => ({ ...prev, [name]: value.split(',').map((v) => v.trim()).filter(Boolean) }));
  };

  const handleImagesChange = (newImages: File[], imagesToDelete: string[]) => {
    setImageFiles(newImages);
    setImagesToDelete(imagesToDelete);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ProductForm handleSubmit called with form data:', form);
    console.log('ProductForm handleSubmit called with image files:', imageFiles);
    console.log('ProductForm handleSubmit called with images to delete:', imagesToDelete);
    onSubmit(form, imageFiles, imagesToDelete);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-modal">
      <h2 className="text-xl font-bold mb-2">{product ? 'Edit Product' : 'Create Product'}</h2>
      
      <div className="product-form-grid">
        <div className="product-form-field">
          <label htmlFor="name">Product Name</label>
          <input 
            name="name" 
            id="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter product name" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="price">Price ($)</label>
          <input 
            name="price" 
            id="price" 
            type="number" 
            value={form.price} 
            onChange={handleChange} 
            required 
            min={0} 
            step="0.01"
            placeholder="0.00" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="category">Category</label>
          <input 
            name="category" 
            id="category" 
            value={form.category} 
            onChange={handleChange} 
            required 
            placeholder="e.g. Shirts, Pants, Accessories" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="subcategory">Subcategory</label>
          <input 
            name="subcategory" 
            id="subcategory" 
            value={form.subcategory} 
            onChange={handleChange} 
            placeholder="e.g. Casual, Formal, Sports" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="sizes">Available Sizes</label>
          <input 
            name="sizes" 
            id="sizes" 
            value={(form.sizes ?? []).join(', ')} 
            onChange={e => handleArrayChange('sizes', e.target.value)} 
            placeholder="e.g. XS, S, M, L, XL, XXL" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="colors">Available Colors</label>
          <input 
            name="colors" 
            id="colors" 
            value={(form.colors ?? []).join(', ')} 
            onChange={e => handleArrayChange('colors', e.target.value)} 
            placeholder="e.g. Red, Blue, Black, White" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="materials">Materials</label>
          <input 
            name="materials" 
            id="materials" 
            value={(form.materials ?? []).join(', ')} 
            onChange={e => handleArrayChange('materials', e.target.value)} 
            placeholder="e.g. Cotton, Polyester, Wool" 
          />
        </div>

        <div className="product-form-field">
          <label htmlFor="tags">Tags</label>
          <TagInput
            tags={form.tags ?? []}
            onChange={(tags) => setForm(prev => ({ ...prev, tags }))}
            placeholder="Type and press Enter to add tags"
          />
          <small className="field-hint">Add relevant tags for search and categorization. Press Enter to add each tag.</small>
        </div>

        {/* Checkbox group for compact layout */}
        <div className="product-form-field checkbox-group">
          <div className="checkbox-item">
            <label className="checkbox-label">
              <input 
                name="isActive" 
                id="isActive" 
                type="checkbox"
                checked={form.isActive ?? true} 
                onChange={handleCheckboxChange} 
              />
              <span className="checkbox-text">Product is Active</span>
            </label>
            <small className="field-hint">Active products are visible to customers</small>
          </div>

          <div className="checkbox-item">
            <label className="checkbox-label">
              <input 
                name="inStock" 
                id="inStock" 
                type="checkbox"
                checked={form.inStock ?? true} 
                onChange={handleCheckboxChange} 
              />
              <span className="checkbox-text">Product is in Stock</span>
            </label>
            <small className="field-hint">In-stock products can be purchased</small>
          </div>

          <div className="checkbox-item">
            <label className="checkbox-label">
              <input 
                name="featured" 
                id="featured" 
                type="checkbox"
                checked={form.featured ?? false} 
                onChange={handleCheckboxChange} 
              />
              <span className="checkbox-text">Featured Product</span>
            </label>
            <small className="field-hint">Featured products appear on homepage</small>
          </div>
        </div>

        <div className="product-form-field product-form-full-width">
          <label htmlFor="description">Product Description</label>
          <RichTextEditor
            value={form.description}
            onChange={(content) => setForm(prev => ({ ...prev, description: content }))}
            placeholder="Enter detailed product description..."
            height={150}
          />
        </div>

        <div className="product-form-field product-form-full-width">
          <label htmlFor="imageUrl">Image URL (optional)</label>
          <input 
            name="imageUrl" 
            id="imageUrl" 
            value={form.imageUrl} 
            onChange={handleChange} 
            placeholder="https://example.com/image.jpg" 
          />
        </div>

        <div className="product-form-field product-form-full-width image-upload-section">
          <MultipleImageUpload
            existingImages={product?.imageUrls || (product?.imageUrl ? [product.imageUrl] : [])}
            onImagesChange={handleImagesChange}
            maxImages={10}
          />
        </div>

        <div className="product-form-buttons">
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={loading}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            )}
            {loading ? 'Creating...' : product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
