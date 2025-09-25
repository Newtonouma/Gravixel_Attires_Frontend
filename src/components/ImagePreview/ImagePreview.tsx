import React from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  imageUrl: string;
  onDelete: (imageUrl: string) => void;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onDelete, className = '' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={imageUrl}
          alt="Product image"
          fill
          className="object-cover"
          sizes="96px"
        />
        {/* Delete button overlay */}
        <button
          type="button"
          onClick={() => onDelete(imageUrl)}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          aria-label="Delete image"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;