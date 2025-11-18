import React, { useState, useRef } from 'react';
import ImagePreview from '../ImagePreview/ImagePreview';
import './MultipleImageUpload.css';

interface MultipleImageUploadProps {
  existingImages?: string[];
  onImagesChange: (newImages: File[], imagesToDelete: string[]) => void;
  maxImages?: number;
  className?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  existingImages = [],
  onImagesChange,
  maxImages = 10,
  className = ''
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const totalImages = existingImages.length - imagesToDelete.length + selectedFiles.length + files.length;
    
    if (totalImages > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Create preview URLs for new files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    // Notify parent component
    onImagesChange([...selectedFiles, ...files], imagesToDelete);
  };

  const handleDeleteExistingImage = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl]);
    onImagesChange(selectedFiles, [...imagesToDelete, imageUrl]);
  };

  const handleDeleteNewImage = (index: number) => {
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newSelectedFiles);
    setPreviewUrls(newPreviewUrls);
    onImagesChange(newSelectedFiles, imagesToDelete);
  };

  const handleRestoreImage = (imageUrl: string) => {
    setImagesToDelete(prev => prev.filter(url => url !== imageUrl));
    onImagesChange(selectedFiles, imagesToDelete.filter(url => url !== imageUrl));
  };

  const currentImageCount = existingImages.length - imagesToDelete.length + selectedFiles.length;
  const canAddMore = currentImageCount < maxImages;

  return (
    <div className={`multiple-image-upload-container space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Product Images ({currentImageCount}/{maxImages})
        </label>
        {canAddMore && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Add Images
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Existing images */}
        {existingImages.map((imageUrl, index) => (
          <div key={`existing-${index}`} className="relative">
            <ImagePreview
              imageUrl={imageUrl}
              onDelete={handleDeleteExistingImage}
              className={imagesToDelete.includes(imageUrl) ? 'opacity-50' : ''}
            />
            {imagesToDelete.includes(imageUrl) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleRestoreImage(imageUrl)}
                  className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                >
                  Restore
                </button>
              </div>
            )}
          </div>
        ))}

        {/* New image previews */}
        {previewUrls.map((previewUrl, index) => (
          <div key={`new-${index}`} className="relative">
            <ImagePreview
              imageUrl={previewUrl}
              onDelete={() => handleDeleteNewImage(index)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs text-center py-1 rounded-b-lg">
              New
            </div>
          </div>
        ))}

        {/* Add more button when space available */}
        {canAddMore && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500"
          >
            <div className="text-center">
              <div className="text-2xl">+</div>
              <div className="text-xs">Add Image</div>
            </div>
          </button>
        )}
      </div>

      {imagesToDelete.length > 0 && (
        <div className="text-sm text-red-600">
          {imagesToDelete.length} image(s) will be deleted
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;